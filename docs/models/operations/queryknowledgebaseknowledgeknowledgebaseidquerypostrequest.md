# QueryKnowledgeBaseKnowledgeKnowledgeBaseIdQueryPostRequest

## Example Usage

```typescript
import { QueryKnowledgeBaseKnowledgeKnowledgeBaseIdQueryPostRequest } from "opperai/models/operations";

let value: QueryKnowledgeBaseKnowledgeKnowledgeBaseIdQueryPostRequest = {
  knowledgeBaseId: "ea035277-cfde-4959-851d-1fb240bbd4ba",
  queryKnowledgeBaseRequest: {
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
  },
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `knowledgeBaseId`                                                             | *string*                                                                      | :heavy_check_mark:                                                            | The id of the knowledge base to query                                         |
| `queryKnowledgeBaseRequest`                                                   | [models.QueryKnowledgeBaseRequest](../../models/queryknowledgebaserequest.md) | :heavy_check_mark:                                                            | N/A                                                                           |