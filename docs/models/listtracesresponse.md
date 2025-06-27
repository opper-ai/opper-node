# ListTracesResponse

## Example Usage

```typescript
import { ListTracesResponse } from "opperai";

let value: ListTracesResponse = {
  id: "f78bf2f7-0ab0-4fb0-a042-c4afa9dc56e3",
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