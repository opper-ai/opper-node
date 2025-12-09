# ChatCompletionMessageFunctionToolCallParam

## Example Usage

```typescript
import { ChatCompletionMessageFunctionToolCallParam } from "opperai/models";

let value: ChatCompletionMessageFunctionToolCallParam = {
  id: "<id>",
  function: {
    arguments: "<value>",
    name: "<value>",
  },
  type: "function",
};
```

## Fields

| Field                                                                                                                                                      | Type                                                                                                                                                       | Required                                                                                                                                                   | Description                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                                       | *string*                                                                                                                                                   | :heavy_check_mark:                                                                                                                                         | N/A                                                                                                                                                        |
| `function`                                                                                                                                                 | [models.OpenaiTypesChatChatCompletionMessageFunctionToolCallParamFunction](../models/openaitypeschatchatcompletionmessagefunctiontoolcallparamfunction.md) | :heavy_check_mark:                                                                                                                                         | N/A                                                                                                                                                        |
| `type`                                                                                                                                                     | *"function"*                                                                                                                                               | :heavy_check_mark:                                                                                                                                         | N/A                                                                                                                                                        |