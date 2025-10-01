# RegisterFileUploadKnowledgeKnowledgeBaseIdRegisterFilePostRequest

## Example Usage

```typescript
import { RegisterFileUploadKnowledgeKnowledgeBaseIdRegisterFilePostRequest } from "opperai/models/operations";

let value: RegisterFileUploadKnowledgeKnowledgeBaseIdRegisterFilePostRequest = {
  knowledgeBaseId: "60f74393-3ed0-4c5a-83c3-b2c9563ec3e4",
  registerFileUploadRequest: {
    filename: "example.pdf",
    fileId: "1ea8fd4c-c52c-4100-8653-01ab93359ed1",
    contentType: "application/pdf",
  },
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `knowledgeBaseId`                                                             | *string*                                                                      | :heavy_check_mark:                                                            | The id of the knowledge base to register the file for                         |
| `registerFileUploadRequest`                                                   | [models.RegisterFileUploadRequest](../../models/registerfileuploadrequest.md) | :heavy_check_mark:                                                            | N/A                                                                           |