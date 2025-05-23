// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualMachineScaleSetsGetInstanceViewParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the status of a VM scale set instance.
 *
 * @summary Gets the status of a VM scale set instance.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_GetInstanceView_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsGetInstanceViewMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsGetInstanceViewParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/instanceView",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .get(options);
  console.log(result);
}

virtualMachineScaleSetsGetInstanceViewMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets the status of a VM scale set instance.
 *
 * @summary Gets the status of a VM scale set instance.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_GetInstanceView_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsGetInstanceViewMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsGetInstanceViewParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/instanceView",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .get(options);
  console.log(result);
}

virtualMachineScaleSetsGetInstanceViewMinimumSetGen().catch(console.error);
