# CreateModelAliasRequest

## Example Usage

```typescript
import { CreateModelAliasRequest } from "opperai/models";

let value: CreateModelAliasRequest = {
  name: "<value>",
  fallbackModels: [
    "<value 1>",
  ],
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `name`                                          | *string*                                        | :heavy_check_mark:                              | The name of the model alias                     |
| `fallbackModels`                                | *string*[]                                      | :heavy_check_mark:                              | Ordered list of model names to try as fallbacks |
| `description`                                   | *string*                                        | :heavy_minus_sign:                              | Optional description of the model alias         |