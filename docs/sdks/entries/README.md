# Entries
(*datasets.entries*)

## Overview

### Available Operations

* [update](#update) - Update Dataset Entry

## update

Update Dataset Entry

### Example Usage

```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.datasets.entries.update("df57581c-3364-4ee6-a9f8-7de20cb937ff", "2789b25b-1a98-4360-96ee-67e9af98c53f", {
    input: "Given this input, what is the output?",
    output: "This is the output to the dataset entry",
    expected: "This `was` the output to the dataset entry",
    comment: "This is an example of how one can edit the output",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { datasetsEntriesUpdate } from "opperai/funcs/datasetsEntriesUpdate.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await datasetsEntriesUpdate(opper, "df57581c-3364-4ee6-a9f8-7de20cb937ff", "2789b25b-1a98-4360-96ee-67e9af98c53f", {
    input: "Given this input, what is the output?",
    output: "This is the output to the dataset entry",
    expected: "This `was` the output to the dataset entry",
    comment: "This is an example of how one can edit the output",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("datasetsEntriesUpdate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `datasetId`                                                                                                                                                                    | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the dataset                                                                                                                                                          |
| `entryId`                                                                                                                                                                      | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The id of the entry to update                                                                                                                                                  |
| `updateDatasetEntryRequest`                                                                                                                                                    | [models.UpdateDatasetEntryRequest](../../models/updatedatasetentryrequest.md)                                                                                                  | :heavy_check_mark:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.UpdateDatasetEntryResponse](../../models/updatedatasetentryresponse.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |