# ChatCompletionNamedToolChoiceCustomParam

Specifies a tool the model should use.

Use to force the model to call a specific custom tool.

## Example Usage

```typescript
import { ChatCompletionNamedToolChoiceCustomParam } from "opperai/models";

let value: ChatCompletionNamedToolChoiceCustomParam = {
  custom: {
    name: "<value>",
  },
  type: "custom",
};
```

## Fields

| Field                                                                                                                                              | Type                                                                                                                                               | Required                                                                                                                                           | Description                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `custom`                                                                                                                                           | [models.OpenaiTypesChatChatCompletionNamedToolChoiceCustomParamCustom](../models/openaitypeschatchatcompletionnamedtoolchoicecustomparamcustom.md) | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |
| `type`                                                                                                                                             | *"custom"*                                                                                                                                         | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |