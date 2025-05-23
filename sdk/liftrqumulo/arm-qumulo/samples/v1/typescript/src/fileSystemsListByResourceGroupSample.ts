/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { QumuloStorage } from "@azure/arm-qumulo";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List FileSystemResource resources by resource group
 *
 * @summary List FileSystemResource resources by resource group
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2022-10-12/examples/FileSystems_ListByResourceGroup_MaximumSet_Gen.json
 */
async function fileSystemsListByResourceGroupMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "ulseeqylxb";
  const resourceGroupName =
    process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.fileSystems.listByResourceGroup(
    resourceGroupName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List FileSystemResource resources by resource group
 *
 * @summary List FileSystemResource resources by resource group
 * x-ms-original-file: specification/liftrqumulo/resource-manager/Qumulo.Storage/stable/2022-10-12/examples/FileSystems_ListByResourceGroup_MinimumSet_Gen.json
 */
async function fileSystemsListByResourceGroupMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["LIFTRQUMULO_SUBSCRIPTION_ID"] || "aaaaaaa";
  const resourceGroupName =
    process.env["LIFTRQUMULO_RESOURCE_GROUP"] || "rgQumulo";
  const credential = new DefaultAzureCredential();
  const client = new QumuloStorage(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.fileSystems.listByResourceGroup(
    resourceGroupName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  fileSystemsListByResourceGroupMaximumSetGen();
  fileSystemsListByResourceGroupMinimumSetGen();
}

main().catch(console.error);
