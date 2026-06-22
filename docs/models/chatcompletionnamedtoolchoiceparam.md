# ChatCompletionNamedToolChoiceParam

Specifies a tool the model should use.

Use to force the model to call a specific function.

## Example Usage

```typescript
import { ChatCompletionNamedToolChoiceParam } from "opperai/models";

let value: ChatCompletionNamedToolChoiceParam = {
  function: {
    name: "<value>",
  },
  type: "function",
};
```

## Fields

| Field                                                                                                                                      | Type                                                                                                                                       | Required                                                                                                                                   | Description                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `function`                                                                                                                                 | [models.OpenaiTypesChatChatCompletionNamedToolChoiceParamFunction](../models/openaitypeschatchatcompletionnamedtoolchoiceparamfunction.md) | :heavy_check_mark:                                                                                                                         | N/A                                                                                                                                        |
| `type`                                                                                                                                     | *"function"*                                                                                                                               | :heavy_check_mark:                                                                                                                         | N/A                                                                                                                                        |