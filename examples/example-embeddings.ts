import Client from "../src/index";
import * as fs from "fs/promises";

// Initialize the client
// API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

async function run() {
    console.log("Example: Creating embeddings with Opper API");
    console.log("-------------------------------------------");

    // Example 1: Create embedding for a single text input
    console.log("\n1. Creating embedding for a single text input:");
    const singleEmbedding = await client.createEmbedding({
        model: "openai/text-embedding-3-large", // Model parameter is required
        input: "The quick brown fox jumps over the lazy dog"
    });

    console.log(`  - Created a ${singleEmbedding.data[0].embedding.length}-dimensional embedding`);
    console.log(`  - Used ${singleEmbedding.usage.prompt_tokens} tokens`);

    // Example 2: Create embeddings for multiple text inputs
    console.log("\n2. Creating embeddings for multiple text inputs:");
    const batchEmbeddings = await client.createEmbedding({
        model: "openai/text-embedding-3-large", // Model parameter is required
        input: [
            "Artificial intelligence is transforming industries",
            "Machine learning models continue to improve",
            "Natural language processing enables better communication"
        ]
    });

    console.log(`  - Created ${batchEmbeddings.data.length} embeddings`);
    console.log(`  - Each embedding is ${batchEmbeddings.data[0].embedding.length}-dimensional`);
    console.log(`  - Used ${batchEmbeddings.usage.prompt_tokens} tokens in total`);

    // Example 3: Save embeddings to file for later use
    console.log("\n3. Saving embeddings to file for later use:");
    const embeddingsData = {
        embeddings: batchEmbeddings.data.map(d => d.embedding),
        texts: [
            "Artificial intelligence is transforming industries",
            "Machine learning models continue to improve",
            "Natural language processing enables better communication"
        ]
    };
    
    await fs.writeFile('embeddings-output.json', JSON.stringify(embeddingsData, null, 2));
    console.log(`  - Saved embeddings to 'embeddings-output.json'`);
}

run().catch(error => {
    console.error("Error:", error);
    process.exit(1);
}); 