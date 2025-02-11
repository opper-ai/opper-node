// Run example with "npx ts-node ./examples/example-openai.ts"
import "dotenv/config";
import { OpenAI } from "openai";
import Client from "../src";

const opper = new Client();

const client = new OpenAI({
    baseURL: "https://api.opper.ai/compat/openai",
    apiKey: process.env.OPPER_API_KEY,
    defaultHeaders: { "x-opper-api-key": process.env.OPPER_API_KEY },
});

async function main() {
    const trace = await opper.traces.start({
        name: "node-sdk/using-the-openai-sdk",
        input: "What is the capital of France? Please reverse the name before answering.",
    });

    const completion = await client.chat.completions.create({
        model: "openai/gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: "What is the capital of France? Please reverse the name before answering.",
            },
        ],

        // @ts-expect-error These are Opper specific params.
        // fallback_models: ["openai/gpt-4o-mini"],
        span_uuid: trace.uuid.toString(),
        // evaluate: false,
    });

    await trace.end({ output: { foo: completion.choices[0].message.content } });
}

main();
