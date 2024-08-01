// Run example with "npx ts-node ./examples/typebox-fn-example.ts"
import "dotenv/config";
import { Type } from "@sinclair/typebox";

import fn from "./typebox-fn-decorator";
import Client from "../src";

// Define the input and output schemas with zod.
const TranslationResultSchema = Type.Object({
    translation: Type.String(),
    sentiment: Type.String(),
});

const TranslationInputSchema = Type.Object({
    text: Type.String(),
    language: Type.String(),
});

const HappyTranslationResultSchema = Type.Object({
    text: Type.String(),
});

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

// Define the function using the fn decorator. This will create an opper function
// returning a TranslationResultSchema
const translate = fn(
    {
        name: "test_sdk/typebox/translate",
        instructions: "Translate the input text to the specified language",
    },
    TranslationInputSchema,
    TranslationResultSchema
);

const happify = fn(
    {
        name: "test_sdk/typebox/happify",
        instructions: "Make the input text happier!",
    },
    TranslationResultSchema,
    HappyTranslationResultSchema
);

(async () => {
    const input = { text: "Hello, world!", language: "French" };
    const span = await client.spans.startSpan({
        name: "Translate - typebox",
        input: JSON.stringify(input),
    });

    // Call translate and happify like any other function
    const result = await translate(input, { parent_span_uuid: span.uuid });
    console.log(result);
    const happified = await happify(result, { parent_span_uuid: span.uuid });

    await client.spans.endSpan({ ...span, output: JSON.stringify(happified) });

    console.log(happified);
})();
