/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  ApplicationInsightsComponentExportRequest,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the Continuous Export configuration for this export id.
 *
 * @summary Update the Continuous Export configuration for this export id.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2015-05-01/examples/ExportConfigurationUpdate.json
 */
async function exportConfigurationUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-component";
  const exportId = "uGOoki0jQsyEs3IdQ83Q4QsNr4=";
  const exportProperties: ApplicationInsightsComponentExportRequest = {
    destinationAccountId:
      "/subscriptions/subid/resourceGroups/my-resource-group/providers/Microsoft.ClassicStorage/storageAccounts/mystorageblob",
    destinationAddress:
      "https://mystorageblob.blob.core.windows.net/fchentest?sv=2015-04-05&sr=c&sig=token",
    destinationStorageLocationId: "eastus",
    destinationStorageSubscriptionId: "subid",
    destinationType: "Blob",
    isEnabled: "true",
    notificationQueueEnabled: "false",
    notificationQueueUri: "",
    recordTypes:
      "Requests, Event, Exceptions, Metrics, PageViews, PageViewPerformance, Rdd, PerformanceCounters, Availability",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.exportConfigurations.update(
    resourceGroupName,
    resourceName,
    exportId,
    exportProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await exportConfigurationUpdate();
}

main().catch(console.error);
