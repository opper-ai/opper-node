// Run example with "npx tsx examples/vercel-ai-sdk-compat.ts"
import "dotenv/config";
import { generateText, generateObject, streamObject, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * An example of how to use the opper compat endpoint with the Vercel AI SDK.
 * The opper compat endpoint is currently only available for users on the utility plan.
 * For the complete ai sdk docs:
 * @see https://ai-sdk.dev/docs/introduction
 */
const openai = createOpenAI({
    // The opper compat endpoint is currently only available for users on the utility plan.
    baseURL: "https://api.opper.ai/compat/openai",
    apiKey: process.env["OPPER_API_KEY"],
    headers: { "x-opper-api-key": process.env["OPPER_API_KEY"] ?? "" },
});

(async () => {
    console.log("\nGenerating text...");
    const { text } = await generateText({
        model: openai("openai/gpt-4.1-nano"),
        prompt: "What is the capital of France?",
    });

    console.log(text);

    console.log("\nStreaming text...");
    const result = streamText({
        model: openai("openai/gpt-4.1-nano"),
        prompt: "Invent a new holiday and describe its traditions.",
    });

    // example: use textStream as an async iterable
    for await (const textPart of result.textStream) {
        console.log(textPart);
    }

    console.log("\nGenerating object...");
    const { object } = await generateObject({
        model: openai("openai/gpt-4.1-nano"),
        schema: z.object({
            recipe: z.object({
                name: z.string(),
                ingredients: z.array(
                    z.object({ name: z.string(), amount: z.string() })
                ),
                steps: z.array(z.string()),
            }),
        }),
        prompt: "Generate a lasagna recipe.",
    });

    console.log(JSON.stringify(object, null, 2));

    console.log("\nStreaming object...");
    const { elementStream } = streamObject({
        model: openai("openai/gpt-4.1-nano"),
        output: "array",
        schema: z.object({
            name: z.string(),
            class: z
                .string()
                .describe("Character class, e.g. warrior, mage, or thief."),
            description: z.string(),
        }),
        prompt: "Generate 3 hero descriptions for a fantasy role playing game.",
    });

    for await (const hero of elementStream) {
        console.log(hero);
    }
})();
