# ListFunctionsResponseItem

## Example Usage

```typescript
import { ListFunctionsResponseItem } from "opperai";

let value: ListFunctionsResponseItem = {
  id: "de4d3f01-4815-4bf2-8db1-c7371a2e3679",
  name: "my-function",
  revisionId: "8d3f4d1a-320c-4855-ba5b-547a63cb0c82",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   | Example                                       |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `id`                                          | *string*                                      | :heavy_check_mark:                            | The ID of the function                        |                                               |
| `name`                                        | *string*                                      | :heavy_check_mark:                            | The name of the function                      | my-function                                   |
| `description`                                 | *string*                                      | :heavy_minus_sign:                            | The description of the function               |                                               |
| `instructions`                                | *string*                                      | :heavy_minus_sign:                            | The instructions of the function              |                                               |
| `model`                                       | *models.TModel*                               | :heavy_minus_sign:                            | The model of the function                     |                                               |
| `revisionId`                                  | *string*                                      | :heavy_check_mark:                            | The ID of the latest revision of the function |                                               |