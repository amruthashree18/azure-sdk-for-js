// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "../../../src/index.js";
import { CosmosClient, PermissionMode } from "../../../src/index.js";
import type { Database } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Authorization", { timeout: 10000 }, () => {
  // TODO: should have types for all these things
  let database: Database;
  let container: Container;

  let userReadDefinition: any = { id: "User With Read Permission" };
  let userAllDefinition: any = { id: "User With All Permission" };
  let collReadPermission: any = {
    id: "container Read Permission",
    permissionMode: PermissionMode.Read,
  };
  let collAllPermission: any = {
    id: "container All Permission",
    permissionMode: PermissionMode.All,
  };
  /** ************ TEST **************/

  beforeEach(async () => {
    await removeAllDatabases();

    // create a database & container
    container = await getTestContainer("Authorization tests");
    database = container.database;

    // create userReadPermission
    const { resource: userDef } = await container.database.users.create(userReadDefinition);
    assert.equal(userReadDefinition.id, userDef.id, "userReadPermission is not created properly");
    userReadDefinition = userDef;
    const userRead = container.database.user(userDef.id);

    // give permission to read container, to userReadPermission
    collReadPermission.resource = container.url;
    const { resource: readPermission } = await userRead.permissions.create(collReadPermission);
    assert.equal(
      readPermission.id,
      collReadPermission.id,
      "permission to read coll1 is not created properly",
    );
    collReadPermission = readPermission;

    // create userAllPermission
    const { resource: userAllDef } = await container.database.users.create(userAllDefinition);
    assert.equal(userAllDefinition.id, userAllDef.id, "userAllPermission is not created properly");
    userAllDefinition = userAllDef;
    const userAll = container.database.user(userAllDef.id);

    // create collAllPermission
    collAllPermission.resource = container.url;
    const { resource: allPermission } = await userAll.permissions.create(collAllPermission);
    assert.equal(
      collAllPermission.id,
      allPermission.id,
      "permission to read coll2 is not created properly",
    );
    collAllPermission = allPermission;
  });

  afterEach(async () => {
    await removeAllDatabases();
  });

  it("Accessing container by resourceTokens", async () => {
    const rTokens: any = {};
    rTokens[container.id] = collReadPermission._token;

    const clientReadPermission = new CosmosClient({
      endpoint,
      resourceTokens: rTokens,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    const { resource: coll } = await clientReadPermission
      .database(database.id)
      .container(container.id)
      .read();
    assert.equal(coll.id, container.id, "invalid container");
  });

  it("Accessing container by permissionFeed", async () => {
    const clientReadPermission = new CosmosClient({
      endpoint,
      permissionFeed: [collReadPermission],
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    // self link must be used to access a resource using permissionFeed
    const { resource: coll } = await clientReadPermission
      .database(database.id)
      .container(container.id)
      .read();
    assert.equal(coll.id, container.id, "invalid container");
  });

  it("Accessing container without permission fails", async () => {
    const clientNoPermission = new CosmosClient({ endpoint });

    try {
      await clientNoPermission.database(database.id).container(container.id).read();
      assert.fail("accessing container did not throw");
    } catch (err: any) {
      assert(err !== undefined); // TODO: should check that we get the right error message
    }
    clientNoPermission.dispose();
  });

  it("Accessing document by permissionFeed of parent container", async () => {
    const { resource: createdDoc } = await container.items.create({
      id: "document1",
    });
    const clientReadPermission = new CosmosClient({
      endpoint,
      permissionFeed: [collReadPermission],
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });
    assert.equal("document1", createdDoc.id, "invalid documnet create");

    const { resource: readDoc } = await clientReadPermission
      .database(database.id)
      .container(container.id)
      .item(createdDoc.id, undefined)
      .read<any>();
    assert.equal(readDoc.id, createdDoc.id, "invalid document read");
  });

  it.skip("Modifying container by resourceTokens", async () => {
    const rTokens: any = {};
    rTokens[container.id] = collAllPermission._token;
    const clientAllPermission = new CosmosClient({
      endpoint,
      resourceTokens: rTokens,
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    // delete container
    return clientAllPermission.database(database.id).container(container.id).delete();
  });

  it.skip("Modifying container by permissionFeed", async () => {
    const clientAllPermission = new CosmosClient({
      endpoint,
      permissionFeed: [collAllPermission],
      connectionPolicy: { enableBackgroundEndpointRefreshing: false },
    });

    // self link must be used to access a resource using permissionFeed
    // delete container
    return clientAllPermission.database(database.id).container(container.id).delete();
  });
});
