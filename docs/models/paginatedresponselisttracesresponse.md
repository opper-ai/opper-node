# PaginatedResponseListTracesResponse

## Example Usage

```typescript
import { PaginatedResponseListTracesResponse } from "opperai";

let value: PaginatedResponseListTracesResponse = {
  meta: {
    totalCount: 1,
  },
  data: [],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `meta`                                                         | [models.Meta](../models/meta.md)                               | :heavy_check_mark:                                             | N/A                                                            |
| `data`                                                         | [models.ListTracesResponse](../models/listtracesresponse.md)[] | :heavy_check_mark:                                             | List of items returned in the response                         |