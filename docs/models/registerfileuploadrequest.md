# RegisterFileUploadRequest

## Example Usage

```typescript
import { RegisterFileUploadRequest } from "opperai/models";

let value: RegisterFileUploadRequest = {
  filename: "example.pdf",
  fileId: "a6985676-1a18-4da3-8dc0-13029ff25547",
  contentType: "application/pdf",
  metadata: {
    "category": "legal",
    "client": "acme",
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    | Example                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `filename`                                                                     | *string*                                                                       | :heavy_check_mark:                                                             | The filename of the file to register                                           | example.pdf                                                                    |
| `fileId`                                                                       | *string*                                                                       | :heavy_check_mark:                                                             | The id of the file to register                                                 |                                                                                |
| `contentType`                                                                  | *string*                                                                       | :heavy_check_mark:                                                             | The content type of the file to register                                       | application/pdf                                                                |
| `configuration`                                                                | [models.TextProcessingConfiguration](../models/textprocessingconfiguration.md) | :heavy_minus_sign:                                                             | The configuration for the file to register                                     |                                                                                |
| `metadata`                                                                     | Record<string, *any*>                                                          | :heavy_minus_sign:                                                             | Optional metadata to attach to the file                                        | {<br/>"category": "legal",<br/>"client": "acme"<br/>}                          |