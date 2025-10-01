# DeleteKnowledgeBaseRequest

## Example Usage

```typescript
import { DeleteKnowledgeBaseRequest } from "opperai/models";

let value: DeleteKnowledgeBaseRequest = {
  filters: [
    {
      field: "category",
      operation: "=",
      value: "outdated",
    },
    {
      field: "version",
      operation: "<",
      value: 2,
    },
  ],
};
```

## Fields

| Field                                                                                                                         | Type                                                                                                                          | Required                                                                                                                      | Description                                                                                                                   | Example                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `filters`                                                                                                                     | [models.Filter](../models/filter.md)[]                                                                                        | :heavy_minus_sign:                                                                                                            | Filters to apply for deletion. If no filters are provided, the entire knowledge base will be deleted.                         | [<br/>{<br/>"field": "category",<br/>"operation": "=",<br/>"value": "outdated"<br/>},<br/>{<br/>"field": "version",<br/>"operation": "\u003c",<br/>"value": 2<br/>}<br/>] |