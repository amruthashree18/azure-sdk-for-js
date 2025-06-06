/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Compliances } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { SecurityCenter } from "../securityCenter.js";
import {
  Compliance,
  CompliancesListNextOptionalParams,
  CompliancesListOptionalParams,
  CompliancesListResponse,
  CompliancesGetOptionalParams,
  CompliancesGetResponse,
  CompliancesListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Compliances operations. */
export class CompliancesImpl implements Compliances {
  private readonly client: SecurityCenter;

  /**
   * Initialize a new instance of the class Compliances class.
   * @param client Reference to the service client
   */
  constructor(client: SecurityCenter) {
    this.client = client;
  }

  /**
   * The Compliance scores of the specific management group.
   * @param scope Scope of the query, can be subscription
   *              (/subscriptions/0b06d9ea-afe6-4779-bd59-30e5c2d9d13f) or management group
   *              (/providers/Microsoft.Management/managementGroups/mgName).
   * @param options The options parameters.
   */
  public list(
    scope: string,
    options?: CompliancesListOptionalParams,
  ): PagedAsyncIterableIterator<Compliance> {
    const iter = this.listPagingAll(scope, options);
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
        return this.listPagingPage(scope, options, settings);
      },
    };
  }

  private async *listPagingPage(
    scope: string,
    options?: CompliancesListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<Compliance[]> {
    let result: CompliancesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(scope, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(scope, continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    scope: string,
    options?: CompliancesListOptionalParams,
  ): AsyncIterableIterator<Compliance> {
    for await (const page of this.listPagingPage(scope, options)) {
      yield* page;
    }
  }

  /**
   * The Compliance scores of the specific management group.
   * @param scope Scope of the query, can be subscription
   *              (/subscriptions/0b06d9ea-afe6-4779-bd59-30e5c2d9d13f) or management group
   *              (/providers/Microsoft.Management/managementGroups/mgName).
   * @param options The options parameters.
   */
  private _list(
    scope: string,
    options?: CompliancesListOptionalParams,
  ): Promise<CompliancesListResponse> {
    return this.client.sendOperationRequest(
      { scope, options },
      listOperationSpec,
    );
  }

  /**
   * Details of a specific Compliance.
   * @param scope Scope of the query, can be subscription
   *              (/subscriptions/0b06d9ea-afe6-4779-bd59-30e5c2d9d13f) or management group
   *              (/providers/Microsoft.Management/managementGroups/mgName).
   * @param complianceName name of the Compliance
   * @param options The options parameters.
   */
  get(
    scope: string,
    complianceName: string,
    options?: CompliancesGetOptionalParams,
  ): Promise<CompliancesGetResponse> {
    return this.client.sendOperationRequest(
      { scope, complianceName, options },
      getOperationSpec,
    );
  }

  /**
   * ListNext
   * @param scope Scope of the query, can be subscription
   *              (/subscriptions/0b06d9ea-afe6-4779-bd59-30e5c2d9d13f) or management group
   *              (/providers/Microsoft.Management/managementGroups/mgName).
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    scope: string,
    nextLink: string,
    options?: CompliancesListNextOptionalParams,
  ): Promise<CompliancesListNextResponse> {
    return this.client.sendOperationRequest(
      { scope, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Security/compliances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ComplianceList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.$host, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Security/compliances/{complianceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Compliance,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.scope,
    Parameters.complianceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ComplianceList,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [Parameters.$host, Parameters.nextLink, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer,
};
