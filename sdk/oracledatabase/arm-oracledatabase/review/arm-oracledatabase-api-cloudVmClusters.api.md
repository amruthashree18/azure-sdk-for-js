## API Report File for "@azure/arm-oracledatabase"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Client } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { OperationState } from '@azure/core-lro';
import { PollerLike } from '@azure/core-lro';

// @public
export function $delete(context: OracleDatabaseManagementContext, resourceGroupName: string, cloudvmclustername: string, options?: CloudVmClustersDeleteOptionalParams): PollerLike<OperationState<void>, void>;

// @public
export function addVms(context: OracleDatabaseManagementContext, resourceGroupName: string, cloudvmclustername: string, body: AddRemoveDbNode, options?: CloudVmClustersAddVmsOptionalParams): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;

// @public
export interface CloudVmClustersAddVmsOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface CloudVmClustersCreateOrUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface CloudVmClustersDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface CloudVmClustersGetOptionalParams extends OperationOptions {
}

// @public
export interface CloudVmClustersListByResourceGroupOptionalParams extends OperationOptions {
}

// @public
export interface CloudVmClustersListBySubscriptionOptionalParams extends OperationOptions {
}

// @public
export interface CloudVmClustersListPrivateIpAddressesOptionalParams extends OperationOptions {
}

// @public
export interface CloudVmClustersRemoveVmsOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface CloudVmClustersUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export function createOrUpdate(context: OracleDatabaseManagementContext, resourceGroupName: string, cloudvmclustername: string, resource: CloudVmCluster, options?: CloudVmClustersCreateOrUpdateOptionalParams): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;

// @public
export function get(context: OracleDatabaseManagementContext, resourceGroupName: string, cloudvmclustername: string, options?: CloudVmClustersGetOptionalParams): Promise<CloudVmCluster>;

// @public
export function listByResourceGroup(context: OracleDatabaseManagementContext, resourceGroupName: string, options?: CloudVmClustersListByResourceGroupOptionalParams): PagedAsyncIterableIterator<CloudVmCluster>;

// @public
export function listBySubscription(context: OracleDatabaseManagementContext, options?: CloudVmClustersListBySubscriptionOptionalParams): PagedAsyncIterableIterator<CloudVmCluster>;

// @public
export function listPrivateIpAddresses(context: OracleDatabaseManagementContext, resourceGroupName: string, cloudvmclustername: string, body: PrivateIpAddressesFilter, options?: CloudVmClustersListPrivateIpAddressesOptionalParams): Promise<PrivateIpAddressProperties[]>;

// @public
export function removeVms(context: OracleDatabaseManagementContext, resourceGroupName: string, cloudvmclustername: string, body: AddRemoveDbNode, options?: CloudVmClustersRemoveVmsOptionalParams): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;

// @public
export function update(context: OracleDatabaseManagementContext, resourceGroupName: string, cloudvmclustername: string, properties: CloudVmClusterUpdate, options?: CloudVmClustersUpdateOptionalParams): PollerLike<OperationState<CloudVmCluster>, CloudVmCluster>;

// (No @packageDocumentation comment for this package)

```
