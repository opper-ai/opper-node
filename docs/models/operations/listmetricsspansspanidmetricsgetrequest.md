# ListMetricsSpansSpanIdMetricsGetRequest

## Example Usage

```typescript
import { ListMetricsSpansSpanIdMetricsGetRequest } from "opperai/models/operations";

let value: ListMetricsSpansSpanIdMetricsGetRequest = {
  spanId: "38af9115-1881-4f9f-b07f-7d55b7b379d3",
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `spanId`                               | *string*                               | :heavy_check_mark:                     | The id of the span to list metrics for |
| `offset`                               | *number*                               | :heavy_minus_sign:                     | The offset to start the list from      |
| `limit`                                | *number*                               | :heavy_minus_sign:                     | The number of metrics to return        |