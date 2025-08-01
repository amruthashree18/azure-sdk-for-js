/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { ResourceSkus } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataMigrationManagementClient } from "../dataMigrationManagementClient.js";
import {
  ResourceSku,
  ResourceSkusListSkusNextOptionalParams,
  ResourceSkusListSkusOptionalParams,
  ResourceSkusListSkusResponse,
  ResourceSkusListSkusNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing ResourceSkus operations. */
export class ResourceSkusImpl implements ResourceSkus {
  private readonly client: DataMigrationManagementClient;

  /**
   * Initialize a new instance of the class ResourceSkus class.
   * @param client Reference to the service client
   */
  constructor(client: DataMigrationManagementClient) {
    this.client = client;
  }

  /**
   * The skus action returns the list of SKUs that DMS (classic) supports.
   * @param options The options parameters.
   */
  public listSkus(
    options?: ResourceSkusListSkusOptionalParams,
  ): PagedAsyncIterableIterator<ResourceSku> {
    const iter = this.listSkusPagingAll(options);
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
        return this.listSkusPagingPage(options, settings);
      },
    };
  }

  private async *listSkusPagingPage(
    options?: ResourceSkusListSkusOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<ResourceSku[]> {
    let result: ResourceSkusListSkusResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listSkus(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listSkusNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listSkusPagingAll(
    options?: ResourceSkusListSkusOptionalParams,
  ): AsyncIterableIterator<ResourceSku> {
    for await (const page of this.listSkusPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * The skus action returns the list of SKUs that DMS (classic) supports.
   * @param options The options parameters.
   */
  private _listSkus(
    options?: ResourceSkusListSkusOptionalParams,
  ): Promise<ResourceSkusListSkusResponse> {
    return this.client.sendOperationRequest({ options }, listSkusOperationSpec);
  }

  /**
   * ListSkusNext
   * @param nextLink The nextLink from the previous successful call to the ListSkus method.
   * @param options The options parameters.
   */
  private _listSkusNext(
    nextLink: string,
    options?: ResourceSkusListSkusNextOptionalParams,
  ): Promise<ResourceSkusListSkusNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listSkusNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listSkusOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.DataMigration/skus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceSkusResult,
    },
    default: {
      bodyMapper: Mappers.ApiError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listSkusNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceSkusResult,
    },
    default: {
      bodyMapper: Mappers.ApiError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
