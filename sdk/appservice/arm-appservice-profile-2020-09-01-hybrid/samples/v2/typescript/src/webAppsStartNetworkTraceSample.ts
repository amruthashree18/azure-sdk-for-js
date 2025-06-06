/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  WebAppsStartNetworkTraceOptionalParams,
  WebSiteManagementClient
} from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Start capturing network packets for the site.
 *
 * @summary Start capturing network packets for the site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2018-02-01/examples/StartWebSiteNetworkTraceOperation.json
 */
async function startANewNetworkTraceOperationForASite() {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "SampleApp";
  const durationInSeconds = 60;
  const options: WebAppsStartNetworkTraceOptionalParams = { durationInSeconds };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.beginStartNetworkTraceAndWait(
    resourceGroupName,
    name,
    options
  );
  console.log(result);
}

async function main() {
  startANewNetworkTraceOperationForASite();
}

main().catch(console.error);
