// Run example with "npx tsx examples/embeddings.ts"
import "dotenv/config";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

(async () => {
    // Example 1: Generate embeddings for a single string
    console.log("Example 1: Single text input");
    const response = await opper.embeddings.create({
        model: { name: "openai/text-embedding-3-large" },
        input: "Hello, world!",
    });

    // Print the embedding vector for the input
    console.log(`Model used: ${response.model}`);
    console.log(`Embedding dimension: ${response.data[0]["embedding"].length}`);
    console.log(
        `First few values: ${response.data[0]["embedding"].slice(0, 5)}`
    );
    console.log(`Usage: ${JSON.stringify(response.usage)}`);

    // Example 2: Generate embeddings for multiple strings (batch processing)
    console.log("\nExample 2: List of texts input");
    const batchResponse = await opper.embeddings.create({
        model: { name: "openai/text-embedding-3-large" },
        input: [
            "Hello, world!",
            "How are you?",
            "Machine learning is fascinating.",
        ],
    });

    // Print the embedding vectors information
    console.log(`Number of embeddings: ${batchResponse.data.length}`);
    for (let i = 0; i < batchResponse.data.length; i++) {
        const embeddingData = batchResponse.data[i];
        console.log(
            `Embedding ${i + 1} dimension: ${embeddingData["embedding"].length}`
        );
    }

    // Print total token usage
    console.log(`Total token usage: ${JSON.stringify(batchResponse.usage)}`);
})();
