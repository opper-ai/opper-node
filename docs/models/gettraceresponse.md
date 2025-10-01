# GetTraceResponse

## Example Usage

```typescript
import { GetTraceResponse } from "opperai/models";

let value: GetTraceResponse = {
  id: "5d792c77-d050-453b-a6b4-130a679997ac",
  spans: [
    {
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
    },
  ],
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                                                                                          | *string*                                                                                      | :heavy_check_mark:                                                                            | The id of the trace                                                                           |
| `startTime`                                                                                   | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | The start time of the trace                                                                   |
| `endTime`                                                                                     | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_minus_sign:                                                                            | The end time of the trace                                                                     |
| `durationMs`                                                                                  | *number*                                                                                      | :heavy_minus_sign:                                                                            | The duration of the trace                                                                     |
| `status`                                                                                      | *string*                                                                                      | :heavy_minus_sign:                                                                            | The status of the trace                                                                       |
| `name`                                                                                        | *string*                                                                                      | :heavy_minus_sign:                                                                            | The name of the trace, set to the name of the root span of the trace                          |
| `input`                                                                                       | *string*                                                                                      | :heavy_minus_sign:                                                                            | The input of the trace, set to the input of the root span of the trace                        |
| `output`                                                                                      | *string*                                                                                      | :heavy_minus_sign:                                                                            | The output of the trace, set to the output of the root span of the trace                      |
| `totalTokens`                                                                                 | *number*                                                                                      | :heavy_minus_sign:                                                                            | The total tokens of the trace                                                                 |
| `spans`                                                                                       | [models.SpanSchema](../models/spanschema.md)[]                                                | :heavy_minus_sign:                                                                            | The spans of the trace                                                                        |