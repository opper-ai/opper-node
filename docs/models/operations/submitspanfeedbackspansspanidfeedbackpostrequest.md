# SubmitSpanFeedbackSpansSpanIdFeedbackPostRequest

## Example Usage

```typescript
import { SubmitSpanFeedbackSpansSpanIdFeedbackPostRequest } from "opperai/models/operations";

let value: SubmitSpanFeedbackSpansSpanIdFeedbackPostRequest = {
  spanId: "6bb2c562-3ade-4c65-9054-91cdf0ff36b3",
  submitFeedbackRequest: {
    score: 1,
    comment: "Great output, exactly what I needed",
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `spanId`                                                              | *string*                                                              | :heavy_check_mark:                                                    | The ID of the span to provide feedback on                             |
| `submitFeedbackRequest`                                               | [models.SubmitFeedbackRequest](../../models/submitfeedbackrequest.md) | :heavy_check_mark:                                                    | N/A                                                                   |