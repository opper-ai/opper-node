// Run example with "npx ts-node ./examples/example-zod-fn.ts"
import "dotenv/config";
import { z } from "zod";

import Client from "../src";
import fn from "./zod-fn-decorator";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

// Define the input and output schemas with zod.
const TranslationResultSchema = z.object({
    translation: z.string(),
    sentiment: z.string(),
});

const TranslationInputSchema = z.object({
    text: z.string(),
    language: z.string(),
});

const HappyTranslationResultSchema = z.object({
    text: z.string(),
});

// Define the function using the fn decorator. This will create an opper function
// returning a TranslationResultSchema
const translate = fn(
    {
        name: "node-sdk/zod/translate",
        instructions: "Translate the input text to the specified language",
        // Examples are limited to 10
        examples: [
            {
                input: { text: "Hello, world!", language: "French" },
                output: { translation: "Bonjour le monde!", sentiment: "positive" },
            },
        ],
    },
    TranslationInputSchema,
    TranslationResultSchema
);

const happify = fn(
    {
        name: "node-sdk/zod/happify",
        instructions: "Make the input text happier!",
    },
    TranslationResultSchema,
    HappyTranslationResultSchema
);

(async () => {
    const input = { text: "Hello, world!", language: "French" };
    const trace = await client.traces.start({
        name: "node-sdk/zod",
        input,
    });

    // Call translate and happify like any other function
    const result = await translate(input, { parent_span_uuid: trace.uuid });
    console.log(result);
    const happified = await happify(result, { parent_span_uuid: trace.uuid });
    console.log(happified);

    await trace.end({ ...trace, output: happified });
})();
