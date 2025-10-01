# GetModelAliasResponse

## Example Usage

```typescript
import { GetModelAliasResponse } from "opperai/models";

let value: GetModelAliasResponse = {
  id: "a5eda8d5-3425-4779-bc49-5df73213d9bf",
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