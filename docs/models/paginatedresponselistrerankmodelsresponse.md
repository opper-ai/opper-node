# PaginatedResponseListRerankModelsResponse

## Example Usage

```typescript
import { PaginatedResponseListRerankModelsResponse } from "opperai/models";

let value: PaginatedResponseListRerankModelsResponse = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      hostingProvider: "Cohere",
      name: "rerank-v3.5",
      location: "US",
      costPerRequest: 0.002,
    },
  ],
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `meta`                                                                     | [models.Meta](../models/meta.md)                                           | :heavy_check_mark:                                                         | N/A                                                                        |
| `data`                                                                     | [models.ListRerankModelsResponse](../models/listrerankmodelsresponse.md)[] | :heavy_check_mark:                                                         | List of items returned in the response                                     |