// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHmac } from "node:crypto";

export function computeHMACSHA256(stringToSign: string, accountKey: string): string {
  const key = Buffer.from(accountKey, "base64");
  return createHmac("sha256", key).update(stringToSign, "utf8").digest("base64");
}
