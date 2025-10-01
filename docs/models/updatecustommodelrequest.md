# UpdateCustomModelRequest

## Example Usage

```typescript
import { UpdateCustomModelRequest } from "opperai/models";

let value: UpdateCustomModelRequest = {};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `name`                                         | *string*                                       | :heavy_minus_sign:                             | The name of the custom language model          |
| `identifier`                                   | *string*                                       | :heavy_minus_sign:                             | The identifier of the custom language model    |
| `extra`                                        | Record<string, *any*>                          | :heavy_minus_sign:                             | Extra metadata about the custom language model |
| `apiKey`                                       | *string*                                       | :heavy_minus_sign:                             | The API key of the custom language model       |