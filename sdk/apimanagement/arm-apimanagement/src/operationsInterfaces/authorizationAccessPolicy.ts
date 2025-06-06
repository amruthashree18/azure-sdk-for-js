/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AuthorizationAccessPolicyContract,
  AuthorizationAccessPolicyListByAuthorizationOptionalParams,
  AuthorizationAccessPolicyGetOptionalParams,
  AuthorizationAccessPolicyGetResponse,
  AuthorizationAccessPolicyCreateOrUpdateOptionalParams,
  AuthorizationAccessPolicyCreateOrUpdateResponse,
  AuthorizationAccessPolicyDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AuthorizationAccessPolicy. */
export interface AuthorizationAccessPolicy {
  /**
   * Lists a collection of authorization access policy defined within a authorization.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param authorizationProviderId Identifier of the authorization provider.
   * @param authorizationId Identifier of the authorization.
   * @param options The options parameters.
   */
  listByAuthorization(
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    options?: AuthorizationAccessPolicyListByAuthorizationOptionalParams,
  ): PagedAsyncIterableIterator<AuthorizationAccessPolicyContract>;
  /**
   * Gets the details of the authorization access policy specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param authorizationProviderId Identifier of the authorization provider.
   * @param authorizationId Identifier of the authorization.
   * @param authorizationAccessPolicyId Identifier of the authorization access policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    authorizationAccessPolicyId: string,
    options?: AuthorizationAccessPolicyGetOptionalParams,
  ): Promise<AuthorizationAccessPolicyGetResponse>;
  /**
   * Creates or updates Authorization Access Policy.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param authorizationProviderId Identifier of the authorization provider.
   * @param authorizationId Identifier of the authorization.
   * @param authorizationAccessPolicyId Identifier of the authorization access policy.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    authorizationAccessPolicyId: string,
    parameters: AuthorizationAccessPolicyContract,
    options?: AuthorizationAccessPolicyCreateOrUpdateOptionalParams,
  ): Promise<AuthorizationAccessPolicyCreateOrUpdateResponse>;
  /**
   * Deletes specific access policy from the Authorization.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param authorizationProviderId Identifier of the authorization provider.
   * @param authorizationId Identifier of the authorization.
   * @param authorizationAccessPolicyId Identifier of the authorization access policy.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    authorizationAccessPolicyId: string,
    ifMatch: string,
    options?: AuthorizationAccessPolicyDeleteOptionalParams,
  ): Promise<void>;
}
