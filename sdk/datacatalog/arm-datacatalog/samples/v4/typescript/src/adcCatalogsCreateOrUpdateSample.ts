/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ADCCatalog, DataCatalogRestClient } from "@azure/arm-datacatalog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to The Create Azure Data Catalog service operation creates a new data catalog service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged.
 *
 * @summary The Create Azure Data Catalog service operation creates a new data catalog service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged.
 * x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/CreateOrUpdateADCCatalog.json
 */
async function createAzureDataCatalogService(): Promise<void> {
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const resourceGroupName = "exampleResourceGroup";
  const catalogName = "exampleCatalog";
  const properties: ADCCatalog = {
    admins: [
      {
        objectId: "99999999-9999-9999-999999999999",
        upn: "myupn@microsoft.com"
      }
    ],
    enableAutomaticUnitAdjustment: false,
    location: "North US",
    sku: "Standard",
    tags: { mykey: "myvalue", mykey2: "myvalue2" },
    units: 1,
    users: [
      {
        objectId: "99999999-9999-9999-999999999999",
        upn: "myupn@microsoft.com"
      }
    ]
  };
  const credential = new DefaultAzureCredential();
  const client = new DataCatalogRestClient(credential, subscriptionId);
  const result = await client.aDCCatalogs.createOrUpdate(
    resourceGroupName,
    catalogName,
    properties
  );
  console.log(result);
}

createAzureDataCatalogService().catch(console.error);
