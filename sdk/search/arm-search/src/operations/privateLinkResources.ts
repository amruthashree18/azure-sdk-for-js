/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { PrivateLinkResources } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { SearchManagementClient } from "../searchManagementClient.js";
import {
  PrivateLinkResource,
  PrivateLinkResourcesListSupportedOptionalParams,
  PrivateLinkResourcesListSupportedResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing PrivateLinkResources operations. */
export class PrivateLinkResourcesImpl implements PrivateLinkResources {
  private readonly client: SearchManagementClient;

  /**
   * Initialize a new instance of the class PrivateLinkResources class.
   * @param client Reference to the service client
   */
  constructor(client: SearchManagementClient) {
    this.client = client;
  }

  /**
   * Gets a list of all supported private link resource types for the given service.
   * @param resourceGroupName The name of the resource group within the current subscription. You can
   *                          obtain this value from the Azure Resource Manager API or the portal.
   * @param searchServiceName The name of the Azure AI Search service associated with the specified
   *                          resource group.
   * @param options The options parameters.
   */
  public listSupported(
    resourceGroupName: string,
    searchServiceName: string,
    options?: PrivateLinkResourcesListSupportedOptionalParams,
  ): PagedAsyncIterableIterator<PrivateLinkResource> {
    const iter = this.listSupportedPagingAll(resourceGroupName, searchServiceName, options);
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
        return this.listSupportedPagingPage(
          resourceGroupName,
          searchServiceName,
          options,
          settings,
        );
      },
    };
  }

  private async *listSupportedPagingPage(
    resourceGroupName: string,
    searchServiceName: string,
    options?: PrivateLinkResourcesListSupportedOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<PrivateLinkResource[]> {
    let result: PrivateLinkResourcesListSupportedResponse;
    result = await this._listSupported(resourceGroupName, searchServiceName, options);
    yield result.value || [];
  }

  private async *listSupportedPagingAll(
    resourceGroupName: string,
    searchServiceName: string,
    options?: PrivateLinkResourcesListSupportedOptionalParams,
  ): AsyncIterableIterator<PrivateLinkResource> {
    for await (const page of this.listSupportedPagingPage(
      resourceGroupName,
      searchServiceName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets a list of all supported private link resource types for the given service.
   * @param resourceGroupName The name of the resource group within the current subscription. You can
   *                          obtain this value from the Azure Resource Manager API or the portal.
   * @param searchServiceName The name of the Azure AI Search service associated with the specified
   *                          resource group.
   * @param options The options parameters.
   */
  private _listSupported(
    resourceGroupName: string,
    searchServiceName: string,
    options?: PrivateLinkResourcesListSupportedOptionalParams,
  ): Promise<PrivateLinkResourcesListSupportedResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, searchServiceName, options },
      listSupportedOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listSupportedOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/privateLinkResources",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateLinkResourcesResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.searchServiceName,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept, Parameters.clientRequestId],
  serializer,
};
