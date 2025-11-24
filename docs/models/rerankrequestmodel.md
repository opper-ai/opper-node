# RerankRequestModel

Request model for reranking.

## Example Usage

```typescript
import { RerankRequestModel } from "opperai/models";

let value: RerankRequestModel = {
  query: "<value>",
  documents: [],
  model: "Prius",
};
```

## Fields

| Field                                                         | Type                                                          | Required                                                      | Description                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `query`                                                       | *string*                                                      | :heavy_check_mark:                                            | The search query to rank documents against                    |
| `documents`                                                   | [models.RerankDocument](../models/rerankdocument.md)[]        | :heavy_check_mark:                                            | List of documents to rerank                                   |
| `model`                                                       | *string*                                                      | :heavy_check_mark:                                            | The reranking model to use                                    |
| `topK`                                                        | *number*                                                      | :heavy_minus_sign:                                            | Number of top documents to return. Defaults to all documents. |
| `returnDocuments`                                             | *boolean*                                                     | :heavy_minus_sign:                                            | Whether to return document content in the response            |
| `maxChunksPerDoc`                                             | *number*                                                      | :heavy_minus_sign:                                            | Maximum number of chunks per document                         |