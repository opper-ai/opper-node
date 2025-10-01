# ListSpanMetricsResponse

## Example Usage

```typescript
import { ListSpanMetricsResponse } from "opperai/models";

let value: ListSpanMetricsResponse = {
  dimension: "<value>",
  value: 3031.92,
  id: "f57950e1-69c9-492f-9ee4-403bfcb748f4",
  spanId: "3a159090-0621-4c30-93f4-6f09f1592f9f",
  createdAt: new Date("2025-01-21T17:46:37.965Z"),
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `dimension`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | The dimension of the metric                                                                   |
| `value`                                                                                       | *number*                                                                                      | :heavy_check_mark:                                                                            | The value of the metric                                                                       |
| `comment`                                                                                     | *string*                                                                                      | :heavy_minus_sign:                                                                            | A comment about the metric, e.g. a description of the metric                                  |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `spanId`                                                                                      | *string*                                                                                      | :heavy_check_mark:                                                                            | N/A                                                                                           |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | N/A                                                                                           |