/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SqlPoolMaintenanceWindowOptions } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { SynapseManagementClient } from "../synapseManagementClient.js";
import {
  SqlPoolMaintenanceWindowOptionsGetOptionalParams,
  SqlPoolMaintenanceWindowOptionsGetResponse
} from "../models/index.js";

/** Class containing SqlPoolMaintenanceWindowOptions operations. */
export class SqlPoolMaintenanceWindowOptionsImpl
  implements SqlPoolMaintenanceWindowOptions {
  private readonly client: SynapseManagementClient;

  /**
   * Initialize a new instance of the class SqlPoolMaintenanceWindowOptions class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseManagementClient) {
    this.client = client;
  }

  /**
   * Get list of SQL pool's available maintenance windows.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the workspace.
   * @param sqlPoolName SQL pool name
   * @param maintenanceWindowOptionsName Maintenance window options name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    sqlPoolName: string,
    maintenanceWindowOptionsName: string,
    options?: SqlPoolMaintenanceWindowOptionsGetOptionalParams
  ): Promise<SqlPoolMaintenanceWindowOptionsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        workspaceName,
        sqlPoolName,
        maintenanceWindowOptionsName,
        options
      },
      getOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Synapse/workspaces/{workspaceName}/sqlPools/{sqlPoolName}/maintenanceWindowOptions/current",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MaintenanceWindowOptions
    },
    default: {}
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.maintenanceWindowOptionsName
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.sqlPoolName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
