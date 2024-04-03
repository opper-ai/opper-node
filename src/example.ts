import * as uuid from 'uuid';
import { z } from 'zod';
import fn from "./fn";
import Client from "./index";
import { Span } from "./types";

const TranslationResultSchema = z.object({
    translation: z.string(),
    sentiment: z.string(),
});

const TranslationInputSchema = z.object({
    text: z.string(),
    language: z.string(),
});


const client = new Client();


const translate = fn({
    path: "test/translate",
    model: "anthropic/claude-3-haiku",
    description: "Translate the input text to the specified language",
}, TranslationInputSchema, TranslationResultSchema);

(async () => {

    const input = { text: "Hello, world!", language: "French" };
    const span: Span = {
        uuid: uuid.v4(),
        name: "Translate",
        start_time: new Date(),
        input: JSON.stringify(input),
    }
    await client.traces.startSpan(span);

    const result = await translate(input);

    span.output = JSON.stringify(result);
    span.end_time = new Date();
    await client.traces.endSpan(span);

    console.log(result);
})();