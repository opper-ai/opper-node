# UpdateSpanSpansSpanIdPatchRequest

## Example Usage

```typescript
import { UpdateSpanSpansSpanIdPatchRequest } from "opperai/models/operations";

let value: UpdateSpanSpansSpanIdPatchRequest = {
  spanId: "c4686ca8-5f9f-483e-8cc2-e12731bcf9e5",
  updateSpanRequest: {
    name: "my span",
    startTime: new Date("2025-11-10T09:07:23.696241Z"),
    type: "email_tool",
    endTime: new Date("2025-11-10T09:07:23.696335Z"),
    input: "Hello, world!",
    output: "Hello, world!",
    error: "Exception: This is an error message",
    meta: {
      "key": "value",
    },
    score: 10,
  },
};
```

## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `spanId`                                                      | *string*                                                      | :heavy_check_mark:                                            | The ID of the span to update                                  |
| `updateSpanRequest`                                           | [models.UpdateSpanRequest](../../models/updatespanrequest.md) | :heavy_check_mark:                                            | N/A                                                           |