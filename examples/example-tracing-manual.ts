/* eslint-disable @typescript-eslint/no-explicit-any */
// Run example with "npx ts-node ./examples/example-tracing-manual.ts"
import "dotenv/config";
import Client from "../src";
import { nanoId } from "../src/utils";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

const sleepAndReturn = async (ms: number, returnValue: any) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return returnValue;
};

(async () => {
    // Start parent trace
    const trace = await client.traces.start({
        name: "node-sdk/tracing-manual",
        input: { some: "input given to", to: "the trace" },
        metadata: { some: "metadata given to", to: "the trace" },
    });

    // Start the span and provide the input
    const span = await trace.startSpan({
        name: "node-sdk/tracing-manual/span",
        input: { some: "input given to", to: "the span" },
        metadata: { some: "metadata given to", to: "the span" },
    });

    // Capture time call some function and capture response
    const t0 = new Date();
    const response = await sleepAndReturn(1000, "Hello, world!");
    const t1 = new Date();

    // Save the generation under the current span
    await span.saveGeneration({
        called_at: t0,
        duration_ms: t1.getTime() - t0.getTime(),
        model: "anthropic/claude-3-haiku",
        response: response,
        messages: [{ role: "user", content: "Hello, world!" }],
        prompt_tokens: 100,
        completion_tokens: 100,
        total_tokens: 200,
        cost: 0.001,
    });

    // A metric and/or comment can be saved to the span
    await span.saveMetric({
        dimension: "accuracy",
        score: 1,
        comment: "This is a comment",
    });

    // End the span and provide the output
    await span.end({
        output: { foo: "bar" },
    });

    // Manually create a new child span for a given trace with a its uuid
    const manualSpan = await client.traces.startSpan({
        // A custom uuid can be provided for the span
        uuid: nanoId(),
        parent_uuid: trace.uuid,
        name: "node-sdk/tracing-manual/manual-span",
        input: { some: "input given to", to: "the manual span" },
    });
    await sleepAndReturn(1000, null);
    await manualSpan.end({ output: { foo: "bar" } });

    await trace.end({ output: { foo: "bar" } });
})();
