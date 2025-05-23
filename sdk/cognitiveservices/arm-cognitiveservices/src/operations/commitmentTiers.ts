/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { CommitmentTiers } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { CognitiveServicesManagementClient } from "../cognitiveServicesManagementClient.js";
import {
  CommitmentTier,
  CommitmentTiersListNextOptionalParams,
  CommitmentTiersListOptionalParams,
  CommitmentTiersListResponse,
  CommitmentTiersListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing CommitmentTiers operations. */
export class CommitmentTiersImpl implements CommitmentTiers {
  private readonly client: CognitiveServicesManagementClient;

  /**
   * Initialize a new instance of the class CommitmentTiers class.
   * @param client Reference to the service client
   */
  constructor(client: CognitiveServicesManagementClient) {
    this.client = client;
  }

  /**
   * List Commitment Tiers.
   * @param location Resource location.
   * @param options The options parameters.
   */
  public list(
    location: string,
    options?: CommitmentTiersListOptionalParams,
  ): PagedAsyncIterableIterator<CommitmentTier> {
    const iter = this.listPagingAll(location, options);
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
        return this.listPagingPage(location, options, settings);
      },
    };
  }

  private async *listPagingPage(
    location: string,
    options?: CommitmentTiersListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<CommitmentTier[]> {
    let result: CommitmentTiersListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(location, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(location, continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    location: string,
    options?: CommitmentTiersListOptionalParams,
  ): AsyncIterableIterator<CommitmentTier> {
    for await (const page of this.listPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * List Commitment Tiers.
   * @param location Resource location.
   * @param options The options parameters.
   */
  private _list(
    location: string,
    options?: CommitmentTiersListOptionalParams,
  ): Promise<CommitmentTiersListResponse> {
    return this.client.sendOperationRequest({ location, options }, listOperationSpec);
  }

  /**
   * ListNext
   * @param location Resource location.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    location: string,
    nextLink: string,
    options?: CommitmentTiersListNextOptionalParams,
  ): Promise<CommitmentTiersListNextResponse> {
    return this.client.sendOperationRequest({ location, nextLink, options }, listNextOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/commitmentTiers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CommitmentTierListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId, Parameters.location],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CommitmentTierListResult,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
