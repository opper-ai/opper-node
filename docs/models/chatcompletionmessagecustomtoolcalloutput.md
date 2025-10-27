# ChatCompletionMessageCustomToolCallOutput

## Example Usage

```typescript
import { ChatCompletionMessageCustomToolCallOutput } from "opperai/models";

let value: ChatCompletionMessageCustomToolCallOutput = {
  id: "<id>",
  custom: {
    input: "<value>",
    name: "<value>",
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `id`                                             | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `custom`                                         | [models.CustomOutput](../models/customoutput.md) | :heavy_check_mark:                               | N/A                                              |
| `type`                                           | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `additionalProperties`                           | Record<string, *any*>                            | :heavy_minus_sign:                               | N/A                                              |