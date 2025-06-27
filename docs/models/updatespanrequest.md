# UpdateSpanRequest

## Example Usage

```typescript
import { UpdateSpanRequest } from "opperai";

let value: UpdateSpanRequest = {
  name: "my span",
  startTime: new Date("2025-06-27T11:37:21.302644Z"),
  type: "email_tool",
  endTime: new Date("2025-06-27T11:37:21.302704Z"),
  input: "Hello, world!",
  output: "Hello, world!",
  error: "Exception: This is an error message",
  meta: {
    "key": "value",
  },
  score: 10,
};
```

## Fields

| Field                                                                                                     | Type                                                                                                      | Required                                                                                                  | Description                                                                                               | Example                                                                                                   |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `name`                                                                                                    | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | The name of the span, something descriptive about the span that will be used to identify it when querying | my span                                                                                                   |
| `startTime`                                                                                               | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)             | :heavy_minus_sign:                                                                                        | The start time of the span in UTC                                                                         | 2025-06-27T11:37:21.302644Z                                                                               |
| `type`                                                                                                    | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | The type of the span                                                                                      | email_tool                                                                                                |
| `endTime`                                                                                                 | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)             | :heavy_minus_sign:                                                                                        | The end time of the span in UTC                                                                           | 2025-06-27T11:37:21.302704Z                                                                               |
| `input`                                                                                                   | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | The input of the span                                                                                     | Hello, world!                                                                                             |
| `output`                                                                                                  | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | The output of the span                                                                                    | Hello, world!                                                                                             |
| `error`                                                                                                   | *string*                                                                                                  | :heavy_minus_sign:                                                                                        | In case of an error, the error message                                                                    | Exception: This is an error message                                                                       |
| `meta`                                                                                                    | Record<string, *any*>                                                                                     | :heavy_minus_sign:                                                                                        | The meta data of the span                                                                                 | {<br/>"key": "value"<br/>}                                                                                |
| `score`                                                                                                   | *number*                                                                                                  | :heavy_minus_sign:                                                                                        | The score of the span                                                                                     | 10                                                                                                        |