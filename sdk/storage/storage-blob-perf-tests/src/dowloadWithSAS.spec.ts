// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary, getEnvVar, drainStream } from "@azure-tools/test-perf";
import { StorageBlobTest } from "./storageTest.spec.js";
import {
  BlockBlobClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  BlobClient,
} from "@azure/storage-blob";
import { getValueInConnString } from "./utils/utils.js";
import { randomUUID } from "node:crypto";

interface StorageBlobDownloadTestOptions {
  size: number;
}

export class StorageBlobDownloadWithSASTest extends StorageBlobTest<StorageBlobDownloadTestOptions> {
  public options: PerfOptionDictionary<StorageBlobDownloadTestOptions> = {
    size: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 10240,
    },
  };

  static blobName = randomUUID();
  blockBlobClient: BlockBlobClient;
  blobClientFromSAS: BlobClient;
  sasUrl: string;

  constructor() {
    super();
    this.blockBlobClient = this.containerClient.getBlockBlobClient(
      StorageBlobDownloadWithSASTest.blobName,
    );
    const sasParams = generateBlobSASQueryParameters(
      {
        // Expires in a day
        expiresOn: new Date(new Date().getTime() + 86400000),
        containerName: StorageBlobDownloadWithSASTest.containerName,
        blobName: StorageBlobDownloadWithSASTest.blobName,
        permissions: BlobSASPermissions.parse("r"),
      },
      this.sharedKeyCredential,
    ).toString();

    this.sasUrl = `https://${getValueInConnString(
      getEnvVar("STORAGE_CONNECTION_STRING"),
      "AccountName",
    )}.blob.core.windows.net/${StorageBlobDownloadWithSASTest.containerName}/${
      StorageBlobDownloadWithSASTest.blobName
    }?${sasParams}`;

    this.blobClientFromSAS = new BlobClient(this.sasUrl);
  }

  public async globalSetup() {
    await super.globalSetup();
    // Create a blob
    await this.blockBlobClient.upload(
      Buffer.alloc(this.parsedOptions.size.value),
      this.parsedOptions.size.value,
    );
  }

  async run(): Promise<void> {
    const downloadResponse = await this.blobClientFromSAS.download();
    await drainStream(downloadResponse.readableStreamBody!);
  }
}
