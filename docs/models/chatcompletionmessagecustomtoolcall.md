# ChatCompletionMessageCustomToolCall

## Example Usage

```typescript
import { ChatCompletionMessageCustomToolCall } from "opperai/models";

let value: ChatCompletionMessageCustomToolCall = {
  id: "<id>",
  custom: {
    input: "<value>",
    name: "<value>",
  },
  type: "custom",
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `id`                                             | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `custom`                                         | [models.CustomOutput](../models/customoutput.md) | :heavy_check_mark:                               | N/A                                              |
| `type`                                           | *"custom"*                                       | :heavy_check_mark:                               | N/A                                              |
| `additionalProperties`                           | Record<string, *any*>                            | :heavy_minus_sign:                               | N/A                                              |