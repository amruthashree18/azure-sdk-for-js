// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import type { WebPubSubGroup } from "../../src/index.js";
import { WebPubSubServiceClient } from "../../src/index.js";
import recorderOptions from "../testEnv.js";
import type { FullOperationResponse } from "@azure/core-client";
import type { RestError } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getEndpoint } from "../utils/injectables.js";
import { createTestCredential } from "@azure-tools/test-credential";

describe("Group client working with a group", () => {
  let recorder: Recorder;
  let client: WebPubSubGroup;
  let lastResponse: FullOperationResponse | undefined;
  function onResponse(response: FullOperationResponse): void {
    lastResponse = response;
  }
  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    const hubClient = new WebPubSubServiceClient(
      getEndpoint(),
      createTestCredential(),
      "simplechat",
      recorder.configureClientOptions({}),
    );

    client = hubClient.group("group");
  });

  it("can broadcast to groups", async () => {
    await client.sendToAll("hello", { contentType: "text/plain", onResponse });
    assert.equal(lastResponse?.status, 202);

    await client.sendToAll({ x: 1, y: 2 }, { onResponse });
    assert.equal(lastResponse?.status, 202);

    const binaryMessage = new Uint8Array(10);
    await client.sendToAll(binaryMessage.buffer, { onResponse });
    assert.equal(lastResponse?.status, 202);
  });

  it("can broadcast to group with filter", async () => {
    await client.sendToAll("hello", {
      contentType: "text/plain",
      filter: "userId ne 'user1'",
      messageTtlSeconds: 60,
      onResponse,
    });
    assert.equal(lastResponse?.status, 202);

    let error;
    try {
      await client.sendToAll("hello", {
        contentType: "text/plain",
        filter: "invalid filter",
      });
    } catch (e: any) {
      if (e.name !== "RestError") {
        throw e;
      }

      error = e;
    }
    assert.equal(error.statusCode, 400);
    assert.equal(
      JSON.parse(error.message).message,
      "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
    );
  });

  it("can manage connections", async () => {
    // this endpoint returns 404 for connections not on the hub
    let error: RestError | undefined;
    try {
      await client.addConnection("xxxx");
    } catch (e: any) {
      error = e;
    }

    assert.exists(error);
    assert.strictEqual(error?.name, "RestError");

    try {
      await client.removeConnection("xxxx", { onResponse });
    } catch (e: any) {
      assert.exists(error);
      assert.strictEqual(error?.name, "RestError");
    }
  });

  // skipping until we can record better tests with an actual user active.
  it.skip("can manage users", async () => {
    // service returns 404, this should likely be raised as an error but isn't
    // due to the swagger design
    await client.addUser("brian");

    // service returns 404 and this throws.
    await client.removeUser("brian");
  });

  afterEach(async () => {
    await recorder.stop();
  });
});

describe("client working with multiple groups", () => {
  let recorder: Recorder;
  let lastResponse: FullOperationResponse | undefined;
  let hubClient: WebPubSubServiceClient;
  function onResponse(response: FullOperationResponse): void {
    lastResponse = response;
  }
  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    hubClient = new WebPubSubServiceClient(
      getEndpoint(),
      createTestCredential(),
      "simplechat",
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can join multiple groups with filter", async (): Promise<void> => {
    await hubClient.addConnectionsToGroups(["group1", "group2"], "userId eq 'user 1'", {
      onResponse,
    });
    assert.equal(lastResponse?.status, 200);

    let error;
    try {
      await hubClient.addConnectionsToGroups(["group1", "group2"], "invalid filter");
    } catch (e: any) {
      if (e.name !== "RestError") {
        throw e;
      }

      error = e;
    }
    assert.equal(error.statusCode, 400);
    assert.equal(
      JSON.parse(error.message).message,
      "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
    );
  });

  it("can leave multiple groups with filter", async () => {
    await hubClient.removeConnectionsFromGroups(["group1", "group2"], "userId eq 'user 1'", {
      onResponse,
    });
    assert.equal(lastResponse?.status, 200);

    let error;
    try {
      await hubClient.removeConnectionsFromGroups(["group1", "group2"], "invalid filter");
    } catch (e: any) {
      if (e.name !== "RestError") {
        throw e;
      }

      error = e;
    }
    assert.equal(error.statusCode, 400);
    assert.equal(
      JSON.parse(error.message).message,
      "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
    );
  });
});
