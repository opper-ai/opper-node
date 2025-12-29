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

| Field                         | Type                          | Required                      | Description                   |
| ----------------------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| `pagesProcessed`              | *number*                      | :heavy_check_mark:            | Number of pages processed     |
| `docSizeBytes`                | *number*                      | :heavy_minus_sign:            | Size of the document in bytes |