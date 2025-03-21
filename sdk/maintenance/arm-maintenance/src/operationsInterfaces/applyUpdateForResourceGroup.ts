/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ApplyUpdate,
  ApplyUpdateForResourceGroupListOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ApplyUpdateForResourceGroup. */
export interface ApplyUpdateForResourceGroup {
  /**
   * Get Configuration records within a subscription and resource group
   * @param resourceGroupName Resource Group Name
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: ApplyUpdateForResourceGroupListOptionalParams,
  ): PagedAsyncIterableIterator<ApplyUpdate>;
}
