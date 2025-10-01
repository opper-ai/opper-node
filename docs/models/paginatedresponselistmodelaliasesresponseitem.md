# PaginatedResponseListModelAliasesResponseItem

## Example Usage

```typescript
import { PaginatedResponseListModelAliasesResponseItem } from "opperai/models";

let value: PaginatedResponseListModelAliasesResponseItem = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      id: "9362a55d-d425-49c5-aa4a-f37288a82b40",
      name: "<value>",
      fallbackModels: [
        "<value 1>",
        "<value 2>",
      ],
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `meta`                                                                             | [models.Meta](../models/meta.md)                                                   | :heavy_check_mark:                                                                 | N/A                                                                                |
| `data`                                                                             | [models.ListModelAliasesResponseItem](../models/listmodelaliasesresponseitem.md)[] | :heavy_check_mark:                                                                 | List of items returned in the response                                             |