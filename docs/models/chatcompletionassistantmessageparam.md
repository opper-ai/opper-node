# ChatCompletionAssistantMessageParam

## Example Usage

```typescript
import { ChatCompletionAssistantMessageParam } from "opperai/models";

let value: ChatCompletionAssistantMessageParam = {};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `role`                                                     | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `audio`                                                    | [models.Audio](../models/audio.md)                         | :heavy_minus_sign:                                         | N/A                                                        |
| `content`                                                  | *models.ChatCompletionAssistantMessageParamContent2*       | :heavy_minus_sign:                                         | N/A                                                        |
| `functionCall`                                             | [models.FunctionCallInput](../models/functioncallinput.md) | :heavy_minus_sign:                                         | N/A                                                        |
| `name`                                                     | *string*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `refusal`                                                  | *string*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `toolCalls`                                                | *models.ChatCompletionAssistantMessageParamToolCall*[]     | :heavy_minus_sign:                                         | N/A                                                        |