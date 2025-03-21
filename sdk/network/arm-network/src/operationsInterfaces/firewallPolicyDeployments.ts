/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  FirewallPolicyDeploymentsDeployOptionalParams,
  FirewallPolicyDeploymentsDeployResponse,
} from "../models/index.js";

/** Interface representing a FirewallPolicyDeployments. */
export interface FirewallPolicyDeployments {
  /**
   * Deploys the firewall policy draft and child rule collection group drafts.
   * @param resourceGroupName The name of the resource group.
   * @param firewallPolicyName The name of the Firewall Policy.
   * @param options The options parameters.
   */
  beginDeploy(
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDeploymentsDeployOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<FirewallPolicyDeploymentsDeployResponse>,
      FirewallPolicyDeploymentsDeployResponse
    >
  >;
  /**
   * Deploys the firewall policy draft and child rule collection group drafts.
   * @param resourceGroupName The name of the resource group.
   * @param firewallPolicyName The name of the Firewall Policy.
   * @param options The options parameters.
   */
  beginDeployAndWait(
    resourceGroupName: string,
    firewallPolicyName: string,
    options?: FirewallPolicyDeploymentsDeployOptionalParams,
  ): Promise<FirewallPolicyDeploymentsDeployResponse>;
}
