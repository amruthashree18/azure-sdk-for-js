/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  CommunicationIdentityOperationsImpl,
  TeamsExtensionTokenImpl,
  TeamsExtensionAssignmentImpl,
  EntraIdTokenImpl,
  EntraIdAssignmentsImpl,
  EntraIdAssignmentImpl,
} from "./operations/index.js";
import {
  CommunicationIdentityOperations,
  TeamsExtensionToken,
  TeamsExtensionAssignment,
  EntraIdToken,
  EntraIdAssignments,
  EntraIdAssignment,
} from "./operationsInterfaces/index.js";
import { IdentityRestClientOptionalParams } from "./models/index.js";

export class IdentityRestClient extends coreClient.ServiceClient {
  endpoint: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the IdentityRestClient class.
   * @param endpoint The communication resource, for example https://my-resource.communication.azure.com
   * @param options The parameter options
   */
  constructor(endpoint: string, options?: IdentityRestClientOptionalParams) {
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: IdentityRestClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
    };

    const packageDetails = `azsdk-js-communication-identity/1.4.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint: options.endpoint ?? options.baseUri ?? "{endpoint}",
    };
    super(optionsWithDefaults);
    // Parameter assignments
    this.endpoint = endpoint;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2025-03-02-preview";
    this.communicationIdentityOperations =
      new CommunicationIdentityOperationsImpl(this);
    this.teamsExtensionToken = new TeamsExtensionTokenImpl(this);
    this.teamsExtensionAssignment = new TeamsExtensionAssignmentImpl(this);
    this.entraIdToken = new EntraIdTokenImpl(this);
    this.entraIdAssignments = new EntraIdAssignmentsImpl(this);
    this.entraIdAssignment = new EntraIdAssignmentImpl(this);
    this.addCustomApiVersionPolicy(options.apiVersion);
  }

  /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
  private addCustomApiVersionPolicy(apiVersion?: string) {
    if (!apiVersion) {
      return;
    }
    const apiVersionPolicy = {
      name: "CustomApiVersionPolicy",
      async sendRequest(
        request: PipelineRequest,
        next: SendRequest,
      ): Promise<PipelineResponse> {
        const param = request.url.split("?");
        if (param.length > 1) {
          const newParams = param[1].split("&").map((item) => {
            if (item.indexOf("api-version") > -1) {
              return "api-version=" + apiVersion;
            } else {
              return item;
            }
          });
          request.url = param[0] + "?" + newParams.join("&");
        }
        return next(request);
      },
    };
    this.pipeline.addPolicy(apiVersionPolicy);
  }

  communicationIdentityOperations: CommunicationIdentityOperations;
  teamsExtensionToken: TeamsExtensionToken;
  teamsExtensionAssignment: TeamsExtensionAssignment;
  entraIdToken: EntraIdToken;
  entraIdAssignments: EntraIdAssignments;
  entraIdAssignment: EntraIdAssignment;
}
