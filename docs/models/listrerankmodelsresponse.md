# ListRerankModelsResponse

Response model for listing rerank models.

## Example Usage

```typescript
import { ListRerankModelsResponse } from "opperai/models";

let value: ListRerankModelsResponse = {
  hostingProvider: "Cohere",
  name: "rerank-v3.5",
  location: "US",
  costPerRequest: 0.002,
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        | Example                            |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `hostingProvider`                  | *string*                           | :heavy_check_mark:                 | The hosting provider of the model  | Cohere                             |
| `name`                             | *string*                           | :heavy_check_mark:                 | The name of the model              | rerank-v3.5                        |
| `location`                         | *string*                           | :heavy_check_mark:                 | The location of the model          | US                                 |
| `costPerRequest`                   | *number*                           | :heavy_minus_sign:                 | The cost in USD per rerank request | 0.002                              |