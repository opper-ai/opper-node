# RerankCost

Cost information for reranking.

## Example Usage

```typescript
import { RerankCost } from "opperai/models";

let value: RerankCost = {
  generation: 6550.99,
  platform: 6205.6,
  total: 8409.58,
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `generation`                                        | *number*                                            | :heavy_check_mark:                                  | Cost of the reranking request in USD                |
| `platform`                                          | *number*                                            | :heavy_check_mark:                                  | Platform fee in USD (percentage of generation cost) |
| `total`                                             | *number*                                            | :heavy_check_mark:                                  | Total cost in USD (generation + platform)           |