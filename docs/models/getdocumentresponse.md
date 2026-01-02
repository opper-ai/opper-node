# GetDocumentResponse

## Example Usage

```typescript
import { GetDocumentResponse } from "opperai/models";

let value: GetDocumentResponse = {
  id: "8fb5c540-5f1b-484a-9b44-cfdacdff38c8",
  key: "paris_123",
  segments: [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      content: "The capital of France is Paris.",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      content: "Paris is known for the Eiffel Tower.",
    },
  ],
  metadata: {
    "category": "product",
    "price": 100,
  },
};
```

## Fields

| Field                                                                                                                                                                                                   | Type                                                                                                                                                                                                    | Required                                                                                                                                                                                                | Description                                                                                                                                                                                             | Example                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                                                                                                    | *string*                                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                      | The id of the document                                                                                                                                                                                  |                                                                                                                                                                                                         |
| `key`                                                                                                                                                                                                   | *string*                                                                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                      | The key of the document                                                                                                                                                                                 | paris_123                                                                                                                                                                                               |
| `segments`                                                                                                                                                                                              | [models.DocumentSegment](../models/documentsegment.md)[]                                                                                                                                                | :heavy_check_mark:                                                                                                                                                                                      | The content segments of the document. Documents are split into segments for indexing, and segments may have overlapping text.                                                                           | [<br/>{<br/>"content": "The capital of France is Paris.",<br/>"id": "123e4567-e89b-12d3-a456-426614174000"<br/>},<br/>{<br/>"content": "Paris is known for the Eiffel Tower.",<br/>"id": "123e4567-e89b-12d3-a456-426614174001"<br/>}<br/>] |
| `metadata`                                                                                                                                                                                              | Record<string, *any*>                                                                                                                                                                                   | :heavy_minus_sign:                                                                                                                                                                                      | The metadata of the document                                                                                                                                                                            | {<br/>"category": "product",<br/>"price": 100<br/>}                                                                                                                                                     |