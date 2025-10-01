# UpdateCustomModelModelsCustomModelIdPatchRequest

## Example Usage

```typescript
import { UpdateCustomModelModelsCustomModelIdPatchRequest } from "opperai/models/operations";

let value: UpdateCustomModelModelsCustomModelIdPatchRequest = {
  modelId: "94355625-8250-4390-8764-7e6e0fb25bf0",
  updateCustomModelRequest: {},
};
```

## Fields

| Field                                                                       | Type                                                                        | Required                                                                    | Description                                                                 |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `modelId`                                                                   | *string*                                                                    | :heavy_check_mark:                                                          | The ID of the custom language model to update                               |
| `updateCustomModelRequest`                                                  | [models.UpdateCustomModelRequest](../../models/updatecustommodelrequest.md) | :heavy_check_mark:                                                          | N/A                                                                         |