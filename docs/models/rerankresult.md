# RerankResult

A single reranking result.

## Example Usage

```typescript
import { RerankResult } from "opperai/models";

let value: RerankResult = {
  index: 168360,
  relevanceScore: 4843.57,
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `index`                                              | *number*                                             | :heavy_check_mark:                                   | Original index of the document                       |
| `relevanceScore`                                     | *number*                                             | :heavy_check_mark:                                   | Relevance score between 0 and 1                      |
| `document`                                           | [models.RerankDocument](../models/rerankdocument.md) | :heavy_minus_sign:                                   | The document content (if return_documents=True)      |