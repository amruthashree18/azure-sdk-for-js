## API Report File for "@azure/arm-programmableconnectivity"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Client } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { OperationState } from '@azure/core-lro';
import { PollerLike } from '@azure/core-lro';

// @public
export function $delete(context: ProgrammableConnectivityContext, resourceGroupName: string, operatorApiConnectionName: string, options?: OperatorApiConnectionsDeleteOptionalParams): PollerLike<OperationState<void>, void>;

// @public
export function create(context: ProgrammableConnectivityContext, resourceGroupName: string, operatorApiConnectionName: string, resource: OperatorApiConnection, options?: OperatorApiConnectionsCreateOptionalParams): PollerLike<OperationState<OperatorApiConnection>, OperatorApiConnection>;

// @public
export function get(context: ProgrammableConnectivityContext, resourceGroupName: string, operatorApiConnectionName: string, options?: OperatorApiConnectionsGetOptionalParams): Promise<OperatorApiConnection>;

// @public
export function listByResourceGroup(context: ProgrammableConnectivityContext, resourceGroupName: string, options?: OperatorApiConnectionsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<OperatorApiConnection>;

// @public
export function listBySubscription(context: ProgrammableConnectivityContext, options?: OperatorApiConnectionsListBySubscriptionOptionalParams): PagedAsyncIterableIterator<OperatorApiConnection>;

// @public
export interface OperatorApiConnectionsCreateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface OperatorApiConnectionsDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface OperatorApiConnectionsGetOptionalParams extends OperationOptions {
}

// @public
export interface OperatorApiConnectionsListByResourceGroupOptionalParams extends OperationOptions {
}

// @public
export interface OperatorApiConnectionsListBySubscriptionOptionalParams extends OperationOptions {
}

// @public
export interface OperatorApiConnectionsUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export function update(context: ProgrammableConnectivityContext, resourceGroupName: string, operatorApiConnectionName: string, properties: OperatorApiConnectionUpdate, options?: OperatorApiConnectionsUpdateOptionalParams): PollerLike<OperationState<OperatorApiConnection>, OperatorApiConnection>;

// (No @packageDocumentation comment for this package)

```
