# GetUploadUrlKnowledgeKnowledgeBaseIdUploadUrlGetRequest

## Example Usage

```typescript
import { GetUploadUrlKnowledgeKnowledgeBaseIdUploadUrlGetRequest } from "opperai/models/operations";

let value: GetUploadUrlKnowledgeKnowledgeBaseIdUploadUrlGetRequest = {
  knowledgeBaseId: "5815ea2b-be0c-43f1-bff7-2058bfe5b050",
  filename: "example.pdf",
};
```

## Fields

| Field                                                  | Type                                                   | Required                                               | Description                                            | Example                                                |
| ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------ |
| `knowledgeBaseId`                                      | *string*                                               | :heavy_check_mark:                                     | The id of the knowledge base to get the upload URL for |                                                        |
| `filename`                                             | *string*                                               | :heavy_check_mark:                                     | The filename of the file to upload                     | example.pdf                                            |