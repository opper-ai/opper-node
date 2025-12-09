# ChatCompletionMessageFunctionToolCall

## Example Usage

```typescript
import { ChatCompletionMessageFunctionToolCall } from "opperai/models";

let value: ChatCompletionMessageFunctionToolCall = {
  id: "<id>",
  function: {
    arguments: "<value>",
    name: "<value>",
  },
  type: "function",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `id`                                                 | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `function`                                           | [models.FunctionOutput](../models/functionoutput.md) | :heavy_check_mark:                                   | N/A                                                  |
| `type`                                               | *"function"*                                         | :heavy_check_mark:                                   | N/A                                                  |
| `additionalProperties`                               | Record<string, *any*>                                | :heavy_minus_sign:                                   | N/A                                                  |