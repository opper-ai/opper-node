# UpdateSpanMetricResponse

## Example Usage

```typescript
import { UpdateSpanMetricResponse } from "opperai/models";

let value: UpdateSpanMetricResponse = {
  dimension: "<value>",
  value: 5618.82,
  id: "806b7081-e7a4-4171-9d1b-faac2dcd0772",
  spanId: "17dfd351-45d2-4891-89ef-388e11706ffc",
  createdAt: new Date("2024-10-21T17:44:25.601Z"),
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