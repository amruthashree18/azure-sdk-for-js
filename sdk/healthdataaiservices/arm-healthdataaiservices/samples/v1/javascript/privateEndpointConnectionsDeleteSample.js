// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthDataAIServicesClient } = require("@azure/arm-healthdataaiservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the private endpoint connection
 *
 * @summary delete the private endpoint connection
 * x-ms-original-file: 2024-09-20/PrivateEndpointConnections_Delete_MaximumSet_Gen.json
 */
async function privateEndpointConnectionsDeleteGeneratedByMaximumSetRuleStable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F21BB31B-C214-42C0-ACF0-DACCA05D3011";
  const client = new HealthDataAIServicesClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rgopenapi",
    "deidTest",
    "kgwgrrpabvrsrrvpcgcnfmyfgyrl",
  );
}

async function main() {
  privateEndpointConnectionsDeleteGeneratedByMaximumSetRuleStable();
}

main().catch(console.error);
