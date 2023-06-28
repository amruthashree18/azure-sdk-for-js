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
  ExternalNetwork,
  ExternalNetworksListOptionalParams,
  ExternalNetworksCreateOptionalParams,
  ExternalNetworksCreateResponse,
  ExternalNetworksGetOptionalParams,
  ExternalNetworksGetResponse,
  ExternalNetworkPatch,
  ExternalNetworksUpdateOptionalParams,
  ExternalNetworksUpdateResponse,
  ExternalNetworksDeleteOptionalParams,
  UpdateAdministrativeState,
  ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ExternalNetworksUpdateAdministrativeStateResponse,
  ExternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  ExternalNetworksUpdateBgpAdministrativeStateResponse,
  ExternalNetworksUpdateBfdForBgpAdministrativeStateOptionalParams,
  ExternalNetworksUpdateBfdForBgpAdministrativeStateResponse,
  EnableDisableOnResources,
  ExternalNetworksClearIpv6NeighborsOptionalParams,
  ExternalNetworksClearIpv6NeighborsResponse,
  ExternalNetworksClearArpEntriesOptionalParams,
  ExternalNetworksClearArpEntriesResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ExternalNetworks. */
export interface ExternalNetworks {
  /**
   * Implements External Networks list by resource group GET method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    options?: ExternalNetworksListOptionalParams
  ): PagedAsyncIterableIterator<ExternalNetwork>;
  /**
   * Creates ExternalNetwork PUT method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param externalNetworkName Name of the ExternalNetwork
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetwork,
    options?: ExternalNetworksCreateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<ExternalNetworksCreateResponse>,
      ExternalNetworksCreateResponse
    >
  >;
  /**
   * Creates ExternalNetwork PUT method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param externalNetworkName Name of the ExternalNetwork
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetwork,
    options?: ExternalNetworksCreateOptionalParams
  ): Promise<ExternalNetworksCreateResponse>;
  /**
   * Implements ExternalNetworks GET method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param externalNetworkName Name of the ExternalNetwork
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksGetOptionalParams
  ): Promise<ExternalNetworksGetResponse>;
  /**
   * API to update certain properties of the ExternalNetworks resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param externalNetworkName Name of the ExternalNetwork
   * @param body ExternalNetwork properties to update. Only annotations are supported.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkPatch,
    options?: ExternalNetworksUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<ExternalNetworksUpdateResponse>,
      ExternalNetworksUpdateResponse
    >
  >;
  /**
   * API to update certain properties of the ExternalNetworks resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param externalNetworkName Name of the ExternalNetwork
   * @param body ExternalNetwork properties to update. Only annotations are supported.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: ExternalNetworkPatch,
    options?: ExternalNetworksUpdateOptionalParams
  ): Promise<ExternalNetworksUpdateResponse>;
  /**
   * Implements ExternalNetworks DELETE method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param externalNetworkName Name of the ExternalNetwork
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Implements ExternalNetworks DELETE method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain
   * @param externalNetworkName Name of the ExternalNetwork
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    options?: ExternalNetworksDeleteOptionalParams
  ): Promise<void>;
  /**
   * Executes update operation to enable or disable administrative State for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginUpdateAdministrativeState(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateAdministrativeStateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<ExternalNetworksUpdateAdministrativeStateResponse>,
      ExternalNetworksUpdateAdministrativeStateResponse
    >
  >;
  /**
   * Executes update operation to enable or disable administrative State for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginUpdateAdministrativeStateAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateAdministrativeStateOptionalParams
  ): Promise<ExternalNetworksUpdateAdministrativeStateResponse>;
  /**
   * Update BGP for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginUpdateBgpAdministrativeState(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateBgpAdministrativeStateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<ExternalNetworksUpdateBgpAdministrativeStateResponse>,
      ExternalNetworksUpdateBgpAdministrativeStateResponse
    >
  >;
  /**
   * Update BGP for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginUpdateBgpAdministrativeStateAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateBgpAdministrativeStateOptionalParams
  ): Promise<ExternalNetworksUpdateBgpAdministrativeStateResponse>;
  /**
   * Update BfdForBgp for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginUpdateBfdForBgpAdministrativeState(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateBfdForBgpAdministrativeStateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<
        ExternalNetworksUpdateBfdForBgpAdministrativeStateResponse
      >,
      ExternalNetworksUpdateBfdForBgpAdministrativeStateResponse
    >
  >;
  /**
   * Update BfdForBgp for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginUpdateBfdForBgpAdministrativeStateAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: UpdateAdministrativeState,
    options?: ExternalNetworksUpdateBfdForBgpAdministrativeStateOptionalParams
  ): Promise<ExternalNetworksUpdateBfdForBgpAdministrativeStateResponse>;
  /**
   * clearIpv6Neighbors for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginClearIpv6Neighbors(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: EnableDisableOnResources,
    options?: ExternalNetworksClearIpv6NeighborsOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<ExternalNetworksClearIpv6NeighborsResponse>,
      ExternalNetworksClearIpv6NeighborsResponse
    >
  >;
  /**
   * clearIpv6Neighbors for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginClearIpv6NeighborsAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: EnableDisableOnResources,
    options?: ExternalNetworksClearIpv6NeighborsOptionalParams
  ): Promise<ExternalNetworksClearIpv6NeighborsResponse>;
  /**
   * clearArpEntries for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginClearArpEntries(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: EnableDisableOnResources,
    options?: ExternalNetworksClearArpEntriesOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<ExternalNetworksClearArpEntriesResponse>,
      ExternalNetworksClearArpEntriesResponse
    >
  >;
  /**
   * clearArpEntries for externalNetwork.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param l3IsolationDomainName Name of the L3IsolationDomain.
   * @param externalNetworkName Name of the ExternalNetwork.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginClearArpEntriesAndWait(
    resourceGroupName: string,
    l3IsolationDomainName: string,
    externalNetworkName: string,
    body: EnableDisableOnResources,
    options?: ExternalNetworksClearArpEntriesOptionalParams
  ): Promise<ExternalNetworksClearArpEntriesResponse>;
}