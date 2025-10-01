# CreateEmbeddingResponse

## Example Usage

```typescript
import { CreateEmbeddingResponse } from "opperai/models";

let value: CreateEmbeddingResponse = {
  model: "text-embedding-3-large",
  data: [
    {
      "embedding": [
        0.1,
        0.2,
        0.3,
      ],
      "index": 0,
    },
  ],
  usage: {
    "prompt_tokens": 100,
    "total_tokens": 100,
  },
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     | Example                                         |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `model`                                         | *string*                                        | :heavy_check_mark:                              | The model that was used to create the embedding | text-embedding-3-large                          |
| `data`                                          | Record<string, *any*>[]                         | :heavy_check_mark:                              | The embedding data                              | {<br/>"embedding": [<br/>0.1,<br/>0.2,<br/>0.3<br/>],<br/>"index": 0<br/>} |
| `usage`                                         | Record<string, *any*>                           | :heavy_check_mark:                              | The usage information                           | {<br/>"prompt_tokens": 100,<br/>"total_tokens": 100<br/>} |