/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureSiteRecoveryManagementServiceAPI } from "@azure/arm-recoveryservicesdatareplication";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Removes the fabric.
 *
 * @summary Removes the fabric.
 * x-ms-original-file: specification/recoveryservicesdatareplication/resource-manager/Microsoft.DataReplication/preview/2021-02-16-preview/examples/Fabric_Delete.json
 */
async function fabricDelete(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESDATAREPLICATION_SUBSCRIPTION_ID"] ||
    "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const resourceGroupName =
    process.env["RECOVERYSERVICESDATAREPLICATION_RESOURCE_GROUP"] ||
    "rgrecoveryservicesdatareplication";
  const fabricName = "wPR";
  const credential = new DefaultAzureCredential();
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.fabric.beginDeleteAndWait(resourceGroupName, fabricName);
  console.log(result);
}

async function main(): Promise<void> {
  await fabricDelete();
}

main().catch(console.error);
