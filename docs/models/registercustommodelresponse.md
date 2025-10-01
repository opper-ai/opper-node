# RegisterCustomModelResponse

## Example Usage

```typescript
import { RegisterCustomModelResponse } from "opperai/models";

let value: RegisterCustomModelResponse = {
  id: "46cc7832-4309-4950-89ff-03ef58ee15fe",
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