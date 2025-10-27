# Analytics
(*analytics*)

## Overview

### Available Operations

* [getUsage](#getusage) - Usage

## getUsage

Usage

### Example Usage

<!-- UsageSnippet language="typescript" operationID="usage_analytics_usage_get" method="get" path="/analytics/usage" -->
```typescript
import { Opper } from "opperai";

const opper = new Opper({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const result = await opper.analytics.getUsage(undefined, undefined, undefined, [
    "completion_tokens",
    "total_tokens",
  ], [
    "model",
    "project.name",
  ]);

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { OpperCore } from "opperai/core.js";
import { analyticsGetUsage } from "opperai/funcs/analyticsGetUsage.js";

// Use `OpperCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const opper = new OpperCore({
  httpBearer: process.env["OPPER_HTTP_BEARER"] ?? "",
});

async function run() {
  const res = await analyticsGetUsage(opper, undefined, undefined, undefined, [
    "completion_tokens",
    "total_tokens",
  ], [
    "model",
    "project.name",
  ]);
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("analyticsGetUsage failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    | Example                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fromDate`                                                                                                                                                                     | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Start date for the time range (inclusive). If not provided, defaults to the first day of the current month.                                                                    |                                                                                                                                                                                |
| `toDate`                                                                                                                                                                       | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)                                                                                  | :heavy_minus_sign:                                                                                                                                                             | End date for the time range (exclusive). If not provided, defaults to the last day of the current month.                                                                       |                                                                                                                                                                                |
| `granularity`                                                                                                                                                                  | [models.Granularity](../../models/granularity.md)                                                                                                                              | :heavy_minus_sign:                                                                                                                                                             | Time granularity for grouping (minute, hour, day, month, year)                                                                                                                 |                                                                                                                                                                                |
| `fields`                                                                                                                                                                       | *string*[]                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                             | Fields from event_metadata to include and sum                                                                                                                                  | [object Object]                                                                                                                                                                |
| `groupBy`                                                                                                                                                                      | *string*[]                                                                                                                                                                     | :heavy_minus_sign:                                                                                                                                                             | Fields from tags to group by                                                                                                                                                   | [object Object]                                                                                                                                                                |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |                                                                                                                                                                                |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |                                                                                                                                                                                |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |                                                                                                                                                                                |

### Response

**Promise\<[models.GetUsageResultItemOutput[]](../../models/.md)\>**

### Errors

| Error Type                    | Status Code                   | Content Type                  |
| ----------------------------- | ----------------------------- | ----------------------------- |
| errors.BadRequestError        | 400                           | application/json              |
| errors.UnauthorizedError      | 401                           | application/json              |
| errors.NotFoundError          | 404                           | application/json              |
| errors.RequestValidationError | 422                           | application/json              |
| errors.APIError               | 4XX, 5XX                      | \*/\*                         |