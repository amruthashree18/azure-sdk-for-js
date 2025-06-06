/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import type { Machines } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import type { ContainerServiceClient } from "../containerServiceClient.js";
import type {
  Machine,
  MachinesListNextOptionalParams,
  MachinesListOptionalParams,
  MachinesListResponse,
  MachinesGetOptionalParams,
  MachinesGetResponse,
  MachinesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Machines operations. */
export class MachinesImpl implements Machines {
  private readonly client: ContainerServiceClient;

  /**
   * Initialize a new instance of the class Machines class.
   * @param client Reference to the service client
   */
  constructor(client: ContainerServiceClient) {
    this.client = client;
  }

  /**
   * Gets a list of machines in the specified agent pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the managed cluster resource.
   * @param agentPoolName The name of the agent pool.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: MachinesListOptionalParams,
  ): PagedAsyncIterableIterator<Machine> {
    const iter = this.listPagingAll(
      resourceGroupName,
      resourceName,
      agentPoolName,
      options,
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
        return this.listPagingPage(
          resourceGroupName,
          resourceName,
          agentPoolName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: MachinesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Machine[]> {
    let result: MachinesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(
        resourceGroupName,
        resourceName,
        agentPoolName,
        options,
      );
      const page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        resourceName,
        agentPoolName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      const page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: MachinesListOptionalParams,
  ): AsyncIterableIterator<Machine> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      resourceName,
      agentPoolName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets a list of machines in the specified agent pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the managed cluster resource.
   * @param agentPoolName The name of the agent pool.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    options?: MachinesListOptionalParams,
  ): Promise<MachinesListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, agentPoolName, options },
      listOperationSpec,
    );
  }

  /**
   * Get a specific machine in the specified agent pool.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the managed cluster resource.
   * @param agentPoolName The name of the agent pool.
   * @param machineName host name of the machine
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    machineName: string,
    options?: MachinesGetOptionalParams,
  ): Promise<MachinesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, agentPoolName, machineName, options },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the managed cluster resource.
   * @param agentPoolName The name of the agent pool.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    resourceName: string,
    agentPoolName: string,
    nextLink: string,
    options?: MachinesListNextOptionalParams,
  ): Promise<MachinesListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, agentPoolName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/machines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MachineListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.agentPoolName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/agentPools/{agentPoolName}/machines/{machineName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Machine,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.agentPoolName,
    Parameters.machineName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MachineListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.nextLink,
    Parameters.agentPoolName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
