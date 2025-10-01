# ChatCompletionAudio

## Example Usage

```typescript
import { ChatCompletionAudio } from "opperai/models";

let value: ChatCompletionAudio = {
  id: "<id>",
  data: "<value>",
  expiresAt: 90529,
  transcript: "<value>",
};
```

## Fields

| Field                  | Type                   | Required               | Description            |
| ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| `id`                   | *string*               | :heavy_check_mark:     | N/A                    |
| `data`                 | *string*               | :heavy_check_mark:     | N/A                    |
| `expiresAt`            | *number*               | :heavy_check_mark:     | N/A                    |
| `transcript`           | *string*               | :heavy_check_mark:     | N/A                    |
| `additionalProperties` | Record<string, *any*>  | :heavy_minus_sign:     | N/A                    |