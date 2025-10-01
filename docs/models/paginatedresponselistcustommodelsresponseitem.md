# PaginatedResponseListCustomModelsResponseItem

## Example Usage

```typescript
import { PaginatedResponseListCustomModelsResponseItem } from "opperai/models";

let value: PaginatedResponseListCustomModelsResponseItem = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      id: "031408dc-8cbb-481b-81e9-9abe112d9788",
      name: "<value>",
      identifier: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `meta`                                                                             | [models.Meta](../models/meta.md)                                                   | :heavy_check_mark:                                                                 | N/A                                                                                |
| `data`                                                                             | [models.ListCustomModelsResponseItem](../models/listcustommodelsresponseitem.md)[] | :heavy_check_mark:                                                                 | List of items returned in the response                                             |