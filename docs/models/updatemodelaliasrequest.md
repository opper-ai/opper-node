# UpdateModelAliasRequest

## Example Usage

```typescript
import { UpdateModelAliasRequest } from "opperai/models";

let value: UpdateModelAliasRequest = {};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `name`                                          | *string*                                        | :heavy_minus_sign:                              | The name of the model alias                     |
| `fallbackModels`                                | *string*[]                                      | :heavy_minus_sign:                              | Ordered list of model names to try as fallbacks |
| `description`                                   | *string*                                        | :heavy_minus_sign:                              | Optional description of the model alias         |