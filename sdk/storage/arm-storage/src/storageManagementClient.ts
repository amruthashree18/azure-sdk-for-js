/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import {
  BlobServicesImpl,
  BlobContainersImpl,
  FileServicesImpl,
  FileSharesImpl,
  QueueServicesImpl,
  QueueImpl,
  OperationsImpl,
  SkusImpl,
  StorageAccountsImpl,
  DeletedAccountsImpl,
  UsagesImpl,
  ManagementPoliciesImpl,
  BlobInventoryPoliciesImpl,
  PrivateEndpointConnectionsImpl,
  PrivateLinkResourcesImpl,
  ObjectReplicationPoliciesOperationsImpl,
  LocalUsersOperationsImpl,
  EncryptionScopesImpl,
  TableServicesImpl,
  TableOperationsImpl,
  NetworkSecurityPerimeterConfigurationsImpl,
  StorageTaskAssignmentsImpl,
  StorageTaskAssignmentsInstancesReportImpl,
  StorageTaskAssignmentInstancesReportImpl,
} from "./operations/index.js";
import {
  BlobServices,
  BlobContainers,
  FileServices,
  FileShares,
  QueueServices,
  Queue,
  Operations,
  Skus,
  StorageAccounts,
  DeletedAccounts,
  Usages,
  ManagementPolicies,
  BlobInventoryPolicies,
  PrivateEndpointConnections,
  PrivateLinkResources,
  ObjectReplicationPoliciesOperations,
  LocalUsersOperations,
  EncryptionScopes,
  TableServices,
  TableOperations,
  NetworkSecurityPerimeterConfigurations,
  StorageTaskAssignments,
  StorageTaskAssignmentsInstancesReport,
  StorageTaskAssignmentInstancesReport,
} from "./operationsInterfaces/index.js";
import { StorageManagementClientOptionalParams } from "./models/index.js";

export class StorageManagementClient extends coreClient.ServiceClient {
  $host: string;
  apiVersion: string;
  subscriptionId: string;

  /**
   * Initializes a new instance of the StorageManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The ID of the target subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    subscriptionId: string,
    options?: StorageManagementClientOptionalParams,
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (subscriptionId === undefined) {
      throw new Error("'subscriptionId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: StorageManagementClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials,
    };

    const packageDetails = `azsdk-js-arm-storage/18.6.0`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint:
        options.endpoint ?? options.baseUri ?? "https://management.azure.com",
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] =
        options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName,
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName,
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge,
          },
        }),
      );
    }
    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
    this.apiVersion = options.apiVersion || "2024-01-01";
    this.blobServices = new BlobServicesImpl(this);
    this.blobContainers = new BlobContainersImpl(this);
    this.fileServices = new FileServicesImpl(this);
    this.fileShares = new FileSharesImpl(this);
    this.queueServices = new QueueServicesImpl(this);
    this.queue = new QueueImpl(this);
    this.operations = new OperationsImpl(this);
    this.skus = new SkusImpl(this);
    this.storageAccounts = new StorageAccountsImpl(this);
    this.deletedAccounts = new DeletedAccountsImpl(this);
    this.usages = new UsagesImpl(this);
    this.managementPolicies = new ManagementPoliciesImpl(this);
    this.blobInventoryPolicies = new BlobInventoryPoliciesImpl(this);
    this.privateEndpointConnections = new PrivateEndpointConnectionsImpl(this);
    this.privateLinkResources = new PrivateLinkResourcesImpl(this);
    this.objectReplicationPoliciesOperations =
      new ObjectReplicationPoliciesOperationsImpl(this);
    this.localUsersOperations = new LocalUsersOperationsImpl(this);
    this.encryptionScopes = new EncryptionScopesImpl(this);
    this.tableServices = new TableServicesImpl(this);
    this.tableOperations = new TableOperationsImpl(this);
    this.networkSecurityPerimeterConfigurations =
      new NetworkSecurityPerimeterConfigurationsImpl(this);
    this.storageTaskAssignments = new StorageTaskAssignmentsImpl(this);
    this.storageTaskAssignmentsInstancesReport =
      new StorageTaskAssignmentsInstancesReportImpl(this);
    this.storageTaskAssignmentInstancesReport =
      new StorageTaskAssignmentInstancesReportImpl(this);
    this.addCustomApiVersionPolicy(options.apiVersion);
  }

  /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
  private addCustomApiVersionPolicy(apiVersion?: string) {
    if (!apiVersion) {
      return;
    }
    const apiVersionPolicy = {
      name: "CustomApiVersionPolicy",
      async sendRequest(
        request: PipelineRequest,
        next: SendRequest,
      ): Promise<PipelineResponse> {
        const param = request.url.split("?");
        if (param.length > 1) {
          const newParams = param[1].split("&").map((item) => {
            if (item.indexOf("api-version") > -1) {
              return "api-version=" + apiVersion;
            } else {
              return item;
            }
          });
          request.url = param[0] + "?" + newParams.join("&");
        }
        return next(request);
      },
    };
    this.pipeline.addPolicy(apiVersionPolicy);
  }

  blobServices: BlobServices;
  blobContainers: BlobContainers;
  fileServices: FileServices;
  fileShares: FileShares;
  queueServices: QueueServices;
  queue: Queue;
  operations: Operations;
  skus: Skus;
  storageAccounts: StorageAccounts;
  deletedAccounts: DeletedAccounts;
  usages: Usages;
  managementPolicies: ManagementPolicies;
  blobInventoryPolicies: BlobInventoryPolicies;
  privateEndpointConnections: PrivateEndpointConnections;
  privateLinkResources: PrivateLinkResources;
  objectReplicationPoliciesOperations: ObjectReplicationPoliciesOperations;
  localUsersOperations: LocalUsersOperations;
  encryptionScopes: EncryptionScopes;
  tableServices: TableServices;
  tableOperations: TableOperations;
  networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurations;
  storageTaskAssignments: StorageTaskAssignments;
  storageTaskAssignmentsInstancesReport: StorageTaskAssignmentsInstancesReport;
  storageTaskAssignmentInstancesReport: StorageTaskAssignmentInstancesReport;
}
