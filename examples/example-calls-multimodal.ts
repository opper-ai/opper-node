// Run example with "npx ts-node ./examples/example-calls.ts"
import "dotenv/config";

import Client from "../src";
import { image } from "../src/utils";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    const input = {
        image: image("examples/cat.png"),
    };
    
    const trace = await client.traces.start({
        name: "node-sdk/calls/multimodal",
        input: input,
    });

    const { message } = await client.call({
        parent_span_uuid: trace.uuid,
        name: "node-sdk/call/multimodal/image-input",
        instructions: "Create a short description of the image",
        input: input,
        model: "openai/gpt-4o",
    });
    console.log("description: ", message);

    await trace.end({
        output: message,
    });
})();
