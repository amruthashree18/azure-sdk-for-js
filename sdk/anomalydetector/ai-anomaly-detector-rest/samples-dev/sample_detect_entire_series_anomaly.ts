// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to detect anomaly points on entire series.
 *
 * @summary detects anomaly points on entire series.
 */

import type {
  DetectUnivariateEntireSeriesParameters,
  TimeSeriesPoint,
} from "@azure-rest/ai-anomaly-detector";
import AnomalyDetector, { isUnexpected } from "@azure-rest/ai-anomaly-detector";
import { AzureKeyCredential } from "@azure/core-auth";

import { parse } from "csv-parse/sync";
import fs from "node:fs";

// Load the .env file if it exists
import "dotenv/config";

// You will need to set this environment variables or edit the following values
const apiKey = process.env["ANOMALY_DETECTOR_API_KEY"] || "";
const endpoint = process.env["ANOMALY_DETECTOR_ENDPOINT"] || "";
const timeSeriesDataPath = "./samples-dev/example-data/request-data.csv";

function read_series_from_file(path: string): Array<TimeSeriesPoint> {
  const result = Array<TimeSeriesPoint>();
  const input = fs.readFileSync(path).toString();
  const parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e: Array<string>) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });
  return result;
}

export async function main(): Promise<void> {
  // create client
  const credential = new AzureKeyCredential(apiKey);
  const client = AnomalyDetector(endpoint, credential);

  // construct request
  const options: DetectUnivariateEntireSeriesParameters = {
    body: {
      granularity: "daily",
      imputeMode: "auto",
      maxAnomalyRatio: 0.25,
      sensitivity: 95,
      series: read_series_from_file(timeSeriesDataPath),
    },
    headers: { "Content-Type": "application/json" },
  };

  // get last detect result
  const result = await client.path("/timeseries/entire/detect").post(options);
  if (isUnexpected(result)) {
    throw result;
  }

  if (result.body.isAnomaly) {
    result.body.isAnomaly.forEach(function (anomaly, index) {
      if (anomaly === true) {
        console.log(index);
      }
    });
  } else {
    console.log("There is no anomaly detected from the series.");
  }
  // output:
  // Anomalies were detected from the series at index:
  // 3
  // 18
  // 21
  // 22
  // 23
  // 24
  // 25
  // 28
  // 29
  // 30
  // 31
  // 32
  // 35
  // 44
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
