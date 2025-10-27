# ListFunctionsResponseItemOutput

## Example Usage

```typescript
import { ListFunctionsResponseItemOutput } from "opperai/models";

let value: ListFunctionsResponseItemOutput = {
  id: "5b5f1e7b-57a1-46bb-85f6-d8f5b064b0d9",
  name: "my-function",
  revisionId: "1384e066-9b29-416c-b154-fdccf865822f",
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