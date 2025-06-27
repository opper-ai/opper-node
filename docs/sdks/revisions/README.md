# Revisions
(*functions.revisions*)

## Overview

### Available Operations

* [list](#list) - List Function Revisions

## list

Get all revisions for a function with pagination

Returns a list of revisions for the function with the given function id
revisions are sorted by created_at in descending order ergo the latest revision is the first one

### Example Usage

```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.functions.revisions.list("197f3203-7e7e-453d-b36a-b1f4e551ebf4");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { functionsRevisionsList } from "opperai/funcs/functionsRevisionsList.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await functionsRevisionsList(opper, "197f3203-7e7e-453d-b36a-b1f4e551ebf4");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("functionsRevisionsList failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `functionId`                                                                                                                                                                   | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the function to get revisions for                                                                                                                                    |
| `offset`                                                                                                                                                                       | *number*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | The offset of the revisions to get                                                                                                                                             |
| `limit`                                                                                                                                                                        | *number*                                                                                                                                                                       | :heavy_minus_sign:                                                                                                                                                             | The limit of the revisions to get                                                                                                                                              |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.PaginatedResponseListFunctionRevisionResponse](../../models/paginatedresponselistfunctionrevisionresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |