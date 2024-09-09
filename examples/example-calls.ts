// Run example with "npx ts-node ./examples/example-calls.ts"
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
            required: ["temperature", "location", "wind_speed"],
        },
    });
    console.log("JSON response: ", json_payload);

    const { json_payload: weekday } = await client.call({
        parent_span_uuid: trace.uuid,
        name: "node-sdk/call/weekday-with-examples",
        examples: [
            {
                input: "Today is Monday",
                output: { day: "Monday" },
            },
            {
                input: "Friday is the best day of the week",
                output: { day: "Friday" },
            },
            {
                input: "Saturday is the second best day of the week",
                output: { day: "Saturday" },
            },
        ],
        input: "Wonder what day it is on Sunday",
        output_schema: {
            $schema: "https://json-schema.org/draft/2020-12/schema",
            type: "object",
            properties: {
                day: {
                    type: "string",
                    description: "The day of the week mentioned in the text",
                },
            },
            required: ["day"],
        },
    });
    console.log("JSON response with examples: ", weekday);

    const { json_payload: strawberry } = await client.call({
        parent_span_uuid: trace.uuid,
        name: "node-sdk/call/character-count-fewshot",
        examples: [
            {
                input: "runner",
                output: {
                    thoughts:
                        "I need to count the number of times the character r exists in the word runner. I will go through each character: r, yes. u, no. n, no. n, no. e, no. r, yes. There are 2 occurences of the letter r in runner.",
                    reflection:
                        "I seem to have made no mistake. In the breakdown I can see that there are two occurences of the letter r",
                    count: 2,
                },
            },
        ],
        input: "Strawberry",
        output_schema: {
            $schema: "https://json-schema.org/draft/2020-12/schema",
            type: "object",
            properties: {
                thoughts: {
                    type: "string",
                },
                reflection: {
                    type: "string",
                },
                count: {
                    type: "number",
                    description:
                        "Carefully count the numbers of times the letter `r` exists in the supplied word",
                },
            },
            required: ["thoughts", "reflection", "count"],
        },
    });
    console.log("JSON response with thoughts and reflection: ", strawberry);

    await trace.end({
        output: "example output",
    });
})();
