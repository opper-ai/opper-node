# ChatCompletionSystemMessageParam

Developer-provided instructions that the model should follow, regardless of
messages sent by the user. With o1 models and newer, use `developer` messages
for this purpose instead.

## Example Usage

```typescript
import { ChatCompletionSystemMessageParam } from "opperai/models";

let value: ChatCompletionSystemMessageParam = {
  content: [
    {
      text: "<value>",
      type: "text",
    },
  ],
  role: "system",
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `content`                                        | *models.ChatCompletionSystemMessageParamContent* | :heavy_check_mark:                               | N/A                                              |
| `role`                                           | *"system"*                                       | :heavy_check_mark:                               | N/A                                              |
| `name`                                           | *string*                                         | :heavy_minus_sign:                               | N/A                                              |