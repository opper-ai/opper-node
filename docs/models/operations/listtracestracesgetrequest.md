# ListTracesTracesGetRequest

## Example Usage

```typescript
import { ListTracesTracesGetRequest } from "opperai/models/operations";

let value: ListTracesTracesGetRequest = {};
```

## Fields

| Field                                                                                             | Type                                                                                              | Required                                                                                          | Description                                                                                       |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `name`                                                                                            | *string*                                                                                          | :heavy_minus_sign:                                                                                | The name of the trace to filter by, the name of a trace is the name of the root span of the trace |
| `offset`                                                                                          | *number*                                                                                          | :heavy_minus_sign:                                                                                | The offset to start the list from                                                                 |
| `limit`                                                                                           | *number*                                                                                          | :heavy_minus_sign:                                                                                | The number of traces to return                                                                    |