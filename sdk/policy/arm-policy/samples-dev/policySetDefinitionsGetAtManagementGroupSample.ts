/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PolicyClient } from "@azure/arm-policy";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This operation retrieves the policy set definition in the given management group with the given name.
 *
 * @summary This operation retrieves the policy set definition in the given management group with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getPolicySetDefinitionAtManagementGroup.json
 */
async function retrieveAPolicySetDefinitionAtManagementGroupLevel(): Promise<void> {
  const managementGroupId = "MyManagementGroup";
  const policySetDefinitionName = "CostManagement";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential);
  const result = await client.policySetDefinitions.getAtManagementGroup(
    managementGroupId,
    policySetDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveAPolicySetDefinitionAtManagementGroupLevel();
}

main().catch(console.error);
