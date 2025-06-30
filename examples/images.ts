// Run example with "npx tsx examples/images.ts"
import "dotenv/config";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Opper } from "../src";
import { OpperMediaHandler } from "./fixtures/media-handler.js";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

const DescriptionSchema = z.object({
    observations: z.array(z.string()).describe("The observations of the image"),
    originalDescription: z
        .string()
        .describe("The original description of the image"),
    improvedDescription: z
        .string()
        .describe("The improved description of the image"),
});

async function generateImage(description: string): Promise<string> {
    const response = await opper.call({
        name: "typescript/sdk/generate-image",
        input: description,
        model: "openai/gpt-image-1",
    });

    if (!response.images || response.images.length === 0) {
        throw new Error("No images generated");
    }

    return response.images[0];
}

async function describeImage(mediaInput: string, proposedDescription: string) {
    const response = await opper.call({
        name: "typescript/sdk/describe-image",
        instructions:
            "given an image and a description of the image, improve the description, make sure the description is a list of observations of the image and that the description matches the content of the image",
        outputSchema: zodToJsonSchema(DescriptionSchema),
        input: {
            _opper_media_input: mediaInput, // this field name is required by opper
            proposed_description: proposedDescription,
        },
        model: "openai/gpt-4o",
    });
    return response;
}

(async () => {
    console.log("Running image capabilities examples...");

    // Generate an image
    const description =
        "a cat with a hat and a hat on the cat and a hat on the cat";
    console.log(`Generating image with description: ${description}`);

    const generatedImageStr = await generateImage(description);
    const imagePath = OpperMediaHandler.saveBase64ToFile(generatedImageStr);
    console.log(`Generated image saved to: ${imagePath}`);

    // Describe the generated image
    const mediaInput = `data:image/png;base64,${generatedImageStr}`;
    const proposedDescription = "a cat with a hat";

    console.log(
        `Describing image with proposed description: ${proposedDescription}`
    );
    const result = await describeImage(mediaInput, proposedDescription);
    console.log("Image description result:");
    console.log(JSON.stringify(result.jsonPayload, null, 2));
})();
