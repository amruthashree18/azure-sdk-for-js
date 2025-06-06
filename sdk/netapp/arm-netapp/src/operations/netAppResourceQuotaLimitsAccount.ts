/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { NetAppResourceQuotaLimitsAccount } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { NetAppManagementClient } from "../netAppManagementClient.js";
import {
  QuotaItem,
  NetAppResourceQuotaLimitsAccountListNextOptionalParams,
  NetAppResourceQuotaLimitsAccountListOptionalParams,
  NetAppResourceQuotaLimitsAccountListResponse,
  NetAppResourceQuotaLimitsAccountGetOptionalParams,
  NetAppResourceQuotaLimitsAccountGetResponse,
  NetAppResourceQuotaLimitsAccountListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing NetAppResourceQuotaLimitsAccount operations. */
export class NetAppResourceQuotaLimitsAccountImpl
  implements NetAppResourceQuotaLimitsAccount
{
  private readonly client: NetAppManagementClient;

  /**
   * Initialize a new instance of the class NetAppResourceQuotaLimitsAccount class.
   * @param client Reference to the service client
   */
  constructor(client: NetAppManagementClient) {
    this.client = client;
  }

  /**
   * Gets a list of quota limits for all quotas that are under account. Currently PoolsPerAccount is the
   * only one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    accountName: string,
    options?: NetAppResourceQuotaLimitsAccountListOptionalParams,
  ): PagedAsyncIterableIterator<QuotaItem> {
    const iter = this.listPagingAll(resourceGroupName, accountName, options);
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
          accountName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    accountName: string,
    options?: NetAppResourceQuotaLimitsAccountListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<QuotaItem[]> {
    let result: NetAppResourceQuotaLimitsAccountListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, accountName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        accountName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    accountName: string,
    options?: NetAppResourceQuotaLimitsAccountListOptionalParams,
  ): AsyncIterableIterator<QuotaItem> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      accountName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets a list of quota limits for all quotas that are under account. Currently PoolsPerAccount is the
   * only one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    accountName: string,
    options?: NetAppResourceQuotaLimitsAccountListOptionalParams,
  ): Promise<NetAppResourceQuotaLimitsAccountListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options },
      listOperationSpec,
    );
  }

  /**
   * Get the default, current and usages account quota limit
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param quotaLimitName The name of the Quota Limit
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    quotaLimitName: string,
    options?: NetAppResourceQuotaLimitsAccountGetOptionalParams,
  ): Promise<NetAppResourceQuotaLimitsAccountGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, quotaLimitName, options },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    accountName: string,
    nextLink: string,
    options?: NetAppResourceQuotaLimitsAccountListNextOptionalParams,
  ): Promise<NetAppResourceQuotaLimitsAccountListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/quotaLimits",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaItemList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/quotaLimits/{quotaLimitName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaItem,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.quotaLimitName,
    Parameters.resourceGroupName,
    Parameters.accountName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaItemList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
