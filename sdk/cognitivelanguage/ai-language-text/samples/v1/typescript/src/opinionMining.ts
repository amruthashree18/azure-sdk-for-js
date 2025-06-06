// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze sentiment on a more granular level,
 * mining individual assessments from reviews (also known as aspect-based
 * sentiment analysis). In the example below, we analyze reviews about a hotel
 * for sentiment and different assessments about targets in the reviews.
 *
 * @summary analyzes the sentiment of a piece of text and mine opinions about
 * different targets
 */

import { TextAnalysisClient } from "@azure/ai-language-text";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

// You will need to set these environment variables or edit the following values
const endpoint = process.env["LANGUAGE_ENDPOINT"] || "<cognitive language service endpoint>";

const documents = [
  {
    text: "The food and service were unacceptable, but the concierge were nice",
    id: "0",
    language: "en",
  },
  {
    text: "The rooms were beautiful but dirty. The AC was good and quiet, but the elevator was broken",
    id: "1",
    language: "en",
  },
  {
    text: "The breakfast was good, but the toilet was smelly",
    id: "2",
    language: "en",
  },
  {
    text: "Loved this hotel - good breakfast - nice shuttle service.",
    id: "3",
    language: "en",
  },
  {
    text: "I had a great unobstructed view of the Microsoft campus",
    id: "4",
    language: "en",
  },
];

export async function main(): Promise<void> {
  console.log("=== Opinion Mining Sample ===");

  const client = new TextAnalysisClient(endpoint, new DefaultAzureCredential());

  const results = await client.analyze("SentimentAnalysis", documents, {
    includeOpinionMining: true,
  });

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log(`\tDocument text: ${documents[i].text}`);
      console.log(`\tOverall Sentiment: ${result.sentiment}`);
      console.log("\tSentiment confidence scores:", result.confidenceScores);
      console.log("\tSentences");
      for (const { sentiment, confidenceScores, opinions } of result.sentences) {
        console.log(`\t- Sentence sentiment: ${sentiment}`);
        console.log("\t  Confidence scores:", confidenceScores);
        console.log("\t  Mined opinions");
        for (const { target, assessments } of opinions) {
          console.log(`\t\t- Target text: ${target.text}`);
          console.log(`\t\t  Target sentiment: ${target.sentiment}`);
          console.log("\t\t  Target confidence scores:", target.confidenceScores);
          console.log("\t\t  Target assessments");
          for (const { text, sentiment: targetSentiment } of assessments) {
            console.log(`\t\t\t- Text: ${text}`);
            console.log(`\t\t\t  Sentiment: ${targetSentiment}`);
          }
        }
      }
    } else {
      console.error(`\tError: ${result.error}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
