/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  BotChannel,
  ChannelsListByResourceGroupOptionalParams,
  ChannelName,
  ChannelsCreateOptionalParams,
  ChannelsCreateResponse,
  ChannelsUpdateOptionalParams,
  ChannelsUpdateResponse,
  ChannelsDeleteOptionalParams,
  ChannelsGetOptionalParams,
  ChannelsGetResponse,
  ChannelsListWithKeysOptionalParams,
  ChannelsListWithKeysResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Channels. */
export interface Channels {
  /**
   * Returns all the Channel registrations of a particular BotService resource
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    resourceName: string,
    options?: ChannelsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<BotChannel>;
  /**
   * Creates a Channel registration for a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param channelName The name of the Channel resource.
   * @param parameters The parameters to provide for the created bot.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    resourceName: string,
    channelName: ChannelName,
    parameters: BotChannel,
    options?: ChannelsCreateOptionalParams
  ): Promise<ChannelsCreateResponse>;
  /**
   * Updates a Channel registration for a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param channelName The name of the Channel resource.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    resourceName: string,
    channelName: ChannelName,
    options?: ChannelsUpdateOptionalParams
  ): Promise<ChannelsUpdateResponse>;
  /**
   * Deletes a Channel registration from a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param channelName The name of the Bot resource.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    resourceName: string,
    channelName: string,
    options?: ChannelsDeleteOptionalParams
  ): Promise<void>;
  /**
   * Returns a BotService Channel registration specified by the parameters.
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param channelName The name of the Bot resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    channelName: string,
    options?: ChannelsGetOptionalParams
  ): Promise<ChannelsGetResponse>;
  /**
   * Lists a Channel registration for a Bot Service including secrets
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param channelName The name of the Channel resource.
   * @param options The options parameters.
   */
  listWithKeys(
    resourceGroupName: string,
    resourceName: string,
    channelName: ChannelName,
    options?: ChannelsListWithKeysOptionalParams
  ): Promise<ChannelsListWithKeysResponse>;
}
