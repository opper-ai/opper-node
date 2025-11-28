# PaginatedResponseListFilesResponse

## Example Usage

```typescript
import { PaginatedResponseListFilesResponse } from "opperai/models";

let value: PaginatedResponseListFilesResponse = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      id: "6c9dc6ed-8ae9-445c-a78b-1e1fe4905330",
      originalFilename: "<value>",
      size: 283826,
      status: "<value>",
      documentId: 185150,
      metadata: {
        "category": "legal",
        "client": "acme",
      },
    },
  ],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `meta`                                                       | [models.Meta](../models/meta.md)                             | :heavy_check_mark:                                           | N/A                                                          |
| `data`                                                       | [models.ListFilesResponse](../models/listfilesresponse.md)[] | :heavy_check_mark:                                           | List of items returned in the response                       |