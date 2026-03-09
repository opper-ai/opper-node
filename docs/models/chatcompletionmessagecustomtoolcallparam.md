# ChatCompletionMessageCustomToolCallParam

A call to a custom tool created by the model.

## Example Usage

```typescript
import { ChatCompletionMessageCustomToolCallParam } from "opperai/models";

let value: ChatCompletionMessageCustomToolCallParam = {
  id: "<id>",
  custom: {
    input: "<value>",
    name: "<value>",
  },
  type: "custom",
};
```

## Fields

| Field                                                                                                                                              | Type                                                                                                                                               | Required                                                                                                                                           | Description                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                               | *string*                                                                                                                                           | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |
| `custom`                                                                                                                                           | [models.OpenaiTypesChatChatCompletionMessageCustomToolCallParamCustom](../models/openaitypeschatchatcompletionmessagecustomtoolcallparamcustom.md) | :heavy_check_mark:                                                                                                                                 | The custom tool that the model called.                                                                                                             |
| `type`                                                                                                                                             | *"custom"*                                                                                                                                         | :heavy_check_mark:                                                                                                                                 | N/A                                                                                                                                                |