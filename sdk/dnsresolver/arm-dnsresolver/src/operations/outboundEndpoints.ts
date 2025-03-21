/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { OutboundEndpoints } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DnsResolverManagementClient } from "../dnsResolverManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  OutboundEndpoint,
  OutboundEndpointsListNextOptionalParams,
  OutboundEndpointsListOptionalParams,
  OutboundEndpointsListResponse,
  OutboundEndpointsCreateOrUpdateOptionalParams,
  OutboundEndpointsCreateOrUpdateResponse,
  OutboundEndpointPatch,
  OutboundEndpointsUpdateOptionalParams,
  OutboundEndpointsUpdateResponse,
  OutboundEndpointsDeleteOptionalParams,
  OutboundEndpointsGetOptionalParams,
  OutboundEndpointsGetResponse,
  OutboundEndpointsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing OutboundEndpoints operations. */
export class OutboundEndpointsImpl implements OutboundEndpoints {
  private readonly client: DnsResolverManagementClient;

  /**
   * Initialize a new instance of the class OutboundEndpoints class.
   * @param client Reference to the service client
   */
  constructor(client: DnsResolverManagementClient) {
    this.client = client;
  }

  /**
   * Lists outbound endpoints for a DNS resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    dnsResolverName: string,
    options?: OutboundEndpointsListOptionalParams,
  ): PagedAsyncIterableIterator<OutboundEndpoint> {
    const iter = this.listPagingAll(
      resourceGroupName,
      dnsResolverName,
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
          dnsResolverName,
          options,
          settings,
        );
      },
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    dnsResolverName: string,
    options?: OutboundEndpointsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<OutboundEndpoint[]> {
    let result: OutboundEndpointsListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(resourceGroupName, dnsResolverName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        dnsResolverName,
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
    dnsResolverName: string,
    options?: OutboundEndpointsListOptionalParams,
  ): AsyncIterableIterator<OutboundEndpoint> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      dnsResolverName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Creates or updates an outbound endpoint for a DNS resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param outboundEndpointName The name of the outbound endpoint for the DNS resolver.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpoint,
    options?: OutboundEndpointsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<OutboundEndpointsCreateOrUpdateResponse>,
      OutboundEndpointsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<OutboundEndpointsCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      OutboundEndpointsCreateOrUpdateResponse,
      OperationState<OutboundEndpointsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates an outbound endpoint for a DNS resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param outboundEndpointName The name of the outbound endpoint for the DNS resolver.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpoint,
    options?: OutboundEndpointsCreateOrUpdateOptionalParams,
  ): Promise<OutboundEndpointsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      dnsResolverName,
      outboundEndpointName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates an outbound endpoint for a DNS resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param outboundEndpointName The name of the outbound endpoint for the DNS resolver.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpointPatch,
    options?: OutboundEndpointsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<OutboundEndpointsUpdateResponse>,
      OutboundEndpointsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<OutboundEndpointsUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        parameters,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      OutboundEndpointsUpdateResponse,
      OperationState<OutboundEndpointsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates an outbound endpoint for a DNS resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param outboundEndpointName The name of the outbound endpoint for the DNS resolver.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    parameters: OutboundEndpointPatch,
    options?: OutboundEndpointsUpdateOptionalParams,
  ): Promise<OutboundEndpointsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      dnsResolverName,
      outboundEndpointName,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param outboundEndpointName The name of the outbound endpoint for the DNS resolver.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        dnsResolverName,
        outboundEndpointName,
        options,
      },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes an outbound endpoint for a DNS resolver. WARNING: This operation cannot be undone.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param outboundEndpointName The name of the outbound endpoint for the DNS resolver.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      dnsResolverName,
      outboundEndpointName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets properties of an outbound endpoint for a DNS resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param outboundEndpointName The name of the outbound endpoint for the DNS resolver.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    dnsResolverName: string,
    outboundEndpointName: string,
    options?: OutboundEndpointsGetOptionalParams,
  ): Promise<OutboundEndpointsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dnsResolverName, outboundEndpointName, options },
      getOperationSpec,
    );
  }

  /**
   * Lists outbound endpoints for a DNS resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    dnsResolverName: string,
    options?: OutboundEndpointsListOptionalParams,
  ): Promise<OutboundEndpointsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dnsResolverName, options },
      listOperationSpec,
    );
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverName The name of the DNS resolver.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    dnsResolverName: string,
    nextLink: string,
    options?: OutboundEndpointsListNextOptionalParams,
  ): Promise<OutboundEndpointsListNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, dnsResolverName, nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    201: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    202: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    204: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverName,
    Parameters.outboundEndpointName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
    Parameters.ifNoneMatch,
  ],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    201: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    202: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    204: {
      bodyMapper: Mappers.OutboundEndpoint,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverName,
    Parameters.outboundEndpointName,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
  ],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverName,
    Parameters.outboundEndpointName,
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints/{outboundEndpointName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OutboundEndpoint,
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
    Parameters.dnsResolverName,
    Parameters.outboundEndpointName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/outboundEndpoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OutboundEndpointListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OutboundEndpointListResult,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.dnsResolverName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
