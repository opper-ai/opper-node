#!/usr/bin/env tsx
/**
 * Basic SDK sanity tests - verifies core SDK functionality works.
 * Run with: npx tsx test-basic.ts
 */

import { Opper } from "./src/index.js";

const OPPER_API_KEY = process.env.OPPER_API_KEY || process.env.OPPER_HTTP_BEARER;
const OPPER_SERVER_URL = process.env.OPPER_SERVER_URL || "https://api.opper.ai/v2";

if (!OPPER_API_KEY) {
  console.error("Error: OPPER_API_KEY or OPPER_HTTP_BEARER environment variable required");
  process.exit(1);
}

const opper = new Opper({
  serverURL: OPPER_SERVER_URL,
  httpBearer: OPPER_API_KEY,
});

let passed = 0;
let failed = 0;

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`  PASS  ${name}`);
    passed++;
  } catch (error) {
    console.log(`  FAIL  ${name}`);
    console.log(`        ${error instanceof Error ? error.message : error}`);
    failed++;
  }
}

console.log("\nOpper SDK Basic Tests\n");

// Test 1: Basic call
await test("opper.call() - basic function call", async () => {
  const result = await opper.call({
    name: "test_basic_call",
    instructions: "Return the number 42",
    input: { request: "give me 42" },
  });
  if (!result.message) throw new Error("No message in response");
});

// Test 2: Streaming
await test("opper.stream() - streaming call", async () => {
  const result = await opper.stream({
    name: "test_stream",
    instructions: "Say hello",
    input: { greeting: "hi" },
  });
  if (!result.result) throw new Error("No result stream");
});

// Test 3: List functions
await test("functions.list() - list functions", async () => {
  const result = await opper.functions.list();
  if (!Array.isArray(result.data)) throw new Error("Expected data array");
});

// Test 4: List knowledge bases
await test("knowledge.list() - list knowledge bases", async () => {
  const result = await opper.knowledge.list();
  if (!Array.isArray(result.data)) throw new Error("Expected data array");
});

// Test 5: List language models
await test("languageModels.list() - list models", async () => {
  const result = await opper.languageModels.list();
  if (!Array.isArray(result.data)) throw new Error("Expected data array");
});

// Test 6: List traces
await test("traces.list() - list traces", async () => {
  const result = await opper.traces.list();
  if (!Array.isArray(result.data)) throw new Error("Expected data array");
});

// Test 7: Embeddings
await test("embeddings.create() - create embedding", async () => {
  const result = await opper.embeddings.create({
    input: "test embedding",
    model: "azure/text-embedding-3-large",
  });
  if (!result.data?.[0]?.embedding?.length) throw new Error("No embedding data");
});

console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
