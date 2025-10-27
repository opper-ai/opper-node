# PaginatedResponseListFunctionsResponseItem

## Example Usage

```typescript
import { PaginatedResponseListFunctionsResponseItem } from "opperai/models";

let value: PaginatedResponseListFunctionsResponseItem = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      id: "1e7fc452-e410-433d-92da-aaa66db5df51",
      name: "my-function",
      revisionId: "80f0624b-12e0-42f7-8df8-77c8406c61d3",
    },
  ],
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `meta`                                                                                   | [models.Meta](../models/meta.md)                                                         | :heavy_check_mark:                                                                       | N/A                                                                                      |
| `data`                                                                                   | [models.ListFunctionsResponseItemOutput](../models/listfunctionsresponseitemoutput.md)[] | :heavy_check_mark:                                                                       | List of items returned in the response                                                   |