# UpdateMetricSpansSpanIdMetricsMetricIdPatchRequest

## Example Usage

```typescript
import { UpdateMetricSpansSpanIdMetricsMetricIdPatchRequest } from "opperai/models/operations";

let value: UpdateMetricSpansSpanIdMetricsMetricIdPatchRequest = {
  spanId: "e987b39d-f263-494e-a919-91046b02e1a6",
  metricId: "fd1a1dbd-bc97-464a-8dec-2edb491c8a6d",
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `spanId`                                                                  | *string*                                                                  | :heavy_check_mark:                                                        | The id of the span                                                        |
| `metricId`                                                                | *string*                                                                  | :heavy_check_mark:                                                        | The id of the metric to update                                            |
| `updateSpanMetricRequest`                                                 | [models.UpdateSpanMetricRequest](../../models/updatespanmetricrequest.md) | :heavy_check_mark:                                                        | N/A                                                                       |