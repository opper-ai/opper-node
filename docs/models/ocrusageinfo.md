# OCRUsageInfo

Usage information for OCR processing.

## Example Usage

```typescript
import { OCRUsageInfo } from "opperai/models";

let value: OCRUsageInfo = {
  pagesProcessed: 329301,
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `pagesProcessed`                            | *number*                                    | :heavy_check_mark:                          | Number of pages processed                   |
| `docSizeBytes`                              | *number*                                    | :heavy_minus_sign:                          | Size of the document in bytes               |
| `processingTimeSeconds`                     | *number*                                    | :heavy_minus_sign:                          | Total processing time in seconds            |
| `timePerPageSeconds`                        | *number*                                    | :heavy_minus_sign:                          | Average processing time per page in seconds |
| `appliedSettings`                           | Record<string, *any*>                       | :heavy_minus_sign:                          | Settings used for processing                |