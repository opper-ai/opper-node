# RerankDocument

Document to be reranked.

## Example Usage

```typescript
import { RerankDocument } from "opperai/models";

let value: RerankDocument = {
  text: "<value>",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `text`                                         | *string*                                       | :heavy_check_mark:                             | The text content of the document               |
| `metadata`                                     | Record<string, *any*>                          | :heavy_minus_sign:                             | Optional metadata associated with the document |