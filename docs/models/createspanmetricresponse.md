# CreateSpanMetricResponse

## Example Usage

```typescript
import { CreateSpanMetricResponse } from "opperai/models";

let value: CreateSpanMetricResponse = {
  dimension: "<value>",
  value: 7937.84,
  id: "61b76aaf-bc1c-46ff-bdcb-d371ad8ec0ac",
  spanId: "147ef3d4-a3d2-43a6-ae1c-33b39967fc17",
  createdAt: new Date("2024-11-05T10:51:32.185Z"),
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