# Functions
(*functions*)

## Overview

### Available Operations

* [create](#create) - Create Function
* [list](#list) - List Functions
* [get](#get) - Get Function
* [update](#update) - Update Function
* [delete](#delete) - Delete Function
* [getByName](#getbyname) - Get Function By Name
* [getByRevision](#getbyrevision) - Get Function By Revision
* [call](#call) - Call Function
* [stream](#stream) - Stream Function
* [callRevision](#callrevision) - Call Function Revision
* [streamRevision](#streamrevision) - Stream Function Revision

## create

Create a function

### Example Usage

<!-- UsageSnippet language="typescript" operationID="create_function_functions_post" method="post" path="/functions" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.create({
    name: "my-function",
    description: "This function is used to add two numbers and return the result.",
    instructions: "You are a calculator that adds two numbers and returns the result.",
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
    configuration: {
      betaEvaluation: {
        scorers: "base",
      },
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsCreate } from "opperai/funcs/functionsCreate.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsCreate(opper, {
    name: "my-function",
    description: "This function is used to add two numbers and return the result.",
    instructions: "You are a calculator that adds two numbers and returns the result.",
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
    configuration: {
      betaEvaluation: {
        scorers: "base",
      },
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsCreate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [models.CreateFunctionRequest](../../models/createfunctionrequest.md)                                                                                                          | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.CreateFunctionResponse](../../models/createfunctionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.ConflictError          | 409                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## list

List existing functions with the most recent revision in the current project

### Example Usage

<!-- UsageSnippet language="typescript" operationID="list_functions_functions_get" method="get" path="/functions" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.list("my-function", "name");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsList } from "opperai/funcs/functionsList.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsList(opper, "my-function", "name");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    | Example                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                                                                                                                                                                         | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | Filter functions by name                                                                                                                                                       | [object Object]                                                                                                                                                                |
| `sort`                                                                                                                                                                         | *string*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | Sort the functions by name or created_at, use '-' to sort in descending order                                                                                                  | [object Object]                                                                                                                                                                |
| `offset`                                                                                                                                                                       | *number*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | The offset of the page of functions to return when paginating                                                                                                                  |                                                                                                                                                                                |
| `limit`                                                                                                                                                                        | *number*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | The number of functions to return per page when paginating                                                                                                                     |                                                                                                                                                                                |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |                                                                                                                                                                                |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |                                                                                                                                                                                |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |                                                                                                                                                                                |

### Response

**Promise\<[models.PaginatedResponseListFunctionsResponseItem](../../models/paginatedresponselistfunctionsresponseitem.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## get

Get the latest revision of a function by ID

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_function_functions__function_id__get" method="get" path="/functions/{function_id}" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.get("42016421-16e8-4b50-a2d1-30fc3894763b");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsGet } from "opperai/funcs/functionsGet.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsGet(opper, "42016421-16e8-4b50-a2d1-30fc3894763b");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the function to retrieve                                                                                                                                             |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.GetFunctionResponse](../../models/getfunctionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## update

Update a function, this will create a new revision of the function

### Example Usage

<!-- UsageSnippet language="typescript" operationID="update_function_functions__function_id__patch" method="patch" path="/functions/{function_id}" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.update("b0f067f3-9aa2-4ce2-aad5-c9832fbf4fa4", {
    name: "my-function",
    description: "This function is used to add two numbers and return the result.",
    instructions: "You are a calculator that adds two numbers and returns the result.",
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
    configuration: {
      "beta.evaluation": {
        "enabled": true,
        "scorers": "base",
      },
      "beta.invocation.input_validation.enabled": false,
      "beta.invocation.xml_mode.enabled": false,
      "invocation.cache.ttl": 0,
      "invocation.few_shot.count": 0,
      "invocation.structured_generation.max_attempts": 5,
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsUpdate } from "opperai/funcs/functionsUpdate.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsUpdate(opper, "b0f067f3-9aa2-4ce2-aad5-c9832fbf4fa4", {
    name: "my-function",
    description: "This function is used to add two numbers and return the result.",
    instructions: "You are a calculator that adds two numbers and returns the result.",
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
    configuration: {
      "beta.evaluation": {
        "enabled": true,
        "scorers": "base",
      },
      "beta.invocation.input_validation.enabled": false,
      "beta.invocation.xml_mode.enabled": false,
      "invocation.cache.ttl": 0,
      "invocation.few_shot.count": 0,
      "invocation.structured_generation.max_attempts": 5,
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsUpdate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Unique identifier of the function given as a UUID                                                                                                                              |
| `updateFunctionRequest`                                                                                                                                                        | [models.UpdateFunctionRequest](../../models/updatefunctionrequest.md)                                                                                                          | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.UpdateFunctionResponse](../../models/updatefunctionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## delete

Delete a function by ID

### Example Usage

<!-- UsageSnippet language="typescript" operationID="delete_function_functions__function_id__delete" method="delete" path="/functions/{function_id}" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  await opper.functions.delete("0a7a3f2e-ed2e-4c65-9f21-3d4ef7b6b17b");


}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsDelete } from "opperai/funcs/functionsDelete.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsDelete(opper, "0a7a3f2e-ed2e-4c65-9f21-3d4ef7b6b17b");
  if (res.ok) {
    const { value: result } = res;
    
  } else {
    console.log("functionsDelete failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | Unique identifier of the function given as a UUID                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<void\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## getByName

Get the latest revision of a function by name

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_function_by_name_functions_by_name__name__get" method="get" path="/functions/by-name/{name}" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.getByName("<value>");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsGetByName } from "opperai/funcs/functionsGetByName.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsGetByName(opper, "<value>");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsGetByName failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                                                                                                                                                                         | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The name of the function to retrieve                                                                                                                                           |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.GetFunctionResponse](../../models/getfunctionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## getByRevision

Get a function by ID with a specific revision

### Example Usage

<!-- UsageSnippet language="typescript" operationID="get_function_by_revision_functions__function_id__revisions__revision_id__get" method="get" path="/functions/{function_id}/revisions/{revision_id}" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.getByRevision("5265325e-3604-40a9-a29d-2cc303395dab", "e60c7090-8545-4e1f-84d5-0d9e4be6c0d1");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsGetByRevision } from "opperai/funcs/functionsGetByRevision.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsGetByRevision(opper, "5265325e-3604-40a9-a29d-2cc303395dab", "e60c7090-8545-4e1f-84d5-0d9e4be6c0d1");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsGetByRevision failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the function to retrieve                                                                                                                                             |
| `revisionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the revision to retrieve                                                                                                                                             |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.GetFunctionResponse](../../models/getfunctionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## call

Call a function

### Example Usage

<!-- UsageSnippet language="typescript" operationID="call_function_functions__function_id__call_post" method="post" path="/functions/{function_id}/call" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.call("864c5880-3d87-4091-828c-33cc2c7219a9", {
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
    tags: {
      "tag": "value",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsCall } from "opperai/funcs/functionsCall.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsCall(opper, "864c5880-3d87-4091-828c-33cc2c7219a9", {
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
    tags: {
      "tag": "value",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsCall failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the function to call                                                                                                                                                 |
| `appApiPublicV2FunctionsCallFunctionRequest`                                                                                                                                   | [models.AppApiPublicV2FunctionsCallFunctionRequest](../../models/appapipublicv2functionscallfunctionrequest.md)                                                                | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.AppApiPublicV2FunctionsCallFunctionResponse](../../models/appapipublicv2functionscallfunctionresponse.md)\>**

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

This endpoint returns a continuous stream of Server-Sent Event objects as the function executes,
allowing for real-time streaming of responses. The response follows the Server-Sent Events
specification with proper event structure for SDK compatibility.

Each Server-Sent Event contains:
- `id`: Optional event identifier
- `event`: Optional event type
- `data`: JSON payload with streaming chunk information
- `retry`: Optional retry interval

The data payload includes:
- `delta`: Incremental text content (if any)
- `span_id`: Unique identifier for the execution span (when available)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="stream_function_functions__function_id__call_stream_post" method="post" path="/functions/{function_id}/call/stream" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.stream("e35c595b-59f2-40b8-bc8a-d6f71ebd3c63", {
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
    tags: {
      "tag": "value",
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
import { functionsStream } from "opperai/funcs/functionsStream.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsStream(opper, "e35c595b-59f2-40b8-bc8a-d6f71ebd3c63", {
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
    tags: {
      "tag": "value",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const event of result) {
    console.log(event);
  }
  } else {
    console.log("functionsStream failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the function to call                                                                                                                                                 |
| `appApiPublicV2FunctionsCallFunctionRequest`                                                                                                                                   | [models.AppApiPublicV2FunctionsCallFunctionRequest](../../models/appapipublicv2functionscallfunctionrequest.md)                                                                | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.StreamFunctionFunctionsFunctionIdCallStreamPostResponse](../../models/operations/streamfunctionfunctionsfunctionidcallstreampostresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## callRevision

Call a function

### Example Usage

<!-- UsageSnippet language="typescript" operationID="call_function_revision_functions__function_id__call__revision_id__post" method="post" path="/functions/{function_id}/call/{revision_id}" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.callRevision("b7391b0d-f115-4145-ae29-a136ae2d6a7a", "de9b5cac-c926-4aa1-a5ab-dc3aa3cd539c", {
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
    tags: {
      "tag": "value",
    },
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsCallRevision } from "opperai/funcs/functionsCallRevision.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsCallRevision(opper, "b7391b0d-f115-4145-ae29-a136ae2d6a7a", "de9b5cac-c926-4aa1-a5ab-dc3aa3cd539c", {
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
    tags: {
      "tag": "value",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsCallRevision failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the function to call                                                                                                                                                 |
| `revisionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the revision to call                                                                                                                                                 |
| `appApiPublicV2FunctionsCallFunctionRequest`                                                                                                                                   | [models.AppApiPublicV2FunctionsCallFunctionRequest](../../models/appapipublicv2functionscallfunctionrequest.md)                                                                | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.AppApiPublicV2FunctionsCallFunctionResponse](../../models/appapipublicv2functionscallfunctionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |

## streamRevision

Stream a function revision call execution in real-time using Server-Sent Events (SSE).

This endpoint returns a continuous stream of Server-Sent Event objects as the function executes,
allowing for real-time streaming of responses. The response follows the Server-Sent Events
specification with proper event structure for SDK compatibility.

Each Server-Sent Event contains:
- `id`: Optional event identifier
- `event`: Optional event type
- `data`: JSON payload with streaming chunk information
- `retry`: Optional retry interval

The data payload includes:
- `delta`: Incremental text content (if any)
- `span_id`: Unique identifier for the execution span (when available)

### Example Usage

<!-- UsageSnippet language="typescript" operationID="stream_function_revision_functions__function_id__call_stream__revision_id__post" method="post" path="/functions/{function_id}/call/stream/{revision_id}" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.streamRevision("d69e8466-7dba-4eaf-983c-ee6573398ae7", "c5701ae3-acaf-40b6-95f8-5c1192d84640", {
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
    tags: {
      "tag": "value",
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
import { functionsStreamRevision } from "opperai/funcs/functionsStreamRevision.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsStreamRevision(opper, "d69e8466-7dba-4eaf-983c-ee6573398ae7", "c5701ae3-acaf-40b6-95f8-5c1192d84640", {
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
    tags: {
      "tag": "value",
    },
  });
  if (res.ok) {
    const { value: result } = res;
    for await (const event of result) {
    console.log(event);
  }
  } else {
    console.log("functionsStreamRevision failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the function to call                                                                                                                                                 |
| `revisionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the revision to call                                                                                                                                                 |
| `appApiPublicV2FunctionsCallFunctionRequest`                                                                                                                                   | [models.AppApiPublicV2FunctionsCallFunctionRequest](../../models/appapipublicv2functionscallfunctionrequest.md)                                                                | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[operations.StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostResponse](../../models/operations/streamfunctionrevisionfunctionsfunctionidcallstreamrevisionidpostresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |