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
 * Function factory that creates an asynchronous function based on provided Zod schemas and options.
 * @param options - Configuration options for the function
 * @param inputSchema - The Zod schema defining the shape of the input data.
 * @param outputSchema - The Zod schema defining the shape of the expected output data.
 * @returns A function that accepts an input conforming to the inputSchema and resolves to an output conforming to the outputSchema.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 * import fn from "./zod-fn-decorator";
 *
 * // Define the input and output schemas with Zod.
 * const InputSchema = z.object({
 *   text: z.string(),
 * });
 *
 * const OutputSchema = z.object({
 *   translation: z.string(),
 *   sentiment: z.string(),
 * });
 *
 * // Create an asynchronous function using the fn factory.
 * const translateAndAnalyze = fn({
 *   name: 'translate-and-analyze',
 *   description: 'Translate text and analyze sentiment.',
 *   instructions: 'Translate the given text to French and analyze its sentiment.',
 *   model: 'azure/gpt-4o-eu',
 * }, InputSchema, OutputSchema);
 *
 * // Use the function.
 * const result = await translateAndAnalyze({ text: 'Hello, world!' });
 * console.log(result);
 * // Output: { translation: 'Bonjour, le monde!', sentiment: 'Positive' }
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
