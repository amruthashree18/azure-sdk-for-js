/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  CloudExadataInfrastructure,
  CloudExadataInfrastructuresListBySubscriptionOptionalParams,
  CloudExadataInfrastructuresListByResourceGroupOptionalParams,
  CloudExadataInfrastructuresGetOptionalParams,
  CloudExadataInfrastructuresGetResponse,
  CloudExadataInfrastructuresCreateOrUpdateOptionalParams,
  CloudExadataInfrastructuresCreateOrUpdateResponse,
  CloudExadataInfrastructureUpdate,
  CloudExadataInfrastructuresUpdateOptionalParams,
  CloudExadataInfrastructuresUpdateResponse,
  CloudExadataInfrastructuresDeleteOptionalParams,
  CloudExadataInfrastructuresDeleteResponse,
  CloudExadataInfrastructuresAddStorageCapacityOptionalParams,
  CloudExadataInfrastructuresAddStorageCapacityResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a CloudExadataInfrastructures. */
export interface CloudExadataInfrastructures {
  /**
   * List CloudExadataInfrastructure resources by subscription ID
   * @param options The options parameters.
   */
  listBySubscription(
    options?: CloudExadataInfrastructuresListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<CloudExadataInfrastructure>;
  /**
   * List CloudExadataInfrastructure resources by resource group
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: CloudExadataInfrastructuresListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<CloudExadataInfrastructure>;
  /**
   * Get a CloudExadataInfrastructure
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresGetOptionalParams,
  ): Promise<CloudExadataInfrastructuresGetResponse>;
  /**
   * Create a CloudExadataInfrastructure
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    resource: CloudExadataInfrastructure,
    options?: CloudExadataInfrastructuresCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CloudExadataInfrastructuresCreateOrUpdateResponse>,
      CloudExadataInfrastructuresCreateOrUpdateResponse
    >
  >;
  /**
   * Create a CloudExadataInfrastructure
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param resource Resource create parameters.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    resource: CloudExadataInfrastructure,
    options?: CloudExadataInfrastructuresCreateOrUpdateOptionalParams,
  ): Promise<CloudExadataInfrastructuresCreateOrUpdateResponse>;
  /**
   * Update a CloudExadataInfrastructure
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param properties The resource properties to be updated.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    properties: CloudExadataInfrastructureUpdate,
    options?: CloudExadataInfrastructuresUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CloudExadataInfrastructuresUpdateResponse>,
      CloudExadataInfrastructuresUpdateResponse
    >
  >;
  /**
   * Update a CloudExadataInfrastructure
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param properties The resource properties to be updated.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    properties: CloudExadataInfrastructureUpdate,
    options?: CloudExadataInfrastructuresUpdateOptionalParams,
  ): Promise<CloudExadataInfrastructuresUpdateResponse>;
  /**
   * Delete a CloudExadataInfrastructure
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CloudExadataInfrastructuresDeleteResponse>,
      CloudExadataInfrastructuresDeleteResponse
    >
  >;
  /**
   * Delete a CloudExadataInfrastructure
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresDeleteOptionalParams,
  ): Promise<CloudExadataInfrastructuresDeleteResponse>;
  /**
   * Perform add storage capacity on exadata infra
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param options The options parameters.
   */
  beginAddStorageCapacity(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresAddStorageCapacityOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CloudExadataInfrastructuresAddStorageCapacityResponse>,
      CloudExadataInfrastructuresAddStorageCapacityResponse
    >
  >;
  /**
   * Perform add storage capacity on exadata infra
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cloudexadatainfrastructurename CloudExadataInfrastructure name
   * @param options The options parameters.
   */
  beginAddStorageCapacityAndWait(
    resourceGroupName: string,
    cloudexadatainfrastructurename: string,
    options?: CloudExadataInfrastructuresAddStorageCapacityOptionalParams,
  ): Promise<CloudExadataInfrastructuresAddStorageCapacityResponse>;
}
