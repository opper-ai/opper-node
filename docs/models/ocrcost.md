# OCRCost

Cost information for OCR processing.

## Example Usage

```typescript
import { OCRCost } from "opperai/models";

let value: OCRCost = {
  generation: 4481.05,
  platform: 822,
  total: 7372.06,
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `generation`                                        | *number*                                            | :heavy_check_mark:                                  | Cost of the OCR request in USD                      |
| `platform`                                          | *number*                                            | :heavy_check_mark:                                  | Platform fee in USD (percentage of generation cost) |
| `total`                                             | *number*                                            | :heavy_check_mark:                                  | Total cost in USD (generation + platform)           |