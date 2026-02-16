# ChatCompletionAllowedToolChoiceParam

Constrains the tools available to the model to a pre-defined set.

## Example Usage

```typescript
import { ChatCompletionAllowedToolChoiceParam } from "opperai/models";

let value: ChatCompletionAllowedToolChoiceParam = {
  allowedTools: {
    mode: "required",
    tools: [
      {
        "key": "<value>",
      },
      {
        "key": "<value>",
        "key1": "<value>",
        "key2": "<value>",
      },
      {},
    ],
  },
  type: "allowed_tools",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `allowedTools`                                                                         | [models.ChatCompletionAllowedToolsParam](../models/chatcompletionallowedtoolsparam.md) | :heavy_check_mark:                                                                     | Constrains the tools available to the model to a pre-defined set.                      |
| `type`                                                                                 | *"allowed_tools"*                                                                      | :heavy_check_mark:                                                                     | N/A                                                                                    |