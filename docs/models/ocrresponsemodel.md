# OCRResponseModel

Response model for OCR processing.

## Example Usage

```typescript
import { OCRResponseModel } from "opperai/models";

let value: OCRResponseModel = {
  id: "<id>",
  pages: [],
  model: "Explorer",
  usageInfo: {
    pagesProcessed: 465048,
  },
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `id`                                                 | *string*                                             | :heavy_check_mark:                                   | Unique identifier for this OCR request               |
| `pages`                                              | [models.OCRPageResult](../models/ocrpageresult.md)[] | :heavy_check_mark:                                   | Processed page results                               |
| `model`                                              | *string*                                             | :heavy_check_mark:                                   | The model used for OCR                               |
| `usageInfo`                                          | [models.OCRUsageInfo](../models/ocrusageinfo.md)     | :heavy_check_mark:                                   | Usage information for OCR processing.                |
| `cost`                                               | [models.OCRCost](../models/ocrcost.md)               | :heavy_minus_sign:                                   | Cost information for this OCR request                |