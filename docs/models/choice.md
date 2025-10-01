# Choice

## Example Usage

```typescript
import { Choice } from "opperai/models";

let value: Choice = {
  finishReason: "length",
  index: 194692,
  message: {},
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `finishReason`                                                     | [models.FinishReason](../models/finishreason.md)                   | :heavy_check_mark:                                                 | N/A                                                                |
| `index`                                                            | *number*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `logprobs`                                                         | [models.ChoiceLogprobs](../models/choicelogprobs.md)               | :heavy_minus_sign:                                                 | N/A                                                                |
| `message`                                                          | [models.ChatCompletionMessage](../models/chatcompletionmessage.md) | :heavy_check_mark:                                                 | N/A                                                                |
| `additionalProperties`                                             | Record<string, *any*>                                              | :heavy_minus_sign:                                                 | N/A                                                                |