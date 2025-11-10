# RerankResponseModel

Response model for reranking.

## Example Usage

```typescript
import { RerankResponseModel } from "opperai/models";

let value: RerankResponseModel = {
  id: "<id>",
  results: [],
  model: "CX-9",
  usage: {
    "key": "<value>",
  },
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `id`                                               | *string*                                           | :heavy_check_mark:                                 | Unique identifier for this rerank request          |
| `results`                                          | [models.RerankResult](../models/rerankresult.md)[] | :heavy_check_mark:                                 | Ranked results                                     |
| `model`                                            | *string*                                           | :heavy_check_mark:                                 | The model used for reranking                       |
| `usage`                                            | Record<string, *any*>                              | :heavy_check_mark:                                 | Usage information                                  |
| `cost`                                             | [models.RerankCost](../models/rerankcost.md)       | :heavy_minus_sign:                                 | Cost information for this rerank request           |