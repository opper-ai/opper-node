/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import Client from "./index";
import { getCurrentSpanId } from "./spans";
import { CacheConfig } from "./types";

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

/**
 * Decorator function that creates an opper function from an input and output schema.
 * @param options - OpperOptions for the function.
 * @param inputSchema - The input zod schema for the function.
 * @param outputSchema - The output zod schema for the function.
 * @returns A function that takes an input and returns a promise of the output.
 *
 * @example
 * ```ts
 * // Define the input and output schemas with zod.
 * const TranslationResultSchema = z.object({
 *    translation: z.string(),
 *   sentiment: z.string(),
 * });
 *
 * // Create an opper function.
 * const translateAndAnalyze = fn({ path: 'translate-and-analyze', description: 'Translate text and analyze sentiment.' }, TranslationResultSchema, TranslationResultSchema);
 *
 * // Use the function.
 * const result = await translateAndAnalyze({ text: 'Hello, world!' });
 * console.log(result);
 * ```
 */
export default function fn<T extends z.ZodType<any, any>, I extends z.ZodType<any, any>>(
    options: OpperOptions,
    inputSchema: I,
    outputSchema: T
): (input: z.infer<I>) => Promise<z.infer<T>> {
    const client = new Client();
    client.functions.create(
        {
            path: options.path,
            model: options.model,
            instructions: options.instructions || options.description,
            description: options.description,
            few_shot: options.few_shot || false,
            few_shot_count: options.few_shot_count || 2,
            cache_config: options.cache_config,
            input_schema: zodToJsonSchema(inputSchema),
            out_schema: zodToJsonSchema(outputSchema),
        },
        true
    );

    return async function (input: z.infer<I>): Promise<z.infer<T>> {
        const res = await client.functions.chat({
            parent_span_uuid: getCurrentSpanId(),
            path: options.path,
            message: JSON.stringify(input),
        });

        return outputSchema.parse(res.json_payload);
    };
}
