// Run example with "npx tsx examples/functions.ts"
import "dotenv/config";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

const MyInputSchema = z.object({
    name: z.string(),
});

const MyResponseSchema = z.object({
    greeting: z.string(),
});

(async () => {
    // Create the function
    const func = await opper.functions.create({
        name: "typescript/sdk/crud-function", // Can't be duplicated
        instructions: "greet the user",
        model: "openai/gpt-4o",
        inputSchema: zodToJsonSchema(MyInputSchema),
    });

    console.log(`Created function: ${func.id}`);

    // Use function to stream response
    const streamResponse = await opper.functions.stream(func.id, {
        input: { name: "world" },
    });

    console.log("Streaming response:");
    for await (const event of streamResponse.result) {
        if (event.data?.delta) {
            process.stdout.write(event.data.delta);
        }
    }
    console.log("\n");

    // Update function to have output type
    await opper.functions.update(func.id, {
        outputSchema: zodToJsonSchema(MyResponseSchema),
    });

    console.log("Updated function with output schema");

    // Call function
    const res1 = await opper.functions.call(func.id, {
        input: { name: "world" },
    });
    console.log("Function call result:", res1.jsonPayload);

    // Call function with examples
    const res2 = await opper.functions.call(func.id, {
        input: { name: "world" },
        examples: [
            {
                input: { name: "world" },
                output: { greeting: "Hello, world!" },
            },
            {
                input: { name: "nick" },
                output: { greeting: "Hello, nick!" },
            },
        ],
    });
    console.log("Function call with examples:", res2.jsonPayload);

    // Enable exact match cache for function
    await opper.functions.update(func.id, {
        instructions: "greet the user in german",
        configuration: {
            "cache.exact_match_enabled": true, // NOTE: not available yet
            "cache.exact_match_cache_ttl": 300,
        },
    });

    console.log("Updated function with cache configuration");

    // Call with cache - not cached
    const res3 = await opper.functions.call(func.id, {
        input: { name: "world" },
    });
    console.log(`Not cached: ${res3.jsonPayload}`, `(cached: ${res3.cached})`);

    // Call with cache - cached
    const res4 = await opper.functions.call(func.id, {
        input: { name: "world" },
    });
    console.log(
        `Potentially cached: ${res4.jsonPayload}`,
        `(cached: ${res4.cached})`
    );

    // List functions
    console.log("Listing functions:");
    const functionsList = await opper.functions.list(
        undefined,
        undefined,
        undefined,
        10
    );
    console.log(functionsList);

    // Delete function
    const deleted = await opper.functions.delete(func.id);
    console.log(`Deleted: ${deleted}`);
})();
