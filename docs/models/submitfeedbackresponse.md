# SubmitFeedbackResponse

## Example Usage

```typescript
import { SubmitFeedbackResponse } from "opperai/models";

let value: SubmitFeedbackResponse = {
  spanId: "f142383a-8d34-4e61-a67b-7b06e89fb98f",
  score: 7664.49,
  exampleSaved: true,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `spanId`                                     | *string*                                     | :heavy_check_mark:                           | The ID of the span                           |
| `score`                                      | *number*                                     | :heavy_check_mark:                           | The feedback score that was submitted        |
| `exampleSaved`                               | *boolean*                                    | :heavy_check_mark:                           | Whether the example was saved to the dataset |