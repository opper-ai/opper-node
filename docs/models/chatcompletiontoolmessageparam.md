# ChatCompletionToolMessageParam

## Example Usage

```typescript
import { ChatCompletionToolMessageParam } from "opperai/models";

let value: ChatCompletionToolMessageParam = {
  content: [
    {
      text: "<value>",
      type: "text",
    },
  ],
  role: "tool",
  toolCallId: "<id>",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `content`                                      | *models.ChatCompletionToolMessageParamContent* | :heavy_check_mark:                             | N/A                                            |
| `role`                                         | *"tool"*                                       | :heavy_check_mark:                             | N/A                                            |
| `toolCallId`                                   | *string*                                       | :heavy_check_mark:                             | N/A                                            |