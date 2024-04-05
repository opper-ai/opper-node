import Client, { Span, fn } from "opperai";
import * as uuid from 'uuid';
import { z } from 'zod';


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

const client = new Client();

// Define the function using the fn decorator. This will create an opper function
// returning a TranslationResultSchema
const translate = fn({
    path: "test_sdk/translate",
    model: "anthropic/claude-3-haiku",
    description: "Translate the input text to the specified language",
}, TranslationInputSchema, TranslationResultSchema);


const happify = fn({
    path: "test_sdk/happify",
    model: "anthropic/claude-3-haiku",
    description: "Make the input text happier!",
}, TranslationResultSchema, HappyTranslationResultSchema);


(async () => {

    const input = { text: "Hello, world!", language: "French" };
    const span: Span = {
        uuid: uuid.v4(),
        name: "Translate",
        start_time: new Date(),
        input: JSON.stringify(input),
    }
    await client.traces.startSpan(span);

    // Call translate and happify like any other function
    const result = await translate(input);
    console.log(result);
    const happified = await happify(result);

    span.output = JSON.stringify(happified);
    span.end_time = new Date();
    await client.traces.endSpan(span);

    console.log(happified);
})();