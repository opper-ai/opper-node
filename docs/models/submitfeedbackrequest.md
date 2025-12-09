# SubmitFeedbackRequest

## Example Usage

```typescript
import { SubmitFeedbackRequest } from "opperai/models";

let value: SubmitFeedbackRequest = {
  score: 1,
  comment: "Great output, exactly what I needed",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `score`                                                                              | *number*                                                                             | :heavy_check_mark:                                                                   | Feedback score (0.0=negative, 1.0=positive)                                          | 1                                                                                    |
| `comment`                                                                            | *string*                                                                             | :heavy_minus_sign:                                                                   | Optional comment explaining the feedback                                             | Great output, exactly what I needed                                                  |
| `saveToDataset`                                                                      | *boolean*                                                                            | :heavy_minus_sign:                                                                   | Force save to dataset (True=force save, False=never save, None=use auto-save config) |                                                                                      |