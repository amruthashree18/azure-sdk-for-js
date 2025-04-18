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
  Spacecraft,
  SpacecraftsListBySubscriptionOptionalParams,
  SpacecraftsListOptionalParams,
  AvailableContacts,
  ContactParametersContactProfile,
  SpacecraftsListAvailableContactsOptionalParams,
  SpacecraftsGetOptionalParams,
  SpacecraftsGetResponse,
  SpacecraftLink,
  SpacecraftsCreateOrUpdateOptionalParams,
  SpacecraftsCreateOrUpdateResponse,
  SpacecraftsDeleteOptionalParams,
  TagsObject,
  SpacecraftsUpdateTagsOptionalParams,
  SpacecraftsUpdateTagsResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Spacecrafts. */
export interface Spacecrafts {
  /**
   * Returns list of spacecrafts by subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: SpacecraftsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Spacecraft>;
  /**
   * Returns list of spacecrafts by resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: SpacecraftsListOptionalParams
  ): PagedAsyncIterableIterator<Spacecraft>;
  /**
   * Returns list of available contacts. A contact is available if the spacecraft is visible from the
   * ground station for more than the minimum viable contact duration provided in the contact profile.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param contactProfile The reference to the contact profile resource.
   * @param groundStationName Name of Azure Ground Station.
   * @param startTime Start time of a contact (ISO 8601 UTC standard).
   * @param endTime End time of a contact (ISO 8601 UTC standard).
   * @param options The options parameters.
   */
  beginListAvailableContactsAndWait(
    resourceGroupName: string,
    spacecraftName: string,
    contactProfile: ContactParametersContactProfile,
    groundStationName: string,
    startTime: Date,
    endTime: Date,
    options?: SpacecraftsListAvailableContactsOptionalParams
  ): PagedAsyncIterableIterator<AvailableContacts>;
  /**
   * Gets the specified spacecraft in a specified resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    spacecraftName: string,
    options?: SpacecraftsGetOptionalParams
  ): Promise<SpacecraftsGetResponse>;
  /**
   * Creates or updates a spacecraft resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param location The geo-location where the resource lives
   * @param titleLine Title line of the two-line element set (TLE).
   * @param tleLine1 Line 1 of the two-line element set (TLE).
   * @param tleLine2 Line 2 of the two-line element set (TLE).
   * @param links Immutable list of Spacecraft links.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    spacecraftName: string,
    location: string,
    titleLine: string,
    tleLine1: string,
    tleLine2: string,
    links: SpacecraftLink[],
    options?: SpacecraftsCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<SpacecraftsCreateOrUpdateResponse>,
      SpacecraftsCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a spacecraft resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param location The geo-location where the resource lives
   * @param titleLine Title line of the two-line element set (TLE).
   * @param tleLine1 Line 1 of the two-line element set (TLE).
   * @param tleLine2 Line 2 of the two-line element set (TLE).
   * @param links Immutable list of Spacecraft links.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    spacecraftName: string,
    location: string,
    titleLine: string,
    tleLine1: string,
    tleLine2: string,
    links: SpacecraftLink[],
    options?: SpacecraftsCreateOrUpdateOptionalParams
  ): Promise<SpacecraftsCreateOrUpdateResponse>;
  /**
   * Deletes a specified spacecraft resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    spacecraftName: string,
    options?: SpacecraftsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes a specified spacecraft resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    spacecraftName: string,
    options?: SpacecraftsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Updates the specified spacecraft tags.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param parameters Parameters supplied to update spacecraft tags.
   * @param options The options parameters.
   */
  beginUpdateTags(
    resourceGroupName: string,
    spacecraftName: string,
    parameters: TagsObject,
    options?: SpacecraftsUpdateTagsOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<SpacecraftsUpdateTagsResponse>,
      SpacecraftsUpdateTagsResponse
    >
  >;
  /**
   * Updates the specified spacecraft tags.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param spacecraftName Spacecraft ID.
   * @param parameters Parameters supplied to update spacecraft tags.
   * @param options The options parameters.
   */
  beginUpdateTagsAndWait(
    resourceGroupName: string,
    spacecraftName: string,
    parameters: TagsObject,
    options?: SpacecraftsUpdateTagsOptionalParams
  ): Promise<SpacecraftsUpdateTagsResponse>;
}
