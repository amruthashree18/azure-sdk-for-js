// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OnlineExperimentationClient } = require("@azure/arm-onlineexperimentation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an online experimentation workspace.
 *
 * @summary gets an online experimentation workspace.
 * x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_Get.json
 */
async function getASingleOnlineExperimentationWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.onlineExperimentationWorkspaces.get("res9871", "expworkspace3");
  console.log(result);
}

async function main() {
  await getASingleOnlineExperimentationWorkspace();
}

main().catch(console.error);
