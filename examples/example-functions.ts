// Run example with "npx ts-node ./examples/example-functions.ts"
import "dotenv/config";

import Client from "../src";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    const fn = await client.functions.create({
        path: "node-sdk/function/caching",
        instructions: "Extract room and number of beds from text",
        description: "Extract room and number of beds from text",
        out_schema: {
            $schema: "https://json-schema.org/draft/2020-12/schema",
            type: "object",
            properties: {
                room: {
                    description: "The room",
                    type: "string",
                },
                beds: {
                    description: "The number of beds",
                    type: "number",
                },
            },
            required: ["room", "beds"],
        },
        model: "openai/gpt-4o",
        cache_configuration: {
            exact_match_cache_ttl: 10,
        },
    });

    console.log("Function created: ", fn);

    const response1 = await client.functions.chat({
        path: "node-sdk/function/caching",
        message: "Room at Grand Hotel with 2 beds and a view to the sea",
    });

    console.log(
        `Response1 Cached: ${response1.cached} \nPayload: ${JSON.stringify(response1.json_payload, null, 2)}`
    );

    const response2 = await client.functions.chat({
        path: "node-sdk/function/caching",
        message: "Room at Grand Hotel with 2 beds and a view to the sea",
    });

    console.log(
        `Response2 Cached: ${response2.cached} \nPayload: ${JSON.stringify(response2.json_payload, null, 2)}`
    );

    const fn2 = await client.functions.get(fn);
    console.log("Function retrieved: ", fn2);

    await client.functions.delete(fn);
})();
