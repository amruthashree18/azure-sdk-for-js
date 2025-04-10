// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import "dotenv/config";

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router jobQueue
async function createJobQueue(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(connectionString);

  const distributionPolicyId = "distribution-policy-123";
  await routerClient
    .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        name: "distribution policy 123",
        mode: {
          kind: "longestIdle",
          minConcurrentOffers: 1,
          maxConcurrentOffers: 5,
          bypassSelectors: false,
        },
        offerExpiresAfterSeconds: 120,
      },
    });

  const queueId = "queue-123";
  const result = await routerClient.path("/routing/queues/{queueId}", queueId).patch({
    contentType: "application/merge-patch+json",
    body: {
      distributionPolicyId: distributionPolicyId,
      name: "Main",
    },
  });

  console.log("router jobQueue: " + result);
}

createJobQueue().catch(console.error);
