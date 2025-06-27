# PaginatedResponseListLanguageModelsResponse

## Example Usage

```typescript
import { PaginatedResponseListLanguageModelsResponse } from "opperai";

let value: PaginatedResponseListLanguageModelsResponse = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      hostingProvider: "azure",
      name: "azure/gpt-4o-eu",
      location: "us",
      inputCostPerToken: 0.00015,
      outputCostPerToken: 0.0006,
    },
  ],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `meta`                                                                         | [models.Meta](../models/meta.md)                                               | :heavy_check_mark:                                                             | N/A                                                                            |
| `data`                                                                         | [models.ListLanguageModelsResponse](../models/listlanguagemodelsresponse.md)[] | :heavy_check_mark:                                                             | List of items returned in the response                                         |