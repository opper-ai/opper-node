# UsageAnalyticsUsageGetRequest

## Example Usage

```typescript
import { UsageAnalyticsUsageGetRequest } from "opperai/models/operations";

let value: UsageAnalyticsUsageGetRequest = {
  fields: [
    "completion_tokens",
    "total_tokens",
  ],
  groupBy: [
    "model",
    "project.name",
  ],
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 | Example                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `fromDate`                                                                                                  | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)               | :heavy_minus_sign:                                                                                          | Start date for the time range (inclusive). If not provided, defaults to the first day of the current month. |                                                                                                             |
| `toDate`                                                                                                    | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)               | :heavy_minus_sign:                                                                                          | End date for the time range (exclusive). If not provided, defaults to the last day of the current month.    |                                                                                                             |
| `granularity`                                                                                               | [models.Granularity](../../models/granularity.md)                                                           | :heavy_minus_sign:                                                                                          | Time granularity for grouping (minute, hour, day, month, year)                                              |                                                                                                             |
| `fields`                                                                                                    | *string*[]                                                                                                  | :heavy_minus_sign:                                                                                          | Fields from event_metadata to include and sum                                                               | [<br/>"completion_tokens",<br/>"total_tokens"<br/>]                                                         |
| `groupBy`                                                                                                   | *string*[]                                                                                                  | :heavy_minus_sign:                                                                                          | Fields from tags to group by                                                                                | [<br/>"model",<br/>"project.name"<br/>]                                                                     |