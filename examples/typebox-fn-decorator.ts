import { type Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

import Client from "../src";

interface OpperOptions<InputSchema extends TSchema, OutputSchema extends TSchema> {
    name: string;
    description?: string;
    instructions: string;
    model?: string;
    examples?: {
        input: Static<InputSchema>;
        output: Static<OutputSchema>;
        comment?: string;
    }[];
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
 * import { Type } from "@sinclair/typebox";
 * import fn from "./typebox-fn-decorator";
 *
 * // Define the input and output schemas with TypeBox.
 * const InputSchema = Type.Object({
 *    text: Type.String(),
 * });
 *
 * const OutputSchema = Type.Object({
 *    translation: Type.String(),
 *    sentiment: Type.String(),
 * });
 *
 * // Create an asynchronous function using the fn factory.
 * const translateAndAnalyze = fn({
 *    name: 'translate-and-analyze',
 *    description: 'Translate text and analyze sentiment.',
 *    instructions: 'Translate the given text to French and analyze its sentiment.',
 *    model: 'azure/gpt-4o-eu',
 * }, InputSchema, OutputSchema);
 *
 * // Use the function.
 * const result = await translateAndAnalyze({ text: 'Hello, world!' });
 * console.log(result);
 * // Output: { translation: 'Bonjour, le monde!', sentiment: 'Positive' }
 * ```
 */
export default function fn<OutputSchema extends TSchema, InputSchema extends TSchema>(
    { description, instructions, model, name, examples }: OpperOptions<InputSchema, OutputSchema>,
    inputSchema: InputSchema,
    outputSchema: OutputSchema
): (
    input: Static<InputSchema>,
    options?: { parent_span_uuid?: string }
) => Promise<Static<OutputSchema>> {
    const client = new Client();

    return async function (
        input: Static<InputSchema>,
        options?: { parent_span_uuid?: string }
    ): Promise<Static<OutputSchema>> {
        const res = await client.call({
            name,
            input: JSON.stringify(input),
            description: description || instructions,
            instructions,
            model,
            input_schema: inputSchema,
            out_schema: outputSchema,
            parent_span_uuid: options?.parent_span_uuid,
            examples,
        });

        const validationResult = Value.Check(outputSchema, res.json_payload);

        if (validationResult) {
            return res.json_payload;
        } else {
            throw new Error(`Validation failed: ${JSON.stringify(outputSchema)}`);
        }
    };
}
