# CreateSpanMetricRequest

## Example Usage

```typescript
import { CreateSpanMetricRequest } from "opperai";

let value: CreateSpanMetricRequest = {
  dimension: "<value>",
  value: 9620.9,
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `dimension`                                                  | *string*                                                     | :heavy_check_mark:                                           | The dimension of the metric                                  |
| `value`                                                      | *number*                                                     | :heavy_check_mark:                                           | The value of the metric                                      |
| `comment`                                                    | *string*                                                     | :heavy_minus_sign:                                           | A comment about the metric, e.g. a description of the metric |