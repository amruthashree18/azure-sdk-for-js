/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  ApplicationInsightsComponentWebTestLocation,
  WebTestLocationsListOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a WebTestLocations. */
export interface WebTestLocations {
  /**
   * Gets a list of web test locations available to this Application Insights component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceName The name of the Application Insights component resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    resourceName: string,
    options?: WebTestLocationsListOptionalParams,
  ): PagedAsyncIterableIterator<ApplicationInsightsComponentWebTestLocation>;
}
