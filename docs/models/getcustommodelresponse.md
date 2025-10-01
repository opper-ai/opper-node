# GetCustomModelResponse

## Example Usage

```typescript
import { GetCustomModelResponse } from "opperai/models";

let value: GetCustomModelResponse = {
  id: "7e28c03a-aa0c-4808-992e-2b8b0c461bea",
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