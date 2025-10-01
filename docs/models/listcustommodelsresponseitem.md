# ListCustomModelsResponseItem

## Example Usage

```typescript
import { ListCustomModelsResponseItem } from "opperai/models";

let value: ListCustomModelsResponseItem = {
  id: "6c7d9ddc-0863-4699-9e7d-cb1ef13079c8",
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