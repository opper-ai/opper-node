# FunctionStreamCallStreamPostResponseBody

Server-Sent Event following the SSE specification

## Example Usage

```typescript
import { FunctionStreamCallStreamPostResponseBody } from "opperai/models/operations";

let value: FunctionStreamCallStreamPostResponseBody = {
  id: "123",
  event: "message",
  data: {
    delta: "Hello",
    spanId: "123e4567-e89b-12d3-a456-426614174000",
  },
  retry: 1000,
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                | Example                                                                                                    |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                       | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | Event ID for the SSE event                                                                                 | 123                                                                                                        |
| `event`                                                                                                    | *string*                                                                                                   | :heavy_minus_sign:                                                                                         | Event type for the SSE event                                                                               | message                                                                                                    |
| `data`                                                                                                     | [operations.FunctionStreamCallStreamPostData](../../models/operations/functionstreamcallstreampostdata.md) | :heavy_check_mark:                                                                                         | The actual data payload containing streaming chunk information                                             |                                                                                                            |
| `retry`                                                                                                    | *number*                                                                                                   | :heavy_minus_sign:                                                                                         | Retry interval in milliseconds for the SSE connection                                                      | 1000                                                                                                       |