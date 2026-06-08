# ChatCompletionDeveloperMessageParam

Developer-provided instructions that the model should follow, regardless of
messages sent by the user. With o1 models and newer, `developer` messages
replace the previous `system` messages.

## Example Usage

```typescript
import { ChatCompletionDeveloperMessageParam } from "opperai/models";

let value: ChatCompletionDeveloperMessageParam = {
  content: "<value>",
  role: "developer",
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `content`                                           | *models.ChatCompletionDeveloperMessageParamContent* | :heavy_check_mark:                                  | N/A                                                 |
| `role`                                              | *"developer"*                                       | :heavy_check_mark:                                  | N/A                                                 |
| `name`                                              | *string*                                            | :heavy_minus_sign:                                  | N/A                                                 |