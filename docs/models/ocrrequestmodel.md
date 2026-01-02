# OCRRequestModel

Request model for OCR processing.

## Example Usage

```typescript
import { OCRRequestModel } from "opperai/models";

let value: OCRRequestModel = {
  model: "mistral/mistral-ocr-latest",
  document: {
    type: "document_url",
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            | Example                                                                                |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `model`                                                                                | *string*                                                                               | :heavy_check_mark:                                                                     | The OCR model to use                                                                   | mistral/mistral-ocr-latest                                                             |
| `document`                                                                             | [models.OCRDocument](../models/ocrdocument.md)                                         | :heavy_check_mark:                                                                     | Document specification for OCR processing.                                             |                                                                                        |
| `pages`                                                                                | *number*[]                                                                             | :heavy_minus_sign:                                                                     | Specific page indices to process (0-based). If not specified, all pages are processed. |                                                                                        |
| `includeImageBase64`                                                                   | *boolean*                                                                              | :heavy_minus_sign:                                                                     | Whether to include base64-encoded images in the response                               |                                                                                        |
| `imageLimit`                                                                           | *number*                                                                               | :heavy_minus_sign:                                                                     | Maximum number of images to extract per page                                           |                                                                                        |
| `imageMinSize`                                                                         | *number*                                                                               | :heavy_minus_sign:                                                                     | Minimum size (width or height in pixels) for images to be included                     |                                                                                        |
| `mistralExtra`                                                                         | [models.MistralOCRExtra](../models/mistralocrextra.md)                                 | :heavy_minus_sign:                                                                     | Mistral-specific OCR parameters                                                        |                                                                                        |