// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the enterprise mcc customer resource information using this get call
 *
 * @summary gets the enterprise mcc customer resource information using this get call
 * x-ms-original-file: 2023-05-01-preview/EnterpriseMccCustomers_Get_MaximumSet_Gen.json
 */
async function enterpriseMccCustomersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseMccCustomers.get(
    "rgConnectedCache",
    "pvilvqkofbjbykupeewgvzlmjao",
  );
  console.log(result);
}

async function main(): Promise<void> {
  enterpriseMccCustomersGet();
}

main().catch(console.error);
