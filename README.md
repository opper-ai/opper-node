# Opper Node SDK

This is the official Node.js SDK for Opper AI. It provides a simple and powerful interface to interact with Opper's AI services, including function calls, indexing, and tracing.

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [Features](#features)
    - [Function Calls](#function-calls)
    - [Structured Output](#structured-output)
    - [Streaming Responses](#streaming-responses)
    - [Indexes](#indexes)
    - [Tracing](#tracing)
    - [Datasets](#datasets)
    - [Evaluations](#evaluations)
    - [Multimodal Inputs](#multimodal-inputs)
    - [PDF Processing](#pdf-processing)
    - [Image Generation](#image-generation)
    - [Embeddings](#embeddings)
4. [Advanced Usage](#advanced-usage)
    - [Structured Output with `fn` Helper](#structured-output-with-fn-helper)
    - [OpenAI](#openai)
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

### Structured Output

The `call` method can be passed an `input_schema` and an `output_schema` to return structured output. See [example-calls.ts](./examples/example-calls.ts) for more examples or [Structured Output with `fn` Helper](#structured-output-with-fn-helper) for a more type-safe approach:

```typescript
const { json_payload } = await client.call({
    name: "your/function/name",
    instructions: "Extract temperature, location and wind speed.",
    input: "In London its cloudy skies early, followed by partial clearing. Cooler. High 13C. Winds ENE at 15 to 20 km/h.",
    output_schema: {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        type: "object",
        properties: {
            temperature: {
                description: "The temperature in Celsius",
                type: "number",
            },
            location: {
                description: "The location",
                type: "string",
            },
            wind_speed: {
                description: "The max wind speed in km/h",
                type: "number",
            },
        },
        required: ["temperature", "location", "wind_speed"],
    },
});
console.log("JSON response: ", json_payload);
```

### Streaming Responses

For long-running functions, you can stream the response by adding `stream: true,` to a function call. This will return a `ReadableStream` which can be processed as needed:

```typescript
const stream = await client.call({
    name: "your/function/name",
    instructions: "An example message",
    stream: true,
});
// Process the stream as needed
```

For examples on how to use streaming with web frameworks:

-   Express: see [example-stream-express.ts](./examples/example-stream-express.ts)
-   Next.js: see [example-stream-nextjs.ts](./examples/example-stream-nextjs.ts)

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

Manually create a child span for a given parent trace/span:

```typescript
const manualSpan = await client.traces.startSpan({
    parent_uuid: trace.uuid,
    name: "example-span",
    input: "example input",
});

await manualSpan.end({
    output: "example output",
});
```

See [example-tracing-manual.ts](./examples/example-tracing-manual.ts) for a full example of how to manually create spans including saving metrics and examples.

### Datasets

See [example-datasets.ts](./examples/example-datasets.ts):

```typescript
// Get the dataset for a given function by name or uuid
const dataset = await client.functions.dataset({ name: "node-sdk/datasets" });

// Add an entry to the dataset
const entry = await dataset.add({
    input: "Hello, world!",
    output: "Hello, world!",
    expected: "Hello, world!",
});
```

### Evaluations

Evaluate the quality and performance of model outputs using custom evaluators:

```typescript
import { evaluator } from "opperai";

// Create an evaluator for checking line count
const lineCountEvaluator = evaluator(
    (result: string, minLines = 10, maxLines = 20) => {
        // Count non-empty lines
        const lines = result
            .trim()
            .split("\n")
            .filter(line => line.trim().length > 0);
        const lineCount = lines.length;

        // Calculate score (0-1)
        let score: number;
        if (lineCount < minLines) {
            score = lineCount / minLines;
        } else if (lineCount > maxLines) {
            const excess = lineCount - maxLines;
            score = Math.max(0, 1 - (excess / maxLines));
        } else {
            score = 1.0;
        }

        return [
            {
                dimension: "line_count.score",
                value: score,
                comment: "Line count score",
            },
            {
                dimension: "line_count.count",
                value: Math.min(1.0, lineCount / maxLines),
                comment: `Found ${lineCount} lines`,
            },
        ];
    }
);

// Use the evaluator on a model response
const { message, span_id } = await client.call({
    name: "content_generation",
    input: "Write a short paragraph about AI",
});

// Run evaluation
const evaluation = await client.evaluate({
    span_id,
    evaluators: [
        lineCountEvaluator(message, 4, 10),
    ],
});

// View evaluation results
console.log(evaluation.metrics);
```

See [example-evaluations.ts](./examples/example-evaluations.ts) for a complete example including evaluators that use an LLM call for assessment.

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

### PDF Processing

Process PDF files using the OpperMediaHandler class:

```typescript
import { OpperMediaHandler } from "opperai";

// Create a handler for the PDF file
const pdf = new OpperMediaHandler("path/to/your.pdf");

// Use it in a function call
const result = await client.call({
  name: "pdf_to_markdown",
  model: "gcp/gemini-2.0-flash",
  instructions: "Extract text content from this PDF document",
  input: pdf.getInput()
});

console.log(result.message);
```

See the [PDF example](examples/example-pdf.ts) for a complete implementation of PDF to markdown conversion.

### Image Generation

Generate images using Opper's AI models:

```typescript
const generatedImage = await client.generateImage({
    prompt: "Create an image of a cat",
});
// Save or process the generated image
```

### Embeddings

Create vector embeddings for text using Opper's embedding models:

```typescript
// Create embeddings for a single string
const singleEmbedding = await client.createEmbedding({
    model: "text-embedding-3-small",
    input: "This is a sample text to embed"
});

console.log(`Created ${singleEmbedding.data[0].embedding.length}-dimensional embedding`);
console.log(`Used ${singleEmbedding.usage.prompt_tokens} tokens`);

// Create embeddings for multiple strings in a single request
const batchEmbeddings = await client.createEmbedding({
    input: [
        "First text to embed",
        "Second text to embed",
        "Third text to embed"
    ]
});

console.log(`Created ${batchEmbeddings.data.length} embeddings`);
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

### OpenAI

The Opper OpenAI compatibility layer allows you to use Opper models with the OpenAI API and SDKs. This gives you the ability to use any model provided by Opper in any project that uses the OpenAI API/SDKs.

See [example-openai.ts](./examples/example-openai.ts) for an example of how to use the OpenAI compatibility layer.

## API Reference

For detailed API documentation, please refer to the [official Opper AI documentation](https://docs.opper.ai).

## Examples

The SDK includes several examples demonstrating various features:

-   Basic function calls: `examples/example-calls.ts`
-   Multimodal inputs: `examples/example-calls-multimodal.ts`
-   Indexing: `examples/example-indexes.ts`
-   Manual tracing: `examples/example-tracing-manual.ts`
-   Evaluations: `examples/example-evaluations.ts`
-   Embeddings: `examples/example-embeddings.ts`
-   Structured output with Zod: `examples/example-zod-fn.ts`
-   Structured output with TypeBox: `examples/example-typebox-fn.ts`

To run an example:

```bash
npx ts-node ./examples/example-name.ts
```