/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { UpdateRuns } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ContainerServiceFleetClient } from "../containerServiceFleetClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  UpdateRun,
  UpdateRunsListByFleetNextOptionalParams,
  UpdateRunsListByFleetOptionalParams,
  UpdateRunsListByFleetResponse,
  UpdateRunsGetOptionalParams,
  UpdateRunsGetResponse,
  UpdateRunsCreateOrUpdateOptionalParams,
  UpdateRunsCreateOrUpdateResponse,
  UpdateRunsDeleteOptionalParams,
  UpdateRunsStartOptionalParams,
  UpdateRunsStartResponse,
  UpdateRunsStopOptionalParams,
  UpdateRunsStopResponse,
  UpdateRunsListByFleetNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing UpdateRuns operations. */
export class UpdateRunsImpl implements UpdateRuns {
  private readonly client: ContainerServiceFleetClient;

  /**
   * Initialize a new instance of the class UpdateRuns class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerServiceFleetClient) {
    this.client = client;
  }

  /**
   * List UpdateRun resources by Fleet
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param options The options parameters.
   */
  public listByFleet(
    resourceGroupName: string,
    fleetName: string,
    options?: UpdateRunsListByFleetOptionalParams
  ): PagedAsyncIterableIterator<UpdateRun> {
    const iter = this.listByFleetPagingAll(
      resourceGroupName,
      fleetName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByFleetPagingPage(
          resourceGroupName,
          fleetName,
          options,
          settings
        );
      }
    };
  }

  private async *listByFleetPagingPage(
    resourceGroupName: string,
    fleetName: string,
    options?: UpdateRunsListByFleetOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<UpdateRun[]> {
    let result: UpdateRunsListByFleetResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByFleet(resourceGroupName, fleetName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByFleetNext(
        resourceGroupName,
        fleetName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByFleetPagingAll(
    resourceGroupName: string,
    fleetName: string,
    options?: UpdateRunsListByFleetOptionalParams
  ): AsyncIterableIterator<UpdateRun> {
    for await (const page of this.listByFleetPagingPage(
      resourceGroupName,
      fleetName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * List UpdateRun resources by Fleet
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param options The options parameters.
   */
  private _listByFleet(
    resourceGroupName: string,
    fleetName: string,
    options?: UpdateRunsListByFleetOptionalParams
  ): Promise<UpdateRunsListByFleetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, fleetName, options },
      listByFleetOperationSpec
    );
  }

  /**
   * Get a UpdateRun
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsGetOptionalParams
  ): Promise<UpdateRunsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, fleetName, updateRunName, options },
      getOperationSpec
    );
  }

  /**
   * Create a UpdateRun
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    resource: UpdateRun,
    options?: UpdateRunsCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<UpdateRunsCreateOrUpdateResponse>,
      UpdateRunsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<UpdateRunsCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, fleetName, updateRunName, resource, options },
      spec: createOrUpdateOperationSpec
    });
    const poller = await createHttpPoller<
      UpdateRunsCreateOrUpdateResponse,
      OperationState<UpdateRunsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create a UpdateRun
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    resource: UpdateRun,
    options?: UpdateRunsCreateOrUpdateOptionalParams
  ): Promise<UpdateRunsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      fleetName,
      updateRunName,
      resource,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete a UpdateRun
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, fleetName, updateRunName, options },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete a UpdateRun
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      fleetName,
      updateRunName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Starts an UpdateRun.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param options The options parameters.
   */
  async beginStart(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsStartOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<UpdateRunsStartResponse>,
      UpdateRunsStartResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<UpdateRunsStartResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, fleetName, updateRunName, options },
      spec: startOperationSpec
    });
    const poller = await createHttpPoller<
      UpdateRunsStartResponse,
      OperationState<UpdateRunsStartResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Starts an UpdateRun.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param options The options parameters.
   */
  async beginStartAndWait(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsStartOptionalParams
  ): Promise<UpdateRunsStartResponse> {
    const poller = await this.beginStart(
      resourceGroupName,
      fleetName,
      updateRunName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Stops an UpdateRun.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param options The options parameters.
   */
  async beginStop(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsStopOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<UpdateRunsStopResponse>,
      UpdateRunsStopResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<UpdateRunsStopResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, fleetName, updateRunName, options },
      spec: stopOperationSpec
    });
    const poller = await createHttpPoller<
      UpdateRunsStopResponse,
      OperationState<UpdateRunsStopResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Stops an UpdateRun.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param updateRunName The name of the UpdateRun resource.
   * @param options The options parameters.
   */
  async beginStopAndWait(
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsStopOptionalParams
  ): Promise<UpdateRunsStopResponse> {
    const poller = await this.beginStop(
      resourceGroupName,
      fleetName,
      updateRunName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByFleetNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param fleetName The name of the Fleet resource.
   * @param nextLink The nextLink from the previous successful call to the ListByFleet method.
   * @param options The options parameters.
   */
  private _listByFleetNext(
    resourceGroupName: string,
    fleetName: string,
    nextLink: string,
    options?: UpdateRunsListByFleetNextOptionalParams
  ): Promise<UpdateRunsListByFleetNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, fleetName, nextLink, options },
      listByFleetNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByFleetOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRunListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.fleetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRun
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.fleetName,
    Parameters.updateRunName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRun
    },
    201: {
      bodyMapper: Mappers.UpdateRun
    },
    202: {
      bodyMapper: Mappers.UpdateRun
    },
    204: {
      bodyMapper: Mappers.UpdateRun
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.resource2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.fleetName,
    Parameters.updateRunName
  ],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch,
    Parameters.ifNoneMatch
  ],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.fleetName,
    Parameters.updateRunName
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch],
  serializer
};
const startOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/start",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRun
    },
    201: {
      bodyMapper: Mappers.UpdateRun
    },
    202: {
      bodyMapper: Mappers.UpdateRun
    },
    204: {
      bodyMapper: Mappers.UpdateRun
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.fleetName,
    Parameters.updateRunName
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch],
  serializer
};
const stopOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}/stop",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRun
    },
    201: {
      bodyMapper: Mappers.UpdateRun
    },
    202: {
      bodyMapper: Mappers.UpdateRun
    },
    204: {
      bodyMapper: Mappers.UpdateRun
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.fleetName,
    Parameters.updateRunName
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch],
  serializer
};
const listByFleetNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateRunListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.fleetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};