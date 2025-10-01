# AddRequest

## Example Usage

```typescript
import { AddRequest } from "opperai/models";

let value: AddRequest = {
  key: "paris_123",
  content: "The capital of France is Paris",
  metadata: {
    "category": "product",
    "price": 100,
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    | Example                                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `key`                                                                          | *string*                                                                       | :heavy_minus_sign:                                                             | The key of the document                                                        | paris_123                                                                      |
| `content`                                                                      | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            | The capital of France is Paris                                                 |
| `metadata`                                                                     | Record<string, *any*>                                                          | :heavy_minus_sign:                                                             | The metadata of the document                                                   | {<br/>"category": "product",<br/>"price": 100<br/>}                            |
| `configuration`                                                                | [models.TextProcessingConfiguration](../models/textprocessingconfiguration.md) | :heavy_minus_sign:                                                             | The configuration for the document                                             |                                                                                |