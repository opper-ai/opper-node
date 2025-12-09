# ChatCompletionFunctionToolParam

## Example Usage

```typescript
import { ChatCompletionFunctionToolParam } from "opperai/models";

let value: ChatCompletionFunctionToolParam = {
  function: {
    name: "<value>",
  },
  type: "function",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `function`                                                   | [models.FunctionDefinition](../models/functiondefinition.md) | :heavy_check_mark:                                           | N/A                                                          |
| `type`                                                       | *"function"*                                                 | :heavy_check_mark:                                           | N/A                                                          |