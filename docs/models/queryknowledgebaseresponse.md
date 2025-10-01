# QueryKnowledgeBaseResponse

## Example Usage

```typescript
import { QueryKnowledgeBaseResponse } from "opperai/models";

let value: QueryKnowledgeBaseResponse = {
  id: "892ec47b-5977-485f-82db-c42628816bfa",
  key: "paris_123",
  content: "The capital of France is Paris",
  metadata: {
    "category": "product",
    "price": 100,
  },
  score: 0.95,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             | Example                                 |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `id`                                    | *string*                                | :heavy_check_mark:                      | The id of the document                  |                                         |
| `key`                                   | *string*                                | :heavy_check_mark:                      | The key of the document                 | paris_123                               |
| `content`                               | *string*                                | :heavy_check_mark:                      | The content of the document             | The capital of France is Paris          |
| `metadata`                              | Record<string, *any*>                   | :heavy_check_mark:                      | The metadata of the document            | {<br/>"category": "product",<br/>"price": 100<br/>} |
| `score`                                 | *number*                                | :heavy_check_mark:                      | The score of the document               | 0.95                                    |