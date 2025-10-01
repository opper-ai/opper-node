# ChatCompletionAllowedToolsParam

## Example Usage

```typescript
import { ChatCompletionAllowedToolsParam } from "opperai/models";

let value: ChatCompletionAllowedToolsParam = {
  mode: "auto",
  tools: [
    {
      "key": "<value>",
      "key1": "<value>",
    },
    {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    {
      "key": "<value>",
      "key1": "<value>",
    },
  ],
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `mode`                           | [models.Mode](../models/mode.md) | :heavy_check_mark:               | N/A                              |
| `tools`                          | Record<string, *any*>[]          | :heavy_check_mark:               | N/A                              |