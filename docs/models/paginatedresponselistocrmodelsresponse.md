# PaginatedResponseListOCRModelsResponse

## Example Usage

```typescript
import { PaginatedResponseListOCRModelsResponse } from "opperai/models";

let value: PaginatedResponseListOCRModelsResponse = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      hostingProvider: "Mistral",
      name: "mistral/ocr-latest",
      location: "EU",
      costPerPage: 0.001,
    },
  ],
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `meta`                                                               | [models.Meta](../models/meta.md)                                     | :heavy_check_mark:                                                   | N/A                                                                  |
| `data`                                                               | [models.ListOCRModelsResponse](../models/listocrmodelsresponse.md)[] | :heavy_check_mark:                                                   | List of items returned in the response                               |