## API Report File for "@azure/arm-servicefabricmanagedclusters"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Client } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { OperationState } from '@azure/core-lro';
import { PollerLike } from '@azure/core-lro';

// @public
export function $delete(context: ServiceFabricManagedClustersManagementContext, resourceGroupName: string, clusterName: string, applicationTypeName: string, options?: ApplicationTypesDeleteOptionalParams): PollerLike<OperationState<void>, void>;

// @public
export interface ApplicationTypesCreateOrUpdateOptionalParams extends OperationOptions {
}

// @public
export interface ApplicationTypesDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface ApplicationTypesGetOptionalParams extends OperationOptions {
}

// @public
export interface ApplicationTypesListOptionalParams extends OperationOptions {
}

// @public
export interface ApplicationTypesUpdateOptionalParams extends OperationOptions {
}

// @public
export function createOrUpdate(context: ServiceFabricManagedClustersManagementContext, resourceGroupName: string, clusterName: string, applicationTypeName: string, parameters: ApplicationTypeResource, options?: ApplicationTypesCreateOrUpdateOptionalParams): Promise<ApplicationTypeResource>;

// @public
export function get(context: ServiceFabricManagedClustersManagementContext, resourceGroupName: string, clusterName: string, applicationTypeName: string, options?: ApplicationTypesGetOptionalParams): Promise<ApplicationTypeResource>;

// @public
export function list(context: ServiceFabricManagedClustersManagementContext, resourceGroupName: string, clusterName: string, options?: ApplicationTypesListOptionalParams): PagedAsyncIterableIterator<ApplicationTypeResource>;

// @public
export function update(context: ServiceFabricManagedClustersManagementContext, resourceGroupName: string, clusterName: string, applicationTypeName: string, parameters: ApplicationTypeUpdateParameters, options?: ApplicationTypesUpdateOptionalParams): Promise<ApplicationTypeResource>;

// (No @packageDocumentation comment for this package)

```
