# AddKnowledgeKnowledgeBaseIdAddPostRequest

## Example Usage

```typescript
import { AddKnowledgeKnowledgeBaseIdAddPostRequest } from "opperai/models/operations";

let value: AddKnowledgeKnowledgeBaseIdAddPostRequest = {
  knowledgeBaseId: "e9857567-c492-43e1-b32c-3a33d11848ee",
  addRequest: {
    key: "paris_123",
    content: "The capital of France is Paris",
    metadata: {
      "category": "product",
      "price": 100,
    },
  },
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `knowledgeBaseId`                               | *string*                                        | :heavy_check_mark:                              | The id of the knowledge base to add the data to |
| `addRequest`                                    | [models.AddRequest](../../models/addrequest.md) | :heavy_check_mark:                              | N/A                                             |