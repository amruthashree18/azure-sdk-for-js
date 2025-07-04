/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  SiteAuthSettings,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Updates the Authentication / Authorization settings associated with web app.
 *
 * @summary Description for Updates the Authentication / Authorization settings associated with web app.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/UpdateAuthSettings.json
 */
async function updateAuthSettings(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "sitef6141";
  const siteAuthSettings: SiteAuthSettings = {
    allowedExternalRedirectUrls: [
      "sitef6141.customdomain.net",
      "sitef6141.customdomain.info",
    ],
    clientId: "42d795a9-8abb-4d06-8534-39528af40f8e.apps.googleusercontent.com",
    defaultProvider: "Google",
    enabled: true,
    runtimeVersion: "~1",
    tokenRefreshExtensionHours: 120,
    tokenStoreEnabled: true,
    unauthenticatedClientAction: "RedirectToLoginPage",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateAuthSettings(
    resourceGroupName,
    name,
    siteAuthSettings,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAuthSettings();
}

main().catch(console.error);
