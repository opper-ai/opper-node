# ChatCompletionPredictionContentParam

Static predicted output content, such as the content of a text file that is
being regenerated.

## Example Usage

```typescript
import { ChatCompletionPredictionContentParam } from "opperai/models";

let value: ChatCompletionPredictionContentParam = {
  content: [
    {
      text: "<value>",
      type: "text",
    },
  ],
  type: "content",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `content`                                            | *models.ChatCompletionPredictionContentParamContent* | :heavy_check_mark:                                   | N/A                                                  |
| `type`                                               | *"content"*                                          | :heavy_check_mark:                                   | N/A                                                  |