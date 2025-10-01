# PaginatedResponseGetDatasetEntriesResponse

## Example Usage

```typescript
import { PaginatedResponseGetDatasetEntriesResponse } from "opperai/models";

let value: PaginatedResponseGetDatasetEntriesResponse = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      id: "7cbb690e-fc77-45cc-b086-8dacba475a22",
      input: "Given this input, what is the output?",
      output: "This is the output to the dataset entry",
      expected: "This `was` the output to the dataset entry",
      comment: "This is an example of how one can edit the output",
    },
  ],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `meta`                                                                       | [models.Meta](../models/meta.md)                                             | :heavy_check_mark:                                                           | N/A                                                                          |
| `data`                                                                       | [models.GetDatasetEntriesResponse](../models/getdatasetentriesresponse.md)[] | :heavy_check_mark:                                                           | List of items returned in the response                                       |