import { z, ZodTypeDef } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import Client from "../src";

interface OpperOptions<
    InputSchema extends z.ZodType<unknown, ZodTypeDef>,
    OutputSchema extends z.ZodType<unknown, ZodTypeDef>,
> {
    name: string;
    description?: string;
    instructions: string;
    model?: string;
    examples?: {
        input: z.infer<InputSchema>;
        output: z.infer<OutputSchema>;
        comment?: string;
    }[];
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
    InputSchema extends z.ZodType<unknown, ZodTypeDef>,
    OutputSchema extends z.ZodType<unknown, ZodTypeDef>,
>(
    { name, description, instructions, model, examples }: OpperOptions<InputSchema, OutputSchema>,
    inputSchema: InputSchema,
    outputSchema: OutputSchema
): (
    input: z.infer<InputSchema>,
    options?: { parent_span_uuid?: string }
) => Promise<z.infer<OutputSchema>> {
    const client = new Client();

    return async function (
        input: z.infer<InputSchema>,
        options?: { parent_span_uuid?: string }
    ): Promise<z.infer<OutputSchema>> {
        const res = await client.call({
            name,
            input: JSON.stringify(input),
            description: description || instructions,
            instructions,
            model,
            input_schema: zodToJsonSchema(inputSchema),
            out_schema: zodToJsonSchema(outputSchema),
            parent_span_uuid: options?.parent_span_uuid,
            examples,
        });

        return outputSchema.parse(res.json_payload);
    };
}
