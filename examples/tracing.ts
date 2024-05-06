// Run example with "npx ts-node ./examples/tracing.ts"
import "dotenv/config";
import { z } from "zod";
import Client, { fn } from "../src"; // import Client, { Span, fn } from "opperai";

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

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

// Define the function using the fn decorator. This will create an opper function
// returning a TranslationResultSchema
const translate = fn(
    {
        path: "test_sdk/translate",
        model: "anthropic/claude-3-haiku",
        description: "Translate the input text to the specified language",
    },
    TranslationInputSchema,
    TranslationResultSchema
);

const happify = fn(
    {
        path: "test_sdk/happify",
        model: "anthropic/claude-3-haiku",
        description: "Make the input text happier!",
    },
    TranslationResultSchema,
    HappyTranslationResultSchema
);

(async () => {
    const input = { text: "Hello, world!", language: "French" };
    const span = await client.spans.startSpan({
        name: "Translate",
        input: JSON.stringify(input),
    });

    // Call translate and happify like any other function
    const result = await translate(input);
    console.log(result);
    const happified = await happify(result);

    await client.spans.endSpan({ ...span, output: JSON.stringify(happified) });

    console.log(happified);
})();
