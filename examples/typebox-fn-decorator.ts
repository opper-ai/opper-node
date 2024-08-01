import { type Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import Client from "../src";

interface OpperOptions {
    name: string;
    description?: string;
    instructions: string;
    model?: string;
}

/**
 * Function factory that creates an asynchronous function based on provided TypeBox schemas and options.
 * @param options - Configuration options for the function
 * @param inputSchema - The TypeBox schema defining the shape of the input data.
 * @param outputSchema - The TypeBox schema defining the shape of the expected output data.
 * @returns A function that accepts an input conforming to the inputSchema and resolves to an output conforming to the outputSchema.
 *
 * @example
 * ```ts
 * // Define the input and output schemas with TypeBox.
 * const TranslationResultSchema = Type.Object({
 *    translation: Type.String(),
 *    sentiment: Type.String(),
 * });
 *
 * // Create an asynchronous function using the fn factory.
 * const translateAndAnalyze = fn({
 *    path: 'translate-and-analyze',
 *    description: 'Translate text and analyze sentiment.',
 *    few_shot: true,
 *    few_shot_count: 3
 * }, TranslationResultSchema, TranslationResultSchema);
 *
 * // Use the function.
 * const result = await translateAndAnalyze({ text: 'Hello, world!' });
 * console.log(result);
 * ```
 */
export default function fn<T extends TSchema, I extends TSchema>(
    { description, instructions, model, name }: OpperOptions,
    inputSchema: I,
    outputSchema: T
): (input: Static<I>, options?: { parent_span_uuid?: string }) => Promise<Static<T>> {
    const client = new Client();

    return async function (
        input: Static<I>,
        options?: { parent_span_uuid?: string }
    ): Promise<Static<T>> {
        const res = await client.call({
            name,
            input: JSON.stringify(input),
            description: description || instructions,
            instructions,
            model,
            input_schema: inputSchema,
            output_schema: outputSchema,
            parent_span_uuid: options?.parent_span_uuid,
        });

        const validationResult = Value.Check(outputSchema, res.json_payload);

        if (validationResult) {
            return res.json_payload;
        } else {
            throw new Error(`Validation failed: ${JSON.stringify(outputSchema)}`);
        }
    };
}
