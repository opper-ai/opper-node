# PaginatedResponseListFunctionRevisionResponse

## Example Usage

```typescript
import { PaginatedResponseListFunctionRevisionResponse } from "opperai/models";

let value: PaginatedResponseListFunctionRevisionResponse = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      id: "01c7d704-9a2e-41b2-b23f-003a96ed05e9",
      configuration: {
        "key": "<value>",
        "key1": "<value>",
      },
      createdAt: new Date("2023-09-30T00:00:42.514Z"),
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `meta`                                                                             | [models.Meta](../models/meta.md)                                                   | :heavy_check_mark:                                                                 | N/A                                                                                |
| `data`                                                                             | [models.ListFunctionRevisionResponse](../models/listfunctionrevisionresponse.md)[] | :heavy_check_mark:                                                                 | List of items returned in the response                                             |