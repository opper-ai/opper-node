import { z } from 'zod';
import { zodToJsonSchema } from "zod-to-json-schema";
import Client from "./index";
import { CacheConfig } from './types';

interface OpperOptions {
    path: string;
    model?: string;
    instructions?: string;
    description: string;
    few_shot?: boolean;
    few_shot_count?: number;
    cache_config?: CacheConfig;
    input_schema?: Record<string, any>;
    out_schema?: Record<string, any>;
}


function fn<T extends z.ZodType<any, any>, I extends z.ZodType<any, any>>(
    options: OpperOptions,
    inputSchema: I,
    outputSchema: T
): (input: z.infer<I>) => Promise<z.infer<T>> {
    const client = new Client();
    client.functions.create({
        path: options.path,
        model: options.model,
        instructions: options.instructions || options.description,
        description: options.description,
        few_shot: options.few_shot || false,
        few_shot_count: options.few_shot_count || 2,
        cache_config: options.cache_config,
        input_schema: zodToJsonSchema(inputSchema),
        out_schema: zodToJsonSchema(outputSchema),
    }, true);

    return async function (input: z.infer<I>): Promise<z.infer<T>> {
        const res = await client.functions.chat({
            path: options.path,
            message: JSON.stringify(input),
        });

        return outputSchema.parse(res.json_payload);
    };
}

const TranslationResultSchema = z.object({
    translation: z.string(),
    sentiment: z.string(),
});

const TranslationInputSchema = z.object({
    text: z.string(),
    language: z.string(),
});


const translate = fn({
    path: "test/translate",
    model: "anthropic/claude-3-haiku",
    description: "Translate the input text to the specified language",
}, TranslationInputSchema, TranslationResultSchema);

(async () => {
    const result = await translate({ text: "Hello, world!", language: "French" });
    console.log(result);
})();
