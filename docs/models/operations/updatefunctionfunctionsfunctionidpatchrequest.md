# UpdateFunctionFunctionsFunctionIdPatchRequest

## Example Usage

```typescript
import { UpdateFunctionFunctionsFunctionIdPatchRequest } from "opperai/models/operations";

let value: UpdateFunctionFunctionsFunctionIdPatchRequest = {
  functionId: "bbee41d4-103b-4ab3-8023-56ace721f1a5",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `functionId`                                                          | *string*                                                              | :heavy_check_mark:                                                    | Unique identifier of the function given as a UUID                     |
| `updateFunctionRequest`                                               | [models.UpdateFunctionRequest](../../models/updatefunctionrequest.md) | :heavy_check_mark:                                                    | N/A                                                                   |