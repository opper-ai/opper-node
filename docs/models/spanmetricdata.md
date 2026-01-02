# SpanMetricData

## Example Usage

```typescript
import { SpanMetricData } from "opperai/models";

let value: SpanMetricData = {
  id: "de116402-1961-4e94-a679-5e1364da7d48",
  dimension: "latency",
  value: 4435.14,
  createdAt: new Date("2024-02-29T12:20:58.468Z"),
  comment: "Expert feedback",
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | The id of the metric                                                                          |                                                                                               |
| `dimension`                                                                                   | *string*                                                                                      | :heavy_check_mark:                                                                            | The dimension of the metric                                                                   | latency                                                                                       |
| `value`                                                                                       | *number*                                                                                      | :heavy_check_mark:                                                                            | The value of the metric                                                                       |                                                                                               |
| `createdAt`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | The timestamp when the metric was created                                                     |                                                                                               |
| `comment`                                                                                     | *string*                                                                                      | :heavy_minus_sign:                                                                            | The comment of the metric, can be used to add additional information about the metric         | Expert feedback                                                                               |