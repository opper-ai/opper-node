// Run example with "npx tsx examples/vercel-ai-sdk.ts"
import "dotenv/config";
// The currently supported functions are generateText, generateObject, and streamText
import { generateText, generateObject, streamText } from "ai";
// You can copy and paste this code into your own project.
import { createOpperProvider } from "./fixtures/opper-provider.js";
import { z } from "zod";

import { Opper } from "../src/index.js";

const opper = createOpperProvider({
    apiKey: process.env["OPPER_API_KEY"],
});

const client = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

(async () => {
    const parentSpan = await client.spans.create({
        name: "typescript/sdk/vercel-ai-sdk",
        startTime: new Date(),
        type: "workflow",
        input: "Running Opper integration example with the Vercel AI SDK",
    });

    // Test generateText
    console.log("Testing generateText:");
    const { text } = await generateText({
        model: opper("openai/gpt-4o-mini", {
            name: "typescript/sdk/vercel-ai-sdk-generate-text",
            parentSpanId: parentSpan.id,
        }),
        prompt: "What is the capital of France?",
    });
    console.log("Generated text:", text);

    // Test generateObject
    console.log("Testing generateObject:");
    const { object } = await generateObject({
        model: opper("openai/gpt-4o-mini", {
            name: "typescript/sdk/vercel-ai-sdk-generate-object",
            parentSpanId: parentSpan.id,
        }),
        schema: z.object({
            name: z.string(),
            ingredients: z.array(z.string()),
            cookingTime: z.string(),
            difficulty: z.enum(["easy", "medium", "hard"]),
        }),
        prompt: "Generate a simple pasta recipe",
    });
    console.log("Generated object:", JSON.stringify(object, null, 2));

    // Test streamText
    console.log("Testing streamText:");
    const stream = streamText({
        model: opper("openai/gpt-4o-mini", {
            name: "typescript/sdk/vercel-ai-sdk-stream-text",
            parentSpanId: parentSpan.id,
        }),
        prompt: "Write a short poem about coding",
    });

    console.log("Streaming response:");
    for await (const chunk of stream.textStream) {
        process.stdout.write(chunk);
    }

    // End the span
    await client.spans.update(parentSpan.id, {
        endTime: new Date(),
    });
})();
