// Run example with "npx tsx examples/calls.ts"
import "dotenv/config";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

// Zod schemas (equivalent to Pydantic models in Python)
const NumberSchema = z.object({
    x: z.number().int().min(0).describe("value of the number"),
});

const NumbersListSchema = z.object({
    numbers: z.array(NumberSchema),
});

const ModelResponseSchema = z.object({
    response: z.string(),
});

async function bareMinimum() {
    const output = await opper.call({
        name: "typescript/sdk/bare-minimum",
        instructions: "answer the following question",
        input: "what are some uses of 42",
    });
    console.log(output);
}

async function streamCall() {
    console.log("Print the assistant's answer as it streams back from Opper.");
    const outer = await opper.stream({
        name: "typescript/sdk/bare-minimum-with-stream",
        instructions: "answer the following question",
        input: "what are some uses of 42",
    });

    // Access the result stream directly
    const stream = outer.result;

    // Read each Server-Sent Event and emit the delta text
    for await (const event of stream) {
        const delta = event.data?.delta;
        if (delta) {
            // skip keep-alives, etc.
            process.stdout.write(delta);
        }
    }
}

async function bareMinimumWithModel() {
    const output = await opper.call({
        name: "typescript/sdk/bare-minimum-with-model",
        instructions: "answer the following question",
        input: "what are some uses of 42",
        model: "openai/gpt-4o-mini",
    });
    console.log(output);
}

async function bareMinimumWithFallbacks() {
    const output = await opper.call({
        name: "typescript/sdk/bare-minimum-with-fallbacks",
        instructions: "answer the following question",
        input: "what are some uses of 42",
        model: ["openai/gpt-4o", "azure/gpt4-eu"],
    });
    console.log(output);
}

async function bareMinimumWithOptions() {
    const output = await opper.call({
        name: "typescript/sdk/bare-minimum-with-options",
        instructions: "answer the following question",
        input: "what are some uses of 42",
        model: { name: "openai/gpt-4.1-nano", options: { max_tokens: 5 } },
    });
    console.log(output);
}

async function bareMinimumWithTags() {
    const output = await opper.call({
        name: "typescript/sdk/bare-minimum-with-tags",
        instructions: "answer the following question",
        input: " what is the capital of france?",
        tags: { area: "world", topic: "geography" },
    });
    console.log(output);
}

async function structuredStringInputOutput() {
    const responseSchema = {
        type: "object",
        properties: { response: { type: "string" } },
    };

    const output = await opper.call({
        name: "typescript/sdk/structured-string-input-output",
        instructions: "answer the following question",
        outputSchema: responseSchema,
        input: " what is the capital of france?",
    });
    console.log(output);
}

async function structuredStringInputOutputZod() {
    const output = await opper.call({
        name: "typescript/sdk/structured-string-input-output-zod",
        instructions: "answer the following question",
        input: " what is the capital of france?",
        outputSchema: zodToJsonSchema(ModelResponseSchema),
    });
    console.log(output);
}

async function structuredInputOutput() {
    const output = await opper.call({
        name: "typescript/sdk/structured-input-output",
        instructions: "given a list of numbers return the largest",
        inputSchema: zodToJsonSchema(NumbersListSchema),
        input: [{ x: 6 }, { x: 7 }],
        outputSchema: zodToJsonSchema(NumberSchema),
    });
    console.log(output);
}

async function callWithExamples() {
    const output = await opper.call({
        name: "typescript/sdk/call-with-examples",
        instructions: "answer the following question",
        input: "What is the most populated city in the world?",
        examples: [
            {
                input: "what are some uses of 42",
                output: "42 is the answer to the universe",
            },
            { input: "what is the capital of france?", output: "Paris" },
        ],
    });
    console.log(output);
}

async function callWithStructuredExamples() {
    const output = await opper.call({
        name: "typescript/sdk/call-with-structured-examples",
        instructions: "given a list of numbers return the largest",
        inputSchema: zodToJsonSchema(NumbersListSchema),
        input: [{ x: 1 }, { x: 12 }],
        outputSchema: zodToJsonSchema(NumberSchema),
        examples: [
            { input: [{ x: 1 }], output: { x: 1 }, comment: "small number" },
            {
                input: [{ x: 2 }, { x: 3 }],
                output: { x: 3 },
                comment: "large number",
            },
        ],
    });
    console.log(output, "\n\n");
}

const EXAMPLES: Array<[string, () => Promise<void>]> = [
    ["Bare Minimum", bareMinimum],
    ["Stream Call", streamCall],
    ["Bare Minimum with Model", bareMinimumWithModel],
    ["Bare Minimum with Fallbacks", bareMinimumWithFallbacks],
    ["Bare Minimum with Options", bareMinimumWithOptions],
    ["Bare Minimum with Tags", bareMinimumWithTags],
    ["Structured String Input Output", structuredStringInputOutput],
    ["Structured String Input Output with Zod", structuredStringInputOutputZod],
    ["Structured Input Output", structuredInputOutput],
    ["Call with Examples", callWithExamples],
    ["Call with Structured Examples", callWithStructuredExamples],
];

// Main execution logic
(async () => {
    console.log("Running examples sequentially:");
    for (const [title, func] of EXAMPLES) {
        console.log(`\n${title}:`);
        await func();
    }
})();
