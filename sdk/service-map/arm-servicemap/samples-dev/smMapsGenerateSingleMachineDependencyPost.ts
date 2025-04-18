/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
/**
 * This sample demonstrates how to Generates the specified map.
 *
 * @summary Generates the specified map.
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/Maps/SMMapsGenerateSingleMachineDependencyPost.json
 */
import type { SingleMachineDependencyMapRequest } from "@azure/arm-servicemap";
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";

async function smMapsGenerateSingleMachineDependencyPost(): Promise<void> {
  const subscriptionId = "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const request: SingleMachineDependencyMapRequest = {
    endTime: new Date("2018-01-08T19:52:39.0192315Z"),
    kind: "map:single-machine-dependency",
    machineId:
      "/subscriptions/63BE4E24-FDF0-4E9C-9342-6A5D5A359722/resourceGroups/rg-sm/providers/Microsoft.OperationalInsights/workspaces/D6F79F14-E563-469B-84B5-9286D2803B2F/machines/m-A4AB1C69-03E9-42D2-B822-B42555569FB4",
    startTime: new Date("2018-01-08T19:50:39.0192315Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const result = await client.maps.generate(resourceGroupName, workspaceName, request);
  console.log(result);
}

smMapsGenerateSingleMachineDependencyPost().catch(console.error);
