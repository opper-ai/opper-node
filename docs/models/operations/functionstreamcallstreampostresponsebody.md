# FunctionStreamCallStreamPostResponseBody

Server-Sent Event following the SSE specification

## Example Usage

```typescript
import { FunctionStreamCallStreamPostResponseBody } from "opperai/models/operations";

let value: FunctionStreamCallStreamPostResponseBody = {
  id: "123",
  event: "message",
  data: {
    delta: "John Doe",
    jsonPath: "people[0].name",
    spanId: "123e4567-e89b-12d3-a456-426614174000",
    chunkType: "json",
  },
  retry: 1000,
};
```

## Fields

| Field                                                                                                                                            | Type                                                                                                                                             | Required                                                                                                                                         | Description                                                                                                                                      | Example                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                                                             | *string*                                                                                                                                         | :heavy_minus_sign:                                                                                                                               | Event ID for the SSE event                                                                                                                       | 123                                                                                                                                              |
| `event`                                                                                                                                          | *string*                                                                                                                                         | :heavy_minus_sign:                                                                                                                               | Event type for the SSE event                                                                                                                     | message                                                                                                                                          |
| `data`                                                                                                                                           | [operations.FunctionStreamCallStreamPostData](../../models/operations/functionstreamcallstreampostdata.md)                                       | :heavy_check_mark:                                                                                                                               | The streaming chunk data payload. Content depends on streaming mode: both modes use 'delta', structured mode adds 'json_path' for field tracking |                                                                                                                                                  |
| `retry`                                                                                                                                          | *number*                                                                                                                                         | :heavy_minus_sign:                                                                                                                               | Retry interval in milliseconds for the SSE connection                                                                                            | 1000                                                                                                                                             |