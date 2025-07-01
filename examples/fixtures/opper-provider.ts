/**
 * Opper Custom Provider for AI SDK v4
 *
 * This provider integrates Opper's call API with the AI SDK, supporting:
 * - generateText: Regular text generation using Opper's call function
 * - generateObject: Structured output using Opper's outputSchema parameter
 * - streamText: Real-time streaming using Opper's stream function
 *
 * Features:
 * - Full AI SDK v4 compatibility
 * - Automatic prompt conversion from AI SDK format to Opper format
 * - Built-in tracing support with span tracking
 * - Robust JSON parsing with fallback for markdown-wrapped responses
 * - Error handling for streaming and generation
 *
 * Usage:
 * ```typescript
 * import { createOpperProvider } from "./fixtures/opper-provider.js";
 * import { generateText, generateObject, streamText } from "ai";
 *
 * const opper = createOpperProvider({
 *   apiKey: process.env.OPPER_API_KEY,
 * });
 *
 * // Text generation
 * const { text } = await generateText({
 *   model: opper("openai/gpt-4o-mini", { name: "my-function" }),
 *   prompt: "Hello, world!"
 * });
 *
 * // Structured output
 * const { object } = await generateObject({
 *   model: opper("openai/gpt-4o-mini", { name: "my-function" }),
 *   schema: z.object({ name: z.string() }),
 *   prompt: "Generate a name"
 * });
 *
 * // Streaming
 * const stream = await streamText({
 *   model: opper("openai/gpt-4o-mini", { name: "my-function" }),
 *   prompt: "Tell me a story"
 * });
 * ```
 *
 * Note: Structured output (outputSchema) cannot be streamed with Opper
 */

import { Opper } from "../../src";

interface OpperSettings {
    /** Opper API key. Defaults to OPPER_API_KEY environment variable */
    apiKey?: string;
    /** Custom base URL for Opper API */
    baseURL?: string;
}

interface OpperModelSettings {
    /** Name for the Opper function call (required for tracing) */
    name: string;
    /** Parent span ID for tracing */
    parentSpanId?: string;
    /** Custom instructions for the model */
    instructions?: string;
}

export function createOpperProvider(settings: OpperSettings = {}) {
    const opper = new Opper({
        httpBearer: settings.apiKey || process.env.OPPER_API_KEY || "",
        serverURL: settings.baseURL,
    });

    return function (modelId: string, modelSettings: OpperModelSettings) {
        return {
            specificationVersion: "v1" as const,
            provider: "opper" as const,
            modelId,
            defaultObjectGenerationMode: "json" as const,

            doGenerate: async (options: any) => {
                const prompt = options.prompt;

                // Convert prompt to text
                let inputText = "";
                for (const message of prompt) {
                    if (message.role === "user" || message.role === "system") {
                        if (typeof message.content === "string") {
                            inputText += message.content + "\n";
                        } else if (Array.isArray(message.content)) {
                            for (const part of message.content) {
                                if (part.type === "text") {
                                    inputText += part.text + "\n";
                                }
                            }
                        }
                    }
                }

                // Check if this is a structured output request (generateObject)
                const isStructuredOutput =
                    options.mode?.type === "object-json" ||
                    options.mode?.type === "object-tool";
                const schema = options.mode?.schema;

                const callParams: any = {
                    name: modelSettings.name,
                    instructions:
                        modelSettings.instructions ||
                        "You are a helpful AI assistant.",
                    input: inputText.trim(),
                    model: { name: modelId },
                    parentSpanId: modelSettings.parentSpanId,
                };

                // If this is structured output generation, add the output schema
                if (isStructuredOutput && schema) {
                    callParams.outputSchema = schema;
                }

                const response = await opper.call(callParams);

                // For structured output, return the parsed JSON object
                if (isStructuredOutput && response.jsonPayload) {
                    return {
                        text: JSON.stringify(response.jsonPayload),
                        object: response.jsonPayload,
                        usage: {
                            promptTokens: 0,
                            completionTokens: 0,
                        },
                        finishReason: "stop" as const,
                        rawCall: {
                            rawPrompt: inputText.trim(),
                            rawSettings: options,
                        },
                    };
                }

                // For structured output where we got text instead of jsonPayload,
                // try to extract JSON from markdown code blocks
                if (isStructuredOutput && response.message) {
                    const text = response.message;

                    // Try to extract JSON from markdown code blocks
                    const jsonMatch = text.match(
                        /```(?:json)?\s*\n?(.*?)\n?```/s
                    );
                    if (jsonMatch) {
                        try {
                            const extractedJson = JSON.parse(jsonMatch[1]);
                            return {
                                text: JSON.stringify(extractedJson),
                                object: extractedJson,
                                usage: {
                                    promptTokens: 0,
                                    completionTokens: 0,
                                },
                                finishReason: "stop" as const,
                                rawCall: {
                                    rawPrompt: inputText.trim(),
                                    rawSettings: options,
                                },
                            };
                        } catch (parseError) {
                            // Continue to try parsing the whole text
                        }
                    }

                    // If no markdown blocks, try parsing the whole text as JSON
                    try {
                        const parsedJson = JSON.parse(text);
                        return {
                            text: JSON.stringify(parsedJson),
                            object: parsedJson,
                            usage: {
                                promptTokens: 0,
                                completionTokens: 0,
                            },
                            finishReason: "stop" as const,
                            rawCall: {
                                rawPrompt: inputText.trim(),
                                rawSettings: options,
                            },
                        };
                    } catch (parseError) {
                        // Fall through to regular text handling
                    }
                }

                // For regular text generation
                const text =
                    response.message ||
                    (response.jsonPayload
                        ? JSON.stringify(response.jsonPayload)
                        : "");

                return {
                    text,
                    usage: {
                        promptTokens: 0,
                        completionTokens: 0,
                    },
                    finishReason: "stop" as const,
                    rawCall: {
                        rawPrompt: inputText.trim(),
                        rawSettings: options,
                    },
                };
            },

            doStream: async (options: any) => {
                const prompt = options.prompt;

                // Convert prompt to text
                let inputText = "";
                for (const message of prompt) {
                    if (message.role === "user" || message.role === "system") {
                        if (typeof message.content === "string") {
                            inputText += message.content + "\n";
                        } else if (Array.isArray(message.content)) {
                            for (const part of message.content) {
                                if (part.type === "text") {
                                    inputText += part.text + "\n";
                                }
                            }
                        }
                    }
                }

                // Check if this is a structured output request
                const isStructuredOutput =
                    options.mode?.type === "object-json" ||
                    options.mode?.type === "object-tool";

                // Note: Opper doesn't support streaming with outputSchema, so we can't stream structured output
                if (isStructuredOutput) {
                    throw new Error(
                        "Structured output streaming is not supported by Opper. Use generateObject instead of streamObject."
                    );
                }

                const streamParams: any = {
                    name: modelSettings.name,
                    instructions:
                        modelSettings.instructions ||
                        "You are a helpful AI assistant.",
                    input: inputText.trim(),
                    model: { name: modelId },
                    parentSpanId: modelSettings.parentSpanId,
                };

                const response = await opper.stream(streamParams);

                // Create a ReadableStream from the Opper event stream
                const stream = new ReadableStream({
                    async start(controller) {
                        try {
                            // Stream the text deltas
                            for await (const event of response.result) {
                                if (event.data?.delta) {
                                    controller.enqueue({
                                        type: "text-delta" as const,
                                        textDelta: event.data.delta,
                                    });
                                }
                            }

                            // Enqueue finish event
                            controller.enqueue({
                                type: "finish" as const,
                                finishReason: "stop" as const,
                                usage: {
                                    promptTokens: 0,
                                    completionTokens: 0,
                                },
                            });

                            controller.close();
                        } catch (error) {
                            // Enqueue error finish event
                            controller.enqueue({
                                type: "finish" as const,
                                finishReason: "error" as const,
                                usage: {
                                    promptTokens: 0,
                                    completionTokens: 0,
                                },
                            });
                            controller.error(error);
                        }
                    },
                });

                return {
                    stream,
                    rawCall: {
                        rawPrompt: inputText.trim(),
                        rawSettings: options,
                    },
                };
            },
        };
    };
}
