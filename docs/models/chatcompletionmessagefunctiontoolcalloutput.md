# ChatCompletionMessageFunctionToolCallOutput

## Example Usage

```typescript
import { ChatCompletionMessageFunctionToolCallOutput } from "opperai/models";

let value: ChatCompletionMessageFunctionToolCallOutput = {
  id: "<id>",
  function: {
    arguments: "<value>",
    name: "<value>",
  },
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `id`                                                 | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `function`                                           | [models.FunctionOutput](../models/functionoutput.md) | :heavy_check_mark:                                   | N/A                                                  |
| `type`                                               | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `additionalProperties`                               | Record<string, *any*>                                | :heavy_minus_sign:                                   | N/A                                                  |