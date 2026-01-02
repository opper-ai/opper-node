# OCRDocument

Document specification for OCR processing.

## Example Usage

```typescript
import { OCRDocument } from "opperai/models";

let value: OCRDocument = {
  type: "document_url",
};
```

## Fields

| Field                                                                       | Type                                                                        | Required                                                                    | Description                                                                 | Example                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `type`                                                                      | *string*                                                                    | :heavy_check_mark:                                                          | Document type: 'document_url', 'image_url', or 'base64'                     | document_url                                                                |
| `documentUrl`                                                               | *string*                                                                    | :heavy_minus_sign:                                                          | URL to the document (PDF or image) to process. Use with type='document_url' |                                                                             |
| `imageUrl`                                                                  | *string*                                                                    | :heavy_minus_sign:                                                          | URL to an image to process. Use with type='image_url'                       |                                                                             |
| `documentName`                                                              | *string*                                                                    | :heavy_minus_sign:                                                          | Name of the document. Use with type='base64'                                |                                                                             |
| `content`                                                                   | *string*                                                                    | :heavy_minus_sign:                                                          | Base64-encoded content of the document. Use with type='base64'              |                                                                             |