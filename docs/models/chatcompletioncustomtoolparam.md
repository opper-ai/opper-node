# ChatCompletionCustomToolParam

A custom tool that processes input using a specified format.

## Example Usage

```typescript
import { ChatCompletionCustomToolParam } from "opperai/models";

let value: ChatCompletionCustomToolParam = {
  custom: {
    name: "<value>",
  },
  type: "custom",
};
```

## Fields

| Field                                                                                                                        | Type                                                                                                                         | Required                                                                                                                     | Description                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `custom`                                                                                                                     | [models.OpenaiTypesChatChatCompletionCustomToolParamCustom](../models/openaitypeschatchatcompletioncustomtoolparamcustom.md) | :heavy_check_mark:                                                                                                           | Properties of the custom tool.                                                                                               |
| `type`                                                                                                                       | *"custom"*                                                                                                                   | :heavy_check_mark:                                                                                                           | N/A                                                                                                                          |