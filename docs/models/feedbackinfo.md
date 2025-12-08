# FeedbackInfo

Human feedback information for a span.

## Example Usage

```typescript
import { FeedbackInfo } from "opperai/models";

let value: FeedbackInfo = {
  score: 8228.09,
};
```

## Fields

| Field                     | Type                      | Required                  | Description               |
| ------------------------- | ------------------------- | ------------------------- | ------------------------- |
| `score`                   | *number*                  | :heavy_check_mark:        | Feedback score (0.0-1.0)  |
| `comment`                 | *string*                  | :heavy_minus_sign:        | Optional feedback comment |