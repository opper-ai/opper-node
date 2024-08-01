// Run example with "npx ts-node ./examples/zod-fn-example.ts"
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
        name: "test_sdk/zod/translate",

        instructions: "Translate the input text to the specified language",
    },
    TranslationInputSchema,
    TranslationResultSchema
);

const happify = fn(
    {
        name: "test_sdk/zod/happify",

        instructions: "Make the input text happier!",
    },
    TranslationResultSchema,
    HappyTranslationResultSchema
);

(async () => {
    const input = { text: "Hello, world!", language: "French" };
    const span = await client.spans.startSpan({
        name: "Translate - zod",
        input: JSON.stringify(input),
    });

    // Call translate and happify like any other function
    const result = await translate(input, { parent_span_uuid: span.uuid });

    console.log(result);

    const happified = await happify(result, { parent_span_uuid: span.uuid });

    await client.spans.endSpan({ ...span, output: JSON.stringify(happified) });

    console.log(happified);
})();
