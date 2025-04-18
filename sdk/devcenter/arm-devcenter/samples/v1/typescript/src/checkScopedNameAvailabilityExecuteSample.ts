/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  CheckScopedNameAvailabilityRequest,
  DevCenterClient,
} from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Check the availability of name for resource
 *
 * @summary Check the availability of name for resource
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/CheckScopedNameAvailability_DevCenterCatalog.json
 */
async function devcenterCatalogNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] ||
    "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const nameAvailabilityRequest: CheckScopedNameAvailabilityRequest = {
    name: "name1",
    type: "Microsoft.DevCenter/devcenters/catalogs",
    scope:
      "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/devcenters/Contoso",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.checkScopedNameAvailability.execute(
    nameAvailabilityRequest,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Check the availability of name for resource
 *
 * @summary Check the availability of name for resource
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/CheckScopedNameAvailability_ProjectCatalog.json
 */
async function projectCatalogNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] ||
    "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const nameAvailabilityRequest: CheckScopedNameAvailabilityRequest = {
    name: "name1",
    type: "Microsoft.DevCenter/projects/catalogs",
    scope:
      "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.DevCenter/projects/DevProject",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.checkScopedNameAvailability.execute(
    nameAvailabilityRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  devcenterCatalogNameAvailability();
  projectCatalogNameAvailability();
}

main().catch(console.error);
