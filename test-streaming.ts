#!/usr/bin/env tsx

import { Opper } from "./src/index.js";

// Configuration - use environment variables or defaults
const OPPER_API_KEY = process.env.OPPER_API_KEY || process.env.OPPER_HTTP_BEARER;

if (!OPPER_API_KEY) {
  console.error("Error: OPPER_API_KEY or OPPER_HTTP_BEARER environment variable required");
  process.exit(1);
}
const OPPER_SERVER_URL = process.env.OPPER_SERVER_URL || "https://api.opper.ai/v2";

// Define input and output interfaces (TypeScript equivalent of Pydantic models)
interface CountryInput {
  country: string;
}

interface CapitalOutput {
  capital: string;
  population?: number;
}

// Define JSON schemas for the interfaces
const countryInputSchema = {
  type: "object",
  properties: {
    country: {
      type: "string",
      description: "The name of the country"
    }
  },
  required: ["country"]
} as const;

const capitalOutputSchema = {
  type: "object",
  properties: {
    capital: {
      type: "string",
      description: "The capital city of the country"
    },
    population: {
      type: "integer",
      description: "The population of the capital city"
    }
  },
  required: ["capital"]
} as const;

// Create Opper client
const opper = new Opper({
  httpBearer: OPPER_API_KEY,
  serverURL: OPPER_SERVER_URL
});

const inputData: CountryInput = { country: "Sweden" };

// response = opper.call(
//     name="test",
//     instructions="What is the capital of the provided Country? Also include the population if you know it.",
//     input_schema=CountryInput.model_json_schema(),
//     output_schema=CapitalOutput.model_json_schema(),
//     input=input_data.model_dump(),
// )

// print(response)


// # Test the regular call and parse the response
// output_data = CapitalOutput.model_validate(response.json_payload)
// print(f"Capital of {input_data.country}: {output_data.capital}")
// if output_data.population:
//     print(f"Population: {output_data.population:,}")


// Test streaming call
console.log("\n" + "=".repeat(50));
console.log("Testing streaming call:");
console.log("=".repeat(50));

async function testStreaming() {
  try {
    console.log("Stream response:");
    const streamResponse = await opper.stream({
      name: "test",
      instructions: "Write a detailed travel guide about the capital city of the provided country. Include information about the population, major attractions, historical significance, local cuisine, transportation, and interesting facts. Make it comprehensive and engaging, like a travel blog post.",
      inputSchema: countryInputSchema,
      input: inputData,
      model: "openai/gpt-4o-mini",
    });

    // The stream method returns a response object with 'result' containing the EventStream
    for await (const event of streamResponse.result) {
      // Each event is a FunctionStreamCallStreamPostResponseBody with 'data' containing the streaming chunk
      if (event.data && event.data.delta) {
        process.stdout.write(event.data.delta);
      }
    }

    console.log("\n" + "=".repeat(30));
    console.log("Streaming complete!");

  } catch (error) {
    console.error("Error during streaming:", error);
  }
}

// Run the streaming test
testStreaming().catch(console.error);
