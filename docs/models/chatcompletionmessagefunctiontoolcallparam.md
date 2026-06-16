# ChatCompletionMessageFunctionToolCallParam

A call to a function tool created by the model.

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
| `function`                                                                                                                                                 | [models.OpenaiTypesChatChatCompletionMessageFunctionToolCallParamFunction](../models/openaitypeschatchatcompletionmessagefunctiontoolcallparamfunction.md) | :heavy_check_mark:                                                                                                                                         | The function that the model called.                                                                                                                        |
| `type`                                                                                                                                                     | *"function"*                                                                                                                                               | :heavy_check_mark:                                                                                                                                         | N/A                                                                                                                                                        |