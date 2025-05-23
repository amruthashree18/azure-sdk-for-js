/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityCheckAvailabilityOptionalParams,
  HelpRP,
} from "@azure/arm-selfhelp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 *
 * @summary This API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/CheckNameAvailabilityForDiagnosticWhenNameIsAvailable.json
 */
async function exampleWhenNameIsAvailableForADiagnosticResource(): Promise<void> {
  const scope = "subscriptions/0d0fcd2e-c4fd-4349-8497-200edb3923c6";
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "sampleName",
    type: "Microsoft.Help/diagnostics",
  };
  const options: CheckNameAvailabilityCheckAvailabilityOptionalParams = {
    checkNameAvailabilityRequest,
  };
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.checkNameAvailability.checkAvailability(
    scope,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to This API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 *
 * @summary This API is used to check the uniqueness of a resource name used for a diagnostic, troubleshooter or solutions
 * x-ms-original-file: specification/help/resource-manager/Microsoft.Help/preview/2024-03-01-preview/examples/CheckNameAvailabilityForDiagnosticWhenNameIsNotAvailable.json
 */
async function exampleWhenNameIsNotAvailableForADiagnosticResource(): Promise<void> {
  const scope = "subscriptions/0d0fcd2e-c4fd-4349-8497-200edb3923c6";
  const checkNameAvailabilityRequest: CheckNameAvailabilityRequest = {
    name: "sampleName",
    type: "Microsoft.Help/diagnostics",
  };
  const options: CheckNameAvailabilityCheckAvailabilityOptionalParams = {
    checkNameAvailabilityRequest,
  };
  const credential = new DefaultAzureCredential();
  const client = new HelpRP(credential);
  const result = await client.checkNameAvailability.checkAvailability(
    scope,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  exampleWhenNameIsAvailableForADiagnosticResource();
  exampleWhenNameIsNotAvailableForADiagnosticResource();
}

main().catch(console.error);
