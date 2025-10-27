# ChoiceOutput

## Example Usage

```typescript
import { ChoiceOutput } from "opperai/models";

let value: ChoiceOutput = {
  finishReason: "function_call",
  index: 544799,
  message: {},
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `finishReason`                                                                 | [models.FinishReason](../models/finishreason.md)                               | :heavy_check_mark:                                                             | N/A                                                                            |
| `index`                                                                        | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `logprobs`                                                                     | [models.ChoiceLogprobsOutput](../models/choicelogprobsoutput.md)               | :heavy_minus_sign:                                                             | N/A                                                                            |
| `message`                                                                      | [models.ChatCompletionMessageOutput](../models/chatcompletionmessageoutput.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `additionalProperties`                                                         | Record<string, *any*>                                                          | :heavy_minus_sign:                                                             | N/A                                                                            |