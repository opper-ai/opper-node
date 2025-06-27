# GetMetricSpansSpanIdMetricsMetricIdGetRequest

## Example Usage

```typescript
import { GetMetricSpansSpanIdMetricsMetricIdGetRequest } from "opperai/models/operations";

let value: GetMetricSpansSpanIdMetricsMetricIdGetRequest = {
  spanId: "afd86bea-5a09-4998-80b8-5d9b706295b1",
  metricId: "83a78cf1-aa87-4a54-b0fe-890396de5a39",
};
```

## Fields

| Field                       | Type                        | Required                    | Description                 |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| `spanId`                    | *string*                    | :heavy_check_mark:          | The id of the span          |
| `metricId`                  | *string*                    | :heavy_check_mark:          | The id of the metric to get |