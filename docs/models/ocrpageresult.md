# OCRPageResult

Result for a single processed page.

## Example Usage

```typescript
import { OCRPageResult } from "opperai/models";

let value: OCRPageResult = {
  index: 465598,
  markdown: "<value>",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `index`                                                    | *number*                                                   | :heavy_check_mark:                                         | Page index (0-based)                                       |
| `markdown`                                                 | *string*                                                   | :heavy_check_mark:                                         | Extracted text in markdown format                          |
| `dimensions`                                               | [models.OCRPageDimensions](../models/ocrpagedimensions.md) | :heavy_minus_sign:                                         | Page dimensions                                            |
| `images`                                                   | [models.OCRPageImage](../models/ocrpageimage.md)[]         | :heavy_minus_sign:                                         | Extracted images from the page                             |