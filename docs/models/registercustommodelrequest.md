# RegisterCustomModelRequest

## Example Usage

```typescript
import { RegisterCustomModelRequest } from "opperai/models";

let value: RegisterCustomModelRequest = {
  name: "<value>",
  identifier: "<value>",
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `name`                                         | *string*                                       | :heavy_check_mark:                             | The name of the custom language model          |
| `identifier`                                   | *string*                                       | :heavy_check_mark:                             | The identifier of the custom language model    |
| `extra`                                        | Record<string, *any*>                          | :heavy_minus_sign:                             | Extra metadata about the custom language model |
| `apiKey`                                       | *string*                                       | :heavy_minus_sign:                             | The API key of the custom language model       |