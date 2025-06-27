# CreateMetricSpansSpanIdMetricsPostRequest

## Example Usage

```typescript
import { CreateMetricSpansSpanIdMetricsPostRequest } from "opperai/models/operations";

let value: CreateMetricSpansSpanIdMetricsPostRequest = {
  spanId: "77e87166-1070-405a-b846-55ac0400f27c",
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `spanId`                                                                  | *string*                                                                  | :heavy_check_mark:                                                        | The id of the span                                                        |
| `createSpanMetricRequest`                                                 | [models.CreateSpanMetricRequest](../../models/createspanmetricrequest.md) | :heavy_check_mark:                                                        | N/A                                                                       |