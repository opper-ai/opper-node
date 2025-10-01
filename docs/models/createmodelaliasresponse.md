# CreateModelAliasResponse

## Example Usage

```typescript
import { CreateModelAliasResponse } from "opperai/models";

let value: CreateModelAliasResponse = {
  id: "c09a475f-07de-493b-a59f-dd795698794f",
  name: "<value>",
  fallbackModels: [],
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `id`                                            | *string*                                        | :heavy_check_mark:                              | The ID of the model alias                       |
| `name`                                          | *string*                                        | :heavy_check_mark:                              | The name of the model alias                     |
| `fallbackModels`                                | *string*[]                                      | :heavy_check_mark:                              | Ordered list of model names to try as fallbacks |
| `description`                                   | *string*                                        | :heavy_minus_sign:                              | Optional description of the model alias         |