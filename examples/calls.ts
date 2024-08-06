// Run example with "npx ts-node ./examples/calls.ts"
import "dotenv/config";

import Client from "../src";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    const trace = await client.traces.start({
        name: "node-sdk/calls",
        input: "example input",
    });

    const { message, span_id } = await client.call({
        name: "node-sdk/call/basic",
        input: "what is the capital of sweden",
        parent_span_uuid: trace.uuid,
    });

    console.log("String response: ", message);

    // Save a metric for the above call
    await client.spans.saveMetric(span_id, {
        dimension: "accuracy",
        score: 0.95,
        comment: "The answer is correct",
    });

    await trace.end({
        output: "example output",
    });

    const { json_payload } = await client.call({
        parent_span_uuid: trace.uuid,
        name: "node-sdk/call/weather",
        instructions: "Extract temperature, location and wind speed.",
        input: "In London its cloudy skies early, followed by partial clearing. Cooler. High 13C. Winds ENE at 15 to 20 km/h.",
        output_schema: {
            $schema: "https://json-schema.org/draft/2020-12/schema",
            type: "object",
            properties: {
                temperature: {
                    description: "The temperature in Celsius",
                    type: "number",
                },
                location: {
                    description: "The location",
                    type: "string",
                },
                wind_speed: {
                    description: "The max wind speed in km/h",
                    type: "number",
                },
            },
        },
    });

    console.log("JSON response: ", json_payload);

    await trace.end({
        output: "example output",
    });
})();
