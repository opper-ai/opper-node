import { z, ZodTypeDef } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import Client from "../src";

interface OpperOptions {
    name: string;
    description?: string;
    instructions: string;
    model?: string;
}

/**
 * Decorator function that creates an opper call from an input and output schema.
 * @param options - OpperOptions for the function.
 * @param inputSchema - The input zod schema for the function.
 * @param outputSchema - The output zod schema for the function.
 * @returns A function that takes an input and an optional parentSpanUuid, and returns a promise of the output.
 *
 * @example
 * ```ts
 * // Define the input and output schemas with zod.
 * const InputSchema = z.object({
 *   text: z.string(),
 *   language: z.string(),
 * });
 *
 * const OutputSchema = z.object({
 *   translation: z.string(),
 *   sentiment: z.string(),
 * });
 *
 * // Create an opper function.
 * const translate = fn(
 *   {
 *     name: 'test_sdk/translate',
 *     instructions: 'Translate the input text to the specified language'
 *   },
 *   InputSchema,
 *   OutputSchema
 * );
 *
 * // Use the function.
 * const span = await client.spans.startSpan({
 *   name: "Translate",
 *   input: JSON.stringify({ text: "Hello, world!", language: "French" }),
 * });
 * const result = await translate({ text: "Hello, world!", language: "French" }, span.uuid);
 * console.log(result);
 * await client.spans.endSpan({ ...span, output: JSON.stringify(result) });
 * ```
 */
export default function fn<
    T extends z.ZodType<unknown, ZodTypeDef>,
    I extends z.ZodType<unknown, ZodTypeDef>,
>(
    { name, description, instructions, model }: OpperOptions,
    inputSchema: I,
    outputSchema: T
): (input: z.infer<I>, options?: { parent_span_uuid?: string }) => Promise<z.infer<T>> {
    const client = new Client();

    return async function (
        input: z.infer<I>,
        options?: { parent_span_uuid?: string }
    ): Promise<z.infer<T>> {
        const res = await client.call({
            name,
            input: JSON.stringify(input),
            description: description || instructions,
            instructions,
            model,
            input_schema: zodToJsonSchema(inputSchema),
            output_schema: zodToJsonSchema(outputSchema),
            parent_span_uuid: options?.parent_span_uuid,
        });

        return outputSchema.parse(res.json_payload);
    };
}
