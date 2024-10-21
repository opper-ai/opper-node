# Opper Node SDK

This is the official Node.js SDK for Opper AI. It provides a simple and powerful interface to interact with Opper's AI services, including function calls, indexing, and tracing.

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [Features](#features)
    - [Function Calls](#function-calls)
    - [Streaming Responses](#streaming-responses)
    - [Indexes](#indexes)
    - [Tracing](#tracing)
    - [Multimodal Inputs](#multimodal-inputs)
    - [Image Generation](#image-generation)
4. [Advanced Usage](#advanced-usage)
    - [Structured Output with `fn` Helper](#structured-output-with-fn-helper)
5. [API Reference](#api-reference)
6. [Examples](#examples)
7. [License](#license)

## Installation

Install the Opper Node SDK using npm:

```bash
npm install opperai
```

## Basic Usage

```typescript
import Client from "opperai";
// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

async function main() {
    const { message } = await client.call({
        input: "Hello, world!",
    });

    console.log(message);
}
main();
```

## Features

### Function Calls

Use the `call` method to send messages to Opper AI and receive responses see [example-calls.ts](./examples/example-calls.ts) for more examples:

```typescript
const { message } = await client.call({
    name: "your/function/name",
    instructions: "An example message",
});

console.log(message);
```

### Streaming Responses

For long-running functions, you can stream the response. For an example on how to stream using express see [example-stream-express.ts](./examples/example-stream-express.ts) and for an example on how to stream using Next.js see [example-stream-nextjs.ts](./examples/example-stream-nextjs.ts).

```typescript
const stream = await client.call({
    name: "your/function/name",
    instructions: "An example message",
    stream: true,
});
// Process the stream as needed
```

### Indexes

Efficiently store and query documents using Opper's indexing feature:

```typescript
// Create or get an index
let index = await client.indexes.get("support-tickets");
if (!index) {
    index = await client.indexes.create("support-tickets");
}

// Add documents
await index.add({
    content: "Slow response time. The response time for queries is too slow",
    metadata: {
        status: "open",
        id: "1",
    },
});

// Query the index
const results = await index.query({
    query: "Issue with slow response time",
    k: 1,
});
console.log(results[0].content);
```

### Tracing

Track and analyze your AI operations with Opper's tracing feature:

```typescript
const trace = await client.traces.start({
    name: "example-trace",
    input: "example input",
});

// Perform operations...
await trace.end({
    output: "example output",
});
```

### Multimodal Inputs

Handle various input types, including images and audio. See [example-calls-multimodal.ts](./examples/example-calls-multimodal.ts) for more examples:

```typescript
const image = new OpperMediaHandler("path/to/image.png");
const audio = new OpperMediaHandler("path/to/audio.mp3");

const { message: image_description } = await client.call({
    name: "describe-image",
    instructions: "Create a short description of the image",
    input: image.getInput(),
    model: "openai/gpt-4o",
});

const { message: audio_transcription } = await client.call({
    name: "transcribe-audio",
    instructions: "Given an audio file, return the transcription of the audio",
    input: audio.getInput(),
    model: "gcp/gemini-1.5-flash-eu",
});
```

### Image Generation

Generate images using Opper's AI models:

```typescript
const generatedImage = await client.generateImage({
    prompt: "Create an image of a cat",
});
// Save or process the generated image
```

## Advanced Usage

### Structured Output with `fn` Helper

Use the `fn` helper to create type-safe function calls with structured input and output. See the example folder for a full example of how to use the `fn` helper. We have supplied fn decorators for both [zod](./examples/zod-fn-decorator.ts) and [typebox](./examples/typebox-fn-decorator.ts):

```typescript
import { z } from "zod";
// Copy the zod-fn-decorator.ts file from the examples directory into your project
import fn from "./zod-fn-decorator";

const TranslationSchema = z.object({
    translation: z.string(),
    sentiment: z.string(),
});
const translate = fn(
    {
        name: "translate",
        instructions: "Translate the input text and analyze sentiment",
    },
    z.object({ text: z.string(), language: z.string() }),
    TranslationSchema
);

const result = await translate({ text: "Hello, world!", language: "French" });

console.log(result);
```

## API Reference

For detailed API documentation, please refer to the [official Opper AI documentation](https://docs.opper.ai).

## Examples

The SDK includes several examples demonstrating various features:

-   Basic function calls: `examples/example-calls.ts`
-   Multimodal inputs: `examples/example-calls-multimodal.ts`
-   Indexing: `examples/example-indexes.ts`
-   Manual tracing: `examples/example-tracing-manual.ts`
-   Structured output with Zod: `examples/example-zod-fn.ts`
-   Structured output with TypeBox: `examples/example-typebox-fn.ts`

To run an example:

```bash
npx ts-node ./examples/example-name.ts
```
