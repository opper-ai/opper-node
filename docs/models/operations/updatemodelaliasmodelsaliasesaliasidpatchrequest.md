# UpdateModelAliasModelsAliasesAliasIdPatchRequest

## Example Usage

```typescript
import { UpdateModelAliasModelsAliasesAliasIdPatchRequest } from "opperai/models/operations";

let value: UpdateModelAliasModelsAliasesAliasIdPatchRequest = {
  aliasId: "b428ee36-e95e-4e20-99e4-e839c7e02a64",
  updateModelAliasRequest: {},
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `aliasId`                                                                 | *string*                                                                  | :heavy_check_mark:                                                        | The ID of the model alias to update                                       |
| `updateModelAliasRequest`                                                 | [models.UpdateModelAliasRequest](../../models/updatemodelaliasrequest.md) | :heavy_check_mark:                                                        | N/A                                                                       |