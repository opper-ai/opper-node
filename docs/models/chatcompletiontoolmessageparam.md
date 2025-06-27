# ChatCompletionToolMessageParam

## Example Usage

```typescript
import { ChatCompletionToolMessageParam } from "opperai";

let value: ChatCompletionToolMessageParam = {
  content: [
    {
      text: "<value>",
    },
  ],
  toolCallId: "<id>",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `content`                                      | *models.ChatCompletionToolMessageParamContent* | :heavy_check_mark:                             | N/A                                            |
| `role`                                         | *string*                                       | :heavy_check_mark:                             | N/A                                            |
| `toolCallId`                                   | *string*                                       | :heavy_check_mark:                             | N/A                                            |