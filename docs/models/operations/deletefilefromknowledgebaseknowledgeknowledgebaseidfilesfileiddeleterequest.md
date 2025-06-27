# DeleteFileFromKnowledgeBaseKnowledgeKnowledgeBaseIdFilesFileIdDeleteRequest

## Example Usage

```typescript
import { DeleteFileFromKnowledgeBaseKnowledgeKnowledgeBaseIdFilesFileIdDeleteRequest } from "opperai/models/operations";

let value:
  DeleteFileFromKnowledgeBaseKnowledgeKnowledgeBaseIdFilesFileIdDeleteRequest =
    {
      knowledgeBaseId: "c3b475a0-4ade-436a-8c15-89fb140e7f81",
      fileId: "484f4259-dd3b-43b3-94e6-fb18219b1272",
    };
```

## Fields

| Field                        | Type                         | Required                     | Description                  |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| `knowledgeBaseId`            | *string*                     | :heavy_check_mark:           | The id of the knowledge base |
| `fileId`                     | *string*                     | :heavy_check_mark:           | The id of the file to delete |