// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error.
 *
 * @summary deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error.
 * x-ms-original-file: 2024-09-01/SapDatabaseInstances_Delete.json
 */
async function sapDatabaseInstancesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  await client.sapDatabaseInstances.delete("test-rg", "X00", "databaseServer");
}

async function main(): Promise<void> {
  await sapDatabaseInstancesDelete();
}

main().catch(console.error);
