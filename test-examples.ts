#!/usr/bin/env tsx

import { Opper } from "./src/index.js";

// Configuration - you can set these environment variables or modify them here
const OPPER_API_KEY = process.env.OPPER_API_KEY || process.env.OPPER_HTTP_BEARER || "op-4UO3MLQJ59M8W27EP108";
const OPPER_SERVER_URL = process.env.OPPER_SERVER_URL || "https://api.opper.ai/v2";

const opper = new Opper({
  serverURL: OPPER_SERVER_URL,
  httpBearer: OPPER_API_KEY,
});

// Create embedding for a single text
const singleEmbedding = await opper.embeddings.create({
  input: "The quick brown fox jumps over the lazy dog",
  model: "text-embedding-3-large"
});

console.log(`Model: ${singleEmbedding.model}`);
console.log(`Embedding dimensions: ${singleEmbedding.data[0].embedding.length}`);
console.log(`Usage:`, singleEmbedding.usage);

// Create embeddings for multiple texts
const multipleEmbeddings = await opper.embeddings.create({
  input: [
    "What is machine learning?",
    "How do neural networks work?",
    "Explain artificial intelligence"
  ]
});

console.log(`\nCreated ${multipleEmbeddings.data.length} embeddings`);
multipleEmbeddings.data.forEach((embeddingData, i) => {
  console.log(`Embedding ${i}: ${embeddingData.embedding.length} dimensions`);
}); 