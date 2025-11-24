# ListFilesKnowledgeKnowledgeBaseIdFilesGetRequest

## Example Usage

```typescript
import { ListFilesKnowledgeKnowledgeBaseIdFilesGetRequest } from "opperai/models/operations";

let value: ListFilesKnowledgeKnowledgeBaseIdFilesGetRequest = {
  knowledgeBaseId: "40ad6e75-da7e-4914-acc7-dd2c6285c20b",
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `knowledgeBaseId`                               | *string*                                        | :heavy_check_mark:                              | The id of the knowledge base to list files from |
| `offset`                                        | *number*                                        | :heavy_minus_sign:                              | The offset to start the list from               |
| `limit`                                         | *number*                                        | :heavy_minus_sign:                              | The number of files to return                   |