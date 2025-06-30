// Run example with "npx tsx examples/audio.ts"
import "dotenv/config";
import { Opper } from "../src";
import { OpperMediaHandler } from "./fixtures/media-handler.js";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

async function transcribeAudio(audioPath: string): Promise<string> {
    const mediaHandler = new OpperMediaHandler(audioPath);
    const mediaInput = mediaHandler.getInput();

    const response = await opper.call({
        name: "typescript/sdk/transcribe-audio",
        instructions:
            "given an audio file, return the transcription of the audio",
        input: mediaInput,
        model: "gcp/gemini-2.5-pro",
    });

    return response.message || "";
}

(async () => {
    console.log("Running audio transcription example...");

    // Use the sentence.mp3 file from fixtures
    const audioPath = "sentence.mp3";
    console.log(`Transcribing audio file: ${audioPath}`);

    try {
        const transcription = await transcribeAudio(audioPath);
        console.log("Transcription result:");
        console.log(transcription);
    } catch (error) {
        console.error("Error transcribing audio:", error);
    }
})();
