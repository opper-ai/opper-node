# Opper SDK

## Overview

### Available Operations

* [call](#call) - Function Call
* [stream](#stream) - Function Stream

## call

The Call endpoint is a simple interface to issue a task to an LLM.
It is a declarative interface with input and output schemas that supports text, image, audio inputs and outputs and is highly model agnostic.

### Example Usage

<!-- UsageSnippet language="typescript" operationID="function_call_call_post" method="post" path="/call" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.call({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
    configuration: {},
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { call } from "opperai/funcs/call.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await call(opper, {
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
    configuration: {},
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("call failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.AppApiPublicV2FunctionCallCallFunctionRequest](../../models/appapipublicv2functioncallcallfunctionrequest.md)                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.AppApiPublicV2FunctionCallCallFunctionResponse](../../models/appapipublicv2functioncallcallfunctionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## stream

Stream a function call execution in real-time using Server-Sent Events (SSE).

This endpoint provides continuous streaming of function execution results, supporting both
unstructured text streaming and structured JSON streaming with precise field tracking.

## Streaming Modes

**Text Mode (no output_schema):**
- Streams incremental text content via the `delta` field
- `chunk_type` will be "text"
- Best for conversational AI, creative writing, open-ended responses

**Structured Mode (with output_schema):**
- Streams structured JSON with precise field tracking via `json_path`
- `chunk_type` will be "json"
- Enables real-time UI updates by showing which schema field is being populated
- Perfect for forms, dashboards, structured data display

## JSON Path Feature

When using `output_schema`, each streaming chunk includes a `json_path` field showing exactly
which field in your schema is being populated:

- `response.summary` → Top-level string field
- `response.people[0].name` → Name of first person in array
- `response.people[1].role` → Role of second person
- `response.metadata.created_at` → Nested object field

This enables precise UI updates where you can route streaming content to specific components
based on the path, creating responsive real-time interfaces.

## Response Structure

Each Server-Sent Event contains:
- `id`: Optional event identifier
- `event`: Optional event type (typically "message")
- `data`: StreamingChunk with the actual streaming content
- `retry`: Optional retry interval for reconnection

The StreamingChunk data payload varies by mode:

**Text Mode:**
- `delta`: Incremental text content
- `span_id`: Execution span ID (first chunk)
- `chunk_type`: "text"

**Structured Mode:**
- `delta`: Actual field values being streamed
- `json_path`: Dot-notation path to current field
- `span_id`: Execution span ID (first chunk)
- `chunk_type`: "json"

## Examples

Text streaming events:
```
data: {"span_id": "123e4567-e89b-12d3-a456-426614174000"}
data: {"delta": "Hello", "chunk_type": "text"}
data: {"delta": " world", "chunk_type": "text"}
```

Structured streaming events:
```
data: {"span_id": "123e4567-e89b-12d3-a456-426614174000"}
data: {"delta": "John", "json_path": "response.name", "chunk_type": "json"}
data: {"delta": " Doe", "json_path": "response.name", "chunk_type": "json"}
data: {"delta": "Engineer", "json_path": "response.role", "chunk_type": "json"}
```

### Example Usage

<!-- UsageSnippet language="typescript" operationID="function_stream_call_stream_post" method="post" path="/call/stream" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.stream({
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
  });

  for await (const event of result) {
    console.log(event);
  }
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { stream } from "opperai/funcs/stream.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await stream(opper, {
    name: "add_numbers",
    instructions: "Calculate the sum of two numbers",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    parentSpanId: "123e4567-e89b-12d3-a456-426614174000",
    tags: {
      "project": "project_456",
      "user": "company_123",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const event of result) {
    console.log(event);
  }
  } else {
    console.log("stream failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.AppApiPublicV2FunctionCallCallFunctionRequest](../../models/appapipublicv2functioncallcallfunctionrequest.md)                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.FunctionStreamCallStreamPostResponse](../../models/operations/functionstreamcallstreampostresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |