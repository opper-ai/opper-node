# ChatCompletionAllowedToolChoiceParam

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
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `allowedTools`                                                                         | [models.ChatCompletionAllowedToolsParam](../models/chatcompletionallowedtoolsparam.md) | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `type`                                                                                 | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |