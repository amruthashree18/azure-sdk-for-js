// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestOptions } from "../request/RequestOptions.js";
import { readPartitionKeyDefinition } from "../client/ClientUtils.js";
import type { Container } from "../client/index.js";
import type { ClientContext } from "../ClientContext.js";
import { Constants, ResourceType } from "../common/constants.js";
import { sleep, copyObject, getPathFromLink } from "../common/helper.js";
import { StatusCodes } from "../common/statusCodes.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../diagnostics/DiagnosticNodeInternal.js";
import type { PartitionKeyDefinition } from "../documents/PartitionKeyDefinition.js";
import { convertToInternalPartitionKey } from "../documents/PartitionKeyInternal.js";
import { ErrorResponse } from "../index.js";
import { BulkExecutionRetryPolicy } from "../retry/bulkExecutionRetryPolicy.js";
import { ResourceThrottleRetryPolicy } from "../retry/resourceThrottleRetryPolicy.js";
import type { RetryPolicy } from "../retry/RetryPolicy.js";
import type { PartitionKeyRangeCache } from "../routing/partitionKeyRangeCache.js";
import type { BulkOperationResult, OperationInput, Operation } from "../utils/batch.js";
import { encryptOperationInput, isKeyInRange } from "../utils/batch.js";
import { addDiagnosticChild } from "../utils/diagnostics.js";
import { hashPartitionKey } from "../utils/hashing/hash.js";
import { HelperPerPartition } from "./HelperPerPartition.js";
import type { ItemOperation } from "./index.js";
import { ItemOperationContext, BulkResponse } from "./index.js";

/**
 * BulkHelper for bulk operations in a container.
 * It maintains one @see {@link HelperPerPartition} for each Partition Key Range, which allows independent execution of requests. Queue based limiters @see {@link LimiterQueue}
 * rate limit requestsbat the helper / Partition Key Range level, this means that we can send parallel and independent requests to different Partition Key Ranges, but for the same Range, requests
 * will be limited. Two callback implementations define how a particular request should be executed, and how operations should be retried. When the helper dispatches a batch
 * the batch will create a request and call the execute callback (executeRequest), if conditions are met, it might call the retry callback (reBatchOperation).
 * @hidden
 */

export class BulkHelper {
  private readonly container: Container;
  private readonly clientContext: ClientContext;
  private readonly partitionKeyRangeCache: PartitionKeyRangeCache;
  private readonly helpersByPartitionKeyRangeId: Map<string, HelperPerPartition>;
  private options: RequestOptions;
  private partitionKeyDefinition: PartitionKeyDefinition;
  private partitionKeyDefinitionPromise: Promise<PartitionKeyDefinition>;
  private isCancelled: boolean;
  private processedOperationCountRef: { count: number } = { count: 0 };
  private operationPromisesList: Promise<BulkOperationResult>[] = [];
  private congestionControlTimer: NodeJS.Timeout;
  private readonly congestionControlDelayInMs: number = 1000;
  private staleRidError: ErrorResponse | undefined;
  private readonly operationsPerSleep: number = 100; // Number of operations to add per sleep
  private readonly intervalForPartialBatchInMs: number = 1000; // Sleep interval before adding partial batch to dispatch queue

  /**
   * @internal
   */
  constructor(
    container: Container,
    clientContext: ClientContext,
    partitionKeyRangeCache: PartitionKeyRangeCache,
    options: RequestOptions,
  ) {
    this.container = container;
    this.clientContext = clientContext;
    this.partitionKeyRangeCache = partitionKeyRangeCache;
    this.helpersByPartitionKeyRangeId = new Map();
    this.options = options;
    this.executeRequest = this.executeRequest.bind(this);
    this.reBatchOperation = this.reBatchOperation.bind(this);
    this.refreshPartitionKeyRangeCache = this.refreshPartitionKeyRangeCache.bind(this);
    this.isCancelled = false;
    this.runCongestionControlTimer();
  }

  /**
   * adds operation(s) to the helper
   * @param operationInput - bulk operation or list of bulk operations
   */
  async execute(operationInput: OperationInput[]): Promise<BulkOperationResult[]> {
    const addOperationPromises: Promise<void>[] = [];
    const minimalPause = 0; // minimal pause (0 ms) inserted periodically during processing.
    try {
      for (let i = 0; i < operationInput.length; i++) {
        // After every 100 operations,sleep of 0 ms is added to allow the event loop to process any pending
        // callbacks/tasks such as fetching partition key definition and dispatching batches from queue. This helps
        // to prevent blocking and improves overall responsiveness.
        if (i % this.operationsPerSleep === 0) {
          await sleep(minimalPause);
        }
        addOperationPromises.push(this.addOperation(operationInput[i], i));
      }
      await Promise.allSettled(addOperationPromises);

      // After processing all operations via addOperation, it's possible that the current batch in each helper is not completely full.
      // In such cases, addPartialBatchToQueue is called to ensure that all the operations are added to the dispatch queue.
      // while loop below waits until the count of processed operations equals the number of input operations. This is necessary because
      // some operations might fail and then again get added to current batch for retry.
      while (this.processedOperationCountRef.count < operationInput.length) {
        this.helpersByPartitionKeyRangeId.forEach((helper) => {
          helper.addPartialBatchToQueue();
        });
        // Pause for 1000 ms to give pending operations chance to accumulate into a batch to avoid sending multiple small batches.
        await sleep(this.intervalForPartialBatchInMs);
      }
    } finally {
      if (this.congestionControlTimer) {
        clearInterval(this.congestionControlTimer);
      }
    }
    const settledResults = await Promise.allSettled(this.operationPromisesList);
    if (this.isCancelled && this.staleRidError) {
      throw this.staleRidError;
    }

    const bulkOperationResults = settledResults.map((result) =>
      result.status === "fulfilled" ? result.value : result.reason,
    );

    // Formatting result: if an error is present, removing the stack trace details.
    const formattedResults = bulkOperationResults.map((result) => {
      if (result && result.error) {
        const { stack, ...otherProps } = result.error;
        const trimmedError = { message: result.error.message, ...otherProps };
        return {
          ...result,
          error: trimmedError,
        };
      }
      return result;
    });
    return formattedResults;
  }

  private async addOperation(operation: OperationInput, idx: number): Promise<void> {
    if (this.isCancelled) {
      return;
    }
    if (!operation) {
      this.operationPromisesList[idx] = Promise.resolve({
        operationInput: operation,
        error: Object.assign(new ErrorResponse("Operation cannot be null or undefined."), {
          code: StatusCodes.InternalServerError,
        }),
      });
      return;
    }

    // Checks for id and partition key in input body
    if (
      operation.operationType === "Create" ||
      operation.operationType === "Upsert" ||
      operation.operationType === "Replace"
    ) {
      if (!operation.resourceBody.id) {
        this.operationPromisesList[idx] = Promise.resolve({
          operationInput: operation,
          error: Object.assign(
            new ErrorResponse(
              `Operation resource body must have an 'id' for ${operation.operationType} operations.`,
            ),
            { code: StatusCodes.InternalServerError },
          ),
        });
        this.processedOperationCountRef.count++;
        return;
      }
    }
    if (operation.partitionKey === undefined) {
      this.operationPromisesList[idx] = Promise.resolve({
        operationInput: operation,
        error: Object.assign(
          new ErrorResponse(`PartitionKey is required for ${operation.operationType} operations.`),
          { code: StatusCodes.InternalServerError },
        ),
      });
      this.processedOperationCountRef.count++;
      return;
    }

    let operationError: Error | undefined;
    let diagnosticNode: DiagnosticNodeInternal;
    let unencryptedOperation: OperationInput;
    let partitionKeyRangeId: string;
    try {
      diagnosticNode = new DiagnosticNodeInternal(
        this.clientContext.diagnosticLevel,
        DiagnosticNodeType.CLIENT_REQUEST_NODE,
        null,
      );
      // Ensure partition key definition is available.
      if (!this.partitionKeyDefinition) {
        if (!this.partitionKeyDefinitionPromise) {
          this.partitionKeyDefinitionPromise = (async () => {
            try {
              const partitionKeyDefinition = await readPartitionKeyDefinition(
                diagnosticNode,
                this.container,
              );
              this.partitionKeyDefinition = partitionKeyDefinition;
              return partitionKeyDefinition;
            } finally {
              this.partitionKeyDefinitionPromise = null;
            }
          })();
        }
        await this.partitionKeyDefinitionPromise;
      }
      unencryptedOperation = copyObject(operation);
      // If encryption is enabled, encrypt the operation input.
      if (this.clientContext.enableEncryption) {
        operation = copyObject(operation);
        await this.container.checkAndInitializeEncryption();
        diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation);
        const { operation: encryptedOp, totalPropertiesEncryptedCount } =
          await encryptOperationInput(this.container.encryptionProcessor, operation, 0);
        operation = encryptedOp;
        diagnosticNode.endEncryptionDiagnostics(
          Constants.Encryption.DiagnosticsEncryptOperation,
          totalPropertiesEncryptedCount,
        );
      }
      // Resolve the partition key range id.
      partitionKeyRangeId = await this.resolvePartitionKeyRangeId(operation, diagnosticNode);
    } catch (error) {
      operationError = error;
    }

    // Get helper & context.
    const helperForPartition = this.getHelperForPKRange(partitionKeyRangeId);
    const retryPolicy = this.getRetryPolicy();
    const context = new ItemOperationContext(partitionKeyRangeId, retryPolicy, diagnosticNode);
    const itemOperation: ItemOperation = {
      unencryptedOperationInput: unencryptedOperation,
      operationInput: operation,
      operationContext: context,
    };

    // Assign the promise (ensuring position matches input order)
    this.operationPromisesList[idx] = context.operationPromise;

    if (operationError) {
      const response: BulkOperationResult = {
        operationInput: unencryptedOperation,
        error: Object.assign(new ErrorResponse(operationError.message), {
          code: StatusCodes.InternalServerError,
          diagnostics: diagnosticNode?.toDiagnostic(this.clientContext.getClientConfig()),
        }),
      };
      context.fail(response);
      this.processedOperationCountRef.count++;
      return;
    }
    // Add the operation to the helper.
    return helperForPartition.add(itemOperation);
  }

  private async resolvePartitionKeyRangeId(
    operation: OperationInput,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<string> {
    const partitionKeyRanges = (
      await this.partitionKeyRangeCache.onCollectionRoutingMap(this.container.url, diagnosticNode)
    ).getOrderedParitionKeyRanges();

    const partitionKey = convertToInternalPartitionKey(operation.partitionKey);

    const hashedKey = hashPartitionKey(partitionKey, this.partitionKeyDefinition);

    const matchingRange = partitionKeyRanges.find((range) =>
      isKeyInRange(range.minInclusive, range.maxExclusive, hashedKey),
    );

    if (!matchingRange) {
      throw new Error("No matching partition key range found for the operation.");
    }
    return matchingRange.id;
  }

  private getRetryPolicy(): RetryPolicy {
    const nextRetryPolicy = new ResourceThrottleRetryPolicy(this.clientContext.getRetryOptions());
    return new BulkExecutionRetryPolicy(nextRetryPolicy);
  }

  private async executeRequest(
    operations: ItemOperation[],
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<BulkResponse> {
    if (this.isCancelled) {
      throw new ErrorResponse("Bulk execution cancelled due to a previous error.");
    }
    if (!operations.length) return;
    const pkRangeId = operations[0].operationContext.pkRangeId;
    const path = getPathFromLink(this.container.url, ResourceType.item);
    const requestBody: Operation[] = [];
    for (const itemOperation of operations) {
      requestBody.push(this.prepareOperation(itemOperation.operationInput));
    }
    if (!this.options.containerRid) {
      this.options.containerRid = this.container._rid;
    }
    try {
      const response = await addDiagnosticChild(
        async (childNode: DiagnosticNodeInternal) =>
          this.clientContext.bulk({
            body: requestBody,
            partitionKeyRangeId: pkRangeId,
            path: path,
            resourceId: this.container.url,
            options: this.options,
            diagnosticNode: childNode,
          }),
        diagnosticNode,
        DiagnosticNodeType.BATCH_REQUEST,
      );
      if (!response) {
        throw new ErrorResponse("Failed to fetch bulk response.");
      }
      return BulkResponse.fromResponseMessage(response, operations);
    } catch (error) {
      if (this.clientContext.enableEncryption) {
        try {
          await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
        } catch (err) {
          await this.cancelExecution(err);
          return BulkResponse.createEmptyResponse(operations, 0, 0, {});
        }
      }
      return BulkResponse.fromResponseMessage(error, operations);
    }
  }

  private prepareOperation(operationInput: OperationInput): Operation {
    operationInput.partitionKey = convertToInternalPartitionKey(operationInput.partitionKey);
    return {
      ...operationInput,
      partitionKey: JSON.stringify(operationInput.partitionKey),
    } as Operation;
  }

  private async reBatchOperation(
    operation: ItemOperation,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<void> {
    const partitionKeyRangeId = await this.resolvePartitionKeyRangeId(
      operation.operationInput,
      diagnosticNode,
    );
    operation.operationContext.updatePKRangeId(partitionKeyRangeId);
    const helper = this.getHelperForPKRange(partitionKeyRangeId);
    await helper.add(operation);
  }

  private async cancelExecution(error: ErrorResponse): Promise<void> {
    this.isCancelled = true;
    this.staleRidError = error;
    for (const helper of this.helpersByPartitionKeyRangeId.values()) {
      await helper.dispose();
    }
    this.helpersByPartitionKeyRangeId.clear();
  }

  private getHelperForPKRange(pkRangeId: string): HelperPerPartition {
    if (this.helpersByPartitionKeyRangeId.has(pkRangeId)) {
      return this.helpersByPartitionKeyRangeId.get(pkRangeId);
    }

    const newHelper = new HelperPerPartition(
      this.executeRequest,
      this.reBatchOperation,
      this.refreshPartitionKeyRangeCache,
      this.clientContext.diagnosticLevel,
      this.clientContext.enableEncryption,
      this.clientContext.getClientConfig(),
      this.container.encryptionProcessor,
      this.processedOperationCountRef,
    );
    this.helpersByPartitionKeyRangeId.set(pkRangeId, newHelper);
    return newHelper;
  }

  private runCongestionControlTimer(): void {
    this.congestionControlTimer = setInterval(() => {
      this.helpersByPartitionKeyRangeId.forEach((helper) => {
        helper.runCongestionAlgorithm();
      });
    }, this.congestionControlDelayInMs);
  }

  private async refreshPartitionKeyRangeCache(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<void> {
    await this.partitionKeyRangeCache.onCollectionRoutingMap(
      this.container.url,
      diagnosticNode,
      true,
    );
  }
}
