// Run example with "npx ts-node ./examples/calls.ts"
import "dotenv/config";

import Client from "../src";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    const { json_payload } = await client.call({
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

    console.log(json_payload);
})();
