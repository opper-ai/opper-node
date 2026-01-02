# GetDocumentByKeyKnowledgeKnowledgeBaseIdDocumentsDocumentKeyGetRequest

## Example Usage

```typescript
import { GetDocumentByKeyKnowledgeKnowledgeBaseIdDocumentsDocumentKeyGetRequest } from "opperai/models/operations";

let value:
  GetDocumentByKeyKnowledgeKnowledgeBaseIdDocumentsDocumentKeyGetRequest = {
    knowledgeBaseId: "22e9ef8a-96c1-433b-9407-2c87294a8aed",
    documentKey: "<value>",
  };
```

## Fields

| Field                               | Type                                | Required                            | Description                         |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `knowledgeBaseId`                   | *string*                            | :heavy_check_mark:                  | The id of the knowledge base        |
| `documentKey`                       | *string*                            | :heavy_check_mark:                  | The key of the document to retrieve |