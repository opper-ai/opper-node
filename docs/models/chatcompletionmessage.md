# ChatCompletionMessage

## Example Usage

```typescript
import { ChatCompletionMessage } from "opperai/models";

let value: ChatCompletionMessage = {};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `content`                                                      | *string*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `refusal`                                                      | *string*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `role`                                                         | *string*                                                       | :heavy_check_mark:                                             | N/A                                                            |
| `annotations`                                                  | [models.Annotation](../models/annotation.md)[]                 | :heavy_minus_sign:                                             | N/A                                                            |
| `audio`                                                        | [models.ChatCompletionAudio](../models/chatcompletionaudio.md) | :heavy_minus_sign:                                             | N/A                                                            |
| `functionCall`                                                 | [models.FunctionCallOutput](../models/functioncalloutput.md)   | :heavy_minus_sign:                                             | N/A                                                            |
| `toolCalls`                                                    | *models.ChatCompletionMessageToolCall*[]                       | :heavy_minus_sign:                                             | N/A                                                            |
| `additionalProperties`                                         | Record<string, *any*>                                          | :heavy_minus_sign:                                             | N/A                                                            |