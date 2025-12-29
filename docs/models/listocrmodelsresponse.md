# ListOCRModelsResponse

Response model for listing OCR models.

## Example Usage

```typescript
import { ListOCRModelsResponse } from "opperai/models";

let value: ListOCRModelsResponse = {
  hostingProvider: "Mistral",
  name: "mistral/ocr-latest",
  location: "EU",
  costPerPage: 0.001,
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        | Example                            |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `hostingProvider`                  | *string*                           | :heavy_check_mark:                 | The hosting provider of the model  | Mistral                            |
| `name`                             | *string*                           | :heavy_check_mark:                 | The name of the model              | mistral/ocr-latest                 |
| `location`                         | *string*                           | :heavy_check_mark:                 | The location of the model          | EU                                 |
| `costPerPage`                      | *number*                           | :heavy_minus_sign:                 | The cost in USD per page processed | 0.001                              |