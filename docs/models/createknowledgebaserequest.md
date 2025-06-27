# CreateKnowledgeBaseRequest

## Example Usage

```typescript
import { CreateKnowledgeBaseRequest } from "opperai";

let value: CreateKnowledgeBaseRequest = {
  name: "<value>",
};
```

## Fields

| Field                                             | Type                                              | Required                                          | Description                                       | Example                                           |
| ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `name`                                            | *string*                                          | :heavy_check_mark:                                | N/A                                               |                                                   |
| `embeddingModel`                                  | *string*                                          | :heavy_minus_sign:                                | The embedding model to use for the knowledge base | azure/text-embedding-3-large                      |