# ListModelAliasesResponseItem

## Example Usage

```typescript
import { ListModelAliasesResponseItem } from "opperai/models";

let value: ListModelAliasesResponseItem = {
  id: "6a150009-cfab-43c5-b0ca-848611948f54",
  name: "<value>",
  fallbackModels: [
    "<value 1>",
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