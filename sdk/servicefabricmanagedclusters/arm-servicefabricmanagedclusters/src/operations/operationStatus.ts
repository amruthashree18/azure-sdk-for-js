/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { OperationStatus } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ServiceFabricManagedClustersManagementClient } from "../serviceFabricManagedClustersManagementClient.js";
import {
  OperationStatusGetOptionalParams,
  OperationStatusGetResponse,
} from "../models/index.js";

/** Class containing OperationStatus operations. */
export class OperationStatusImpl implements OperationStatus {
  private readonly client: ServiceFabricManagedClustersManagementClient;

  /**
   * Initialize a new instance of the class OperationStatus class.
   * @param client Reference to the service client
   */
  constructor(client: ServiceFabricManagedClustersManagementClient) {
    this.client = client;
  }

  /**
   * Get long running operation status.
   * @param location The location for the cluster code versions. This is different from cluster location.
   * @param operationId operation identifier.
   * @param options The options parameters.
   */
  get(
    location: string,
    operationId: string,
    options?: OperationStatusGetOptionalParams,
  ): Promise<OperationStatusGetResponse> {
    return this.client.sendOperationRequest(
      { location, operationId, options },
      getOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterOperations/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LongRunningOperationResult,
    },
    default: {
      bodyMapper: Mappers.ErrorModel,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.operationId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
