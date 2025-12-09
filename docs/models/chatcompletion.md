# ChatCompletion

## Example Usage

```typescript
import { ChatCompletion } from "opperai/models";

let value: ChatCompletion = {
  id: "<id>",
  choices: [],
  created: 676471,
  model: "Altima",
  object: "chat.completion",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `id`                                                                       | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `choices`                                                                  | [models.Choice](../models/choice.md)[]                                     | :heavy_check_mark:                                                         | N/A                                                                        |
| `created`                                                                  | *number*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `model`                                                                    | *string*                                                                   | :heavy_check_mark:                                                         | N/A                                                                        |
| `object`                                                                   | *"chat.completion"*                                                        | :heavy_check_mark:                                                         | N/A                                                                        |
| `serviceTier`                                                              | [models.ChatCompletionServiceTier](../models/chatcompletionservicetier.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `systemFingerprint`                                                        | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        |
| `usage`                                                                    | [models.CompletionUsage](../models/completionusage.md)                     | :heavy_minus_sign:                                                         | N/A                                                                        |
| `additionalProperties`                                                     | Record<string, *any*>                                                      | :heavy_minus_sign:                                                         | N/A                                                                        |