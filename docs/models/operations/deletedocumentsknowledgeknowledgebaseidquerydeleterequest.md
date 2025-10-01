# DeleteDocumentsKnowledgeKnowledgeBaseIdQueryDeleteRequest

## Example Usage

```typescript
import { DeleteDocumentsKnowledgeKnowledgeBaseIdQueryDeleteRequest } from "opperai/models/operations";

let value: DeleteDocumentsKnowledgeKnowledgeBaseIdQueryDeleteRequest = {
  knowledgeBaseId: "d7d28a5c-3282-4cca-bba9-b8020756f094",
};
```

## Fields

| Field                                                                           | Type                                                                            | Required                                                                        | Description                                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `knowledgeBaseId`                                                               | *string*                                                                        | :heavy_check_mark:                                                              | The id of the knowledge base to delete or delete documents from                 |
| `deleteKnowledgeBaseRequest`                                                    | [models.DeleteKnowledgeBaseRequest](../../models/deleteknowledgebaserequest.md) | :heavy_minus_sign:                                                              | N/A                                                                             |