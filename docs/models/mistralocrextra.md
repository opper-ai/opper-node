# MistralOCRExtra

Mistral-specific OCR parameters.

## Example Usage

```typescript
import { MistralOCRExtra } from "opperai/models";

let value: MistralOCRExtra = {};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `extractHeader`                                    | *boolean*                                          | :heavy_minus_sign:                                 | Whether to extract header content from pages       |
| `extractFooter`                                    | *boolean*                                          | :heavy_minus_sign:                                 | Whether to extract footer content from pages       |
| `tableFormat`                                      | *string*                                           | :heavy_minus_sign:                                 | Format for extracted tables: 'markdown' or 'html'  |
| `bboxAnnotationFormat`                             | Record<string, *any*>                              | :heavy_minus_sign:                                 | JSON schema for structured bounding box extraction |
| `documentAnnotationFormat`                         | Record<string, *any*>                              | :heavy_minus_sign:                                 | JSON schema for structured document extraction     |