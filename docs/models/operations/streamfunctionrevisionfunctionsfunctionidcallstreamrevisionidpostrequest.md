# StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostRequest

## Example Usage

```typescript
import { StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostRequest } from "opperai/models/operations";

let value:
  StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostRequest = {
    functionId: "6c1256fb-29fc-4d4a-9db7-250250736273",
    revisionId: "c8d8f228-67ba-4b69-9ce9-cc136b704f92",
  };
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `functionId`                                                                                                    | *string*                                                                                                        | :heavy_check_mark:                                                                                              | The id of the function to call                                                                                  |
| `revisionId`                                                                                                    | *string*                                                                                                        | :heavy_check_mark:                                                                                              | The id of the revision to call                                                                                  |
| `appApiPublicV2FunctionsCallFunctionRequest`                                                                    | [models.AppApiPublicV2FunctionsCallFunctionRequest](../../models/appapipublicv2functionscallfunctionrequest.md) | :heavy_check_mark:                                                                                              | N/A                                                                                                             |