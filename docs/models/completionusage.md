# CompletionUsage

## Example Usage

```typescript
import { CompletionUsage } from "opperai/models";

let value: CompletionUsage = {
  completionTokens: 394512,
  promptTokens: 703732,
  totalTokens: 119453,
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `completionTokens`                                                     | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `promptTokens`                                                         | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `totalTokens`                                                          | *number*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |
| `completionTokensDetails`                                              | [models.CompletionTokensDetails](../models/completiontokensdetails.md) | :heavy_minus_sign:                                                     | N/A                                                                    |
| `promptTokensDetails`                                                  | [models.PromptTokensDetails](../models/prompttokensdetails.md)         | :heavy_minus_sign:                                                     | N/A                                                                    |
| `additionalProperties`                                                 | Record<string, *any*>                                                  | :heavy_minus_sign:                                                     | N/A                                                                    |