/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Asynchronously creates or updates an event subscription of a partner topic with the specified parameters. Existing event subscriptions will be updated with this API.
 *
 * @summary Asynchronously creates or updates an event subscription of a partner topic with the specified parameters. Existing event subscriptions will be updated with this API.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/stable/2025-02-15/examples/PartnerTopicEventSubscriptions_CreateOrUpdate.json
 */
async function partnerTopicEventSubscriptionsCreateOrUpdate() {
  const subscriptionId =
    process.env["EVENTGRID_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["EVENTGRID_RESOURCE_GROUP"] || "examplerg";
  const partnerTopicName = "examplePartnerTopic1";
  const eventSubscriptionName = "exampleEventSubscriptionName1";
  const eventSubscriptionInfo = {
    destination: {
      endpointType: "WebHook",
      endpointUrl: "https://requestb.in/15ksip71",
    },
    filter: {
      isSubjectCaseSensitive: false,
      subjectBeginsWith: "ExamplePrefix",
      subjectEndsWith: "ExampleSuffix",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerTopicEventSubscriptions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    partnerTopicName,
    eventSubscriptionName,
    eventSubscriptionInfo,
  );
  console.log(result);
}

async function main() {
  await partnerTopicEventSubscriptionsCreateOrUpdate();
}

main().catch(console.error);
