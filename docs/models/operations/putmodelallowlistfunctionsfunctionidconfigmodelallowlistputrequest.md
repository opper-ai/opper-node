# PutModelAllowlistFunctionsFunctionIdConfigModelAllowlistPutRequest

## Example Usage

```typescript
import { PutModelAllowlistFunctionsFunctionIdConfigModelAllowlistPutRequest } from "opperai/models/operations";

let value: PutModelAllowlistFunctionsFunctionIdConfigModelAllowlistPutRequest =
  {
    functionId: "1a055152-6a64-459b-bbe4-2e1cd24dd14d",
    modelAllowlist: {},
  };
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `functionId`                                            | *string*                                                | :heavy_check_mark:                                      | The id of the function whose model allowlist to update  |
| `modelAllowlist`                                        | [models.ModelAllowlist](../../models/modelallowlist.md) | :heavy_check_mark:                                      | N/A                                                     |