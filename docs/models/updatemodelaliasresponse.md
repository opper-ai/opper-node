# UpdateModelAliasResponse

## Example Usage

```typescript
import { UpdateModelAliasResponse } from "opperai/models";

let value: UpdateModelAliasResponse = {
  id: "d2b1c85c-1c02-44e2-8c5b-36aacc74833a",
  name: "<value>",
  fallbackModels: [
    "<value 1>",
    "<value 2>",
  ],
};
```

## Fields

| Field                                           | Type                                            | Required                                        | Description                                     |
| ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `id`                                            | *string*                                        | :heavy_check_mark:                              | The ID of the model alias                       |
| `name`                                          | *string*                                        | :heavy_check_mark:                              | The name of the model alias                     |
| `fallbackModels`                                | *string*[]                                      | :heavy_check_mark:                              | Ordered list of model names to try as fallbacks |
| `description`                                   | *string*                                        | :heavy_minus_sign:                              | Optional description of the model alias         |