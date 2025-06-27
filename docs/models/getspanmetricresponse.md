# GetSpanMetricResponse

## Example Usage

```typescript
import { GetSpanMetricResponse } from "opperai";

let value: GetSpanMetricResponse = {
  dimension: "<value>",
  value: 8780.75,
  id: "b4015008-c05a-452a-9c49-0d197c6392a9",
  spanId: "a66696c0-4ff7-489c-8cbb-7960709fd7e6",
  createdAt: new Date("2024-04-23T09:45:46.222Z"),
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