# QueryKnowledgeBaseRequest

## Example Usage

```typescript
import { QueryKnowledgeBaseRequest } from "opperai/models";

let value: QueryKnowledgeBaseRequest = {
  query: "What is the capital of France?",
  filters: [
    {
      field: "price",
      operation: ">",
      value: 100,
    },
    {
      field: "category",
      operation: "in",
      value: [
        "product",
        "service",
      ],
    },
  ],
};
```

## Fields

| Field                                                                                                                                        | Type                                                                                                                                         | Required                                                                                                                                     | Description                                                                                                                                  | Example                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`                                                                                                                                      | *string*                                                                                                                                     | :heavy_check_mark:                                                                                                                           | Query string                                                                                                                                 | What is the capital of France?                                                                                                               |
| `prefilterLimit`                                                                                                                             | *number*                                                                                                                                     | :heavy_minus_sign:                                                                                                                           | Number of documents to retrieve from the knowledge base before filtering                                                                     | 10                                                                                                                                           |
| `topK`                                                                                                                                       | *number*                                                                                                                                     | :heavy_minus_sign:                                                                                                                           | Number of documents to return                                                                                                                | 3                                                                                                                                            |
| `filters`                                                                                                                                    | [models.Filter](../models/filter.md)[]                                                                                                       | :heavy_minus_sign:                                                                                                                           | Per-field filters to apply to the query combined with AND                                                                                    | [<br/>{<br/>"field": "price",<br/>"operation": "\u003e",<br/>"value": 100<br/>},<br/>{<br/>"field": "category",<br/>"operation": "in",<br/>"value": [<br/>"product",<br/>"service"<br/>]<br/>}<br/>] |
| `rerank`                                                                                                                                     | *boolean*                                                                                                                                    | :heavy_minus_sign:                                                                                                                           | Whether to rerank the results                                                                                                                |                                                                                                                                              |
| `parentSpanId`                                                                                                                               | *string*                                                                                                                                     | :heavy_minus_sign:                                                                                                                           | Parent span id                                                                                                                               |                                                                                                                                              |