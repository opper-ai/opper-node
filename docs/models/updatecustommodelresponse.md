# UpdateCustomModelResponse

## Example Usage

```typescript
import { UpdateCustomModelResponse } from "opperai";

let value: UpdateCustomModelResponse = {
  id: "23f9e198-09a9-4460-bde6-411ae908856d",
  name: "<value>",
  identifier: "<value>",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `id`                                           | *string*                                       | :heavy_check_mark:                             | The ID of the custom language model            |
| `name`                                         | *string*                                       | :heavy_check_mark:                             | The name of the custom language model          |
| `identifier`                                   | *string*                                       | :heavy_check_mark:                             | The identifier of the custom language model    |
| `extra`                                        | Record<string, *any*>                          | :heavy_minus_sign:                             | Extra metadata about the custom language model |