# PaginatedResponseListSpanMetricsResponse

## Example Usage

```typescript
import { PaginatedResponseListSpanMetricsResponse } from "opperai/models";

let value: PaginatedResponseListSpanMetricsResponse = {
  meta: {
    totalCount: 1,
  },
  data: [
    {
      dimension: "<value>",
      value: 1150.55,
      id: "2455fb48-2f2d-4038-a90a-5d43495b69a5",
      spanId: "17b6d38b-3087-40ad-a74f-95e23ab72796",
      createdAt: new Date("2024-06-07T06:42:57.566Z"),
    },
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `meta`                                                                   | [models.Meta](../models/meta.md)                                         | :heavy_check_mark:                                                       | N/A                                                                      |
| `data`                                                                   | [models.ListSpanMetricsResponse](../models/listspanmetricsresponse.md)[] | :heavy_check_mark:                                                       | List of items returned in the response                                   |