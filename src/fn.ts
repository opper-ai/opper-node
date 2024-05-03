import { z, ZodTypeDef } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import Client from "./index";
import { CacheConfig } from "./types";
import { getCurrentSpanId } from "./context";

interface OpperOptions {
    path: string;
    model?: string;
    instructions?: string;
    description: string;
    few_shot?: boolean;
    few_shot_count?: number;
    cache_config?: CacheConfig;
    input_schema?: Record<string, unknown>;
    out_schema?: Record<string, unknown>;
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
export default function fn<
    T extends z.ZodType<unknown, ZodTypeDef>,
    I extends z.ZodType<unknown, ZodTypeDef>,
>(
    {
        cache_config,
        description,
        few_shot_count,
        few_shot,
        instructions,
        model,
        path,
    }: OpperOptions,
    inputSchema: I,
    outputSchema: T
): (input: z.infer<I>) => Promise<z.infer<T>> {
    const client = new Client();
    client.functions.create(
        {
            path: path,
            model: model,
            instructions: instructions || description,
            description: description,
            few_shot: few_shot || false,
            few_shot_count: few_shot_count || 2,
            cache_config: cache_config,
            input_schema: zodToJsonSchema(inputSchema),
            out_schema: zodToJsonSchema(outputSchema),
        },
        true
    );

    return async function (input: z.infer<I>): Promise<z.infer<T>> {
        const res = await client.functions.chat({
            parent_span_uuid: getCurrentSpanId(),
            path: path,
            message: JSON.stringify(input),
        });

        return outputSchema.parse(res.json_payload);
    };
}
