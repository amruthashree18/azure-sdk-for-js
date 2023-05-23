/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * This sample demonstrates how to Updates an existing RedisEnterprise cluster
 *
 * @summary Updates an existing RedisEnterprise cluster
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseUpdate.json
 */
import {
  ClusterUpdate,
  RedisEnterpriseManagementClient
} from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";

async function redisEnterpriseUpdate() {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const clusterName = "cache1";
  const parameters: ClusterUpdate = {
    minimumTlsVersion: "1.2",
    sku: { name: "EnterpriseFlash_F300", capacity: 9 },
    tags: { tag1: "value1" }
  };
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId
  );
  const result = await client.redisEnterprise.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    parameters
  );
  console.log(result);
}

redisEnterpriseUpdate().catch(console.error);