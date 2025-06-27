# ChatCompletionMessageToolCallParam

## Example Usage

```typescript
import { ChatCompletionMessageToolCallParam } from "opperai";

let value: ChatCompletionMessageToolCallParam = {
  id: "<id>",
  function: {
    arguments: "<value>",
    name: "<value>",
  },
};
```

## Fields

| Field                                                                                                                                      | Type                                                                                                                                       | Required                                                                                                                                   | Description                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                       | *string*                                                                                                                                   | :heavy_check_mark:                                                                                                                         | N/A                                                                                                                                        |
| `function`                                                                                                                                 | [models.OpenaiTypesChatChatCompletionMessageToolCallParamFunction](../models/openaitypeschatchatcompletionmessagetoolcallparamfunction.md) | :heavy_check_mark:                                                                                                                         | N/A                                                                                                                                        |
| `type`                                                                                                                                     | *string*                                                                                                                                   | :heavy_check_mark:                                                                                                                         | N/A                                                                                                                                        |