# SpanSchema

## Example Usage

```typescript
import { SpanSchema } from "opperai/models";

let value: SpanSchema = {
  type: "generation",
  metrics: [
    {
      id: "7c30bc51-75f2-4d69-84d0-fd8c43254c6d",
      dimension: "latency",
      value: 3100.96,
      createdAt: new Date("2023-07-25T05:44:26.599Z"),
      comment: "Expert feedback",
    },
  ],
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   | Example                                                                                       |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_minus_sign:                                                                            | The id of the span, set to the uuid of the span                                               |                                                                                               |
| `name`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | The name of the span                                                                          |                                                                                               |
| `startTime`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | The start time of the span                                                                    |                                                                                               |
| `type`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | The type of the span                                                                          | generation                                                                                    |
| `parentId`                                                                                    | *string*                                                                                      | :heavy_minus_sign:                                                                            | The id of the parent span                                                                     |                                                                                               |
| `endTime`                                                                                     | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | The end time of the span                                                                      |                                                                                               |
| `durationMs`                                                                                  | *number*                                                                                      | :heavy_minus_sign:                                                                            | The duration of the span in milliseconds                                                      |                                                                                               |
| `error`                                                                                       | *string*                                                                                      | :heavy_minus_sign:                                                                            | Optional error of the span                                                                    |                                                                                               |
| `meta`                                                                                        | Record<string, *any*>                                                                         | :heavy_minus_sign:                                                                            | The metadata of the span, can be used to add additional information about the span            |                                                                                               |
| `data`                                                                                        | [models.SpanData](../models/spandata.md)                                                      | :heavy_minus_sign:                                                                            | The data of the span                                                                          |                                                                                               |
| `metrics`                                                                                     | [models.SpanMetricData](../models/spanmetricdata.md)[]                                        | :heavy_minus_sign:                                                                            | The metrics of the span                                                                       |                                                                                               |
| `score`                                                                                       | *number*                                                                                      | :heavy_minus_sign:                                                                            | The score of the span                                                                         |                                                                                               |