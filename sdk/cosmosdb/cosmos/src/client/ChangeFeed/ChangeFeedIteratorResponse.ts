// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import { Constants } from "../../common/index.js";
import type { CosmosHeaders } from "../../queryExecutionContext/index.js";

/**
 * A single response page from the Azure Cosmos DB Change Feed
 */
export class ChangeFeedIteratorResponse<T> {
  /**
   * @internal
   */
  constructor(
    /**
     * Gets the items returned in the response from Azure Cosmos DB
     */
    public readonly result: T,
    /**
     * Gets the number of items returned in the response from Azure Cosmos DB
     */
    public readonly count: number,
    /**
     * Gets the status code of the response from Azure Cosmos DB
     */
    public readonly statusCode: number,
    /**
     * Headers related to cosmos DB and change feed.
     */
    headers: CosmosHeaders,
    /**
     * Cosmos Diagnostic Object.
     */
    public readonly diagnostics: CosmosDiagnostics,
    /**
     * Gets the subStatusCodes of the response from Azure Cosmos DB. Useful in partition split or partition gone.
     */
    public readonly subStatusCode?: number,
  ) {
    this.headers = headers;
  }

  /**
   * Gets the request charge for this request from the Azure Cosmos DB service.
   */
  public get requestCharge(): number {
    const rus = this.headers[Constants.HttpHeaders.RequestCharge];
    return rus ? parseInt(rus, 10) : null;
  }

  /**
   * Gets the activity ID for the request from the Azure Cosmos DB service.
   */
  public get activityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId];
  }

  /**
   * Gets the continuation token to be used for continuing enumeration of the Azure Cosmos DB service.
   */
  public get continuationToken(): string {
    return this.headers[Constants.HttpHeaders.ContinuationToken];
  }
  /**
   * Gets the session token for use in session consistency reads from the Azure Cosmos DB service.
   */
  public get sessionToken(): string {
    return this.headers[Constants.HttpHeaders.SessionToken];
  }
  /**
   * Response headers of the response from Azure Cosmos DB
   */
  public headers: CosmosHeaders;
}
