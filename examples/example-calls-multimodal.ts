// Run example with "npx ts-node ./examples/example-calls-multimodal.ts"
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import Client from "../src";
import { OpperMediaHandler } from "../src/utils";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    const trace = await client.traces.start({
        name: "node-sdk/calls/multimodal",
        input: {
            image: "examples/fixtures/cat.png",
            audio: "examples/fixtures/sentence.mp3",
        },
    });

    const image = new OpperMediaHandler("examples/fixtures/cat.png");
    const audio = new OpperMediaHandler("examples/fixtures/sentence.mp3");

    const { message: image_description } = await client.call({
        parent_span_uuid: trace.uuid,
        name: "node-sdk/call/multimodal/image-input",
        instructions: "Create a short description of the image",
        input: image.getInput(),
        model: "openai/gpt-4o",
    });
    console.log("image_description: ", image_description);

    const { message: audio_description } = await client.call({
        parent_span_uuid: trace.uuid,
        name: "node-sdk/call/multimodal/transcribe-audio",
        instructions: "Given an audio file, return the transcription of the audio",
        input: audio.getInput(),
        model: "gcp/gemini-1.5-flash-eu",
    });
    console.log("audio_description: ", audio_description);

    const cat = await client.generateImage({
        parent_span_uuid: trace.uuid,
        prompt: "Create an image of a cat",
    });

    // Create a temporary file path
    const tempFilePath = path.join(os.tmpdir(), "generated_cat_image.png");

    // Write the image bytes to the temporary file
    fs.writeFileSync(tempFilePath, cat.bytes);

    console.log(`image written to temporary file: ${tempFilePath}`);

    await trace.end({
        output: {
            audio_description,
            image_description,
            image_generated: tempFilePath,
        },
    });
})();
