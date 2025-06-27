# PaginatedResponseListKnowledgeBasesResponse

## Example Usage

```typescript
import { PaginatedResponseListKnowledgeBasesResponse } from "opperai";

let value: PaginatedResponseListKnowledgeBasesResponse = {
  meta: {
    totalCount: 1,
  },
  data: [],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `meta`                                                                         | [models.Meta](../models/meta.md)                                               | :heavy_check_mark:                                                             | N/A                                                                            |
| `data`                                                                         | [models.ListKnowledgeBasesResponse](../models/listknowledgebasesresponse.md)[] | :heavy_check_mark:                                                             | List of items returned in the response                                         |