# Opper SDK

## Overview

### Available Operations

* [call](#call) - Function Call
* [stream](#stream) - Function Stream

## call

The Call endpoint is a simple interface to issue a task to an LLM.
It is a declarative interface with input and output schemas that supports text, image, audio inputs and outputs and is highly model agnostic.

### Example Usage

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

This endpoint returns a continuous stream of ServerSentEvent objects as the function executes,
allowing for real-time streaming of responses. The response follows the Server-Sent Events
specification with proper event structure for SDK compatibility.

Each ServerSentEvent contains:
- `id`: Optional event identifier
- `event`: Optional event type
- `data`: StreamingChunk with actual content
- `retry`: Optional retry interval

The StreamingChunk data payload includes:
- `delta`: Incremental text content (if any)
- `span_id`: Unique identifier for the execution span (when available)

Note: When streaming is enabled, any output_schema will be ignored as structured output
cannot be streamed. The response will be unstructured text content.

### Example Usage

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
    // Handle the event
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
    // Handle the event
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