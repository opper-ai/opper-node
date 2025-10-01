# CallFunctionRevisionFunctionsFunctionIdCallRevisionIdPostRequest

## Example Usage

```typescript
import { CallFunctionRevisionFunctionsFunctionIdCallRevisionIdPostRequest } from "opperai/models/operations";

let value: CallFunctionRevisionFunctionsFunctionIdCallRevisionIdPostRequest = {
  functionId: "bd5c888f-ced7-4001-933d-0de6d9e4c217",
  revisionId: "7845175b-c54e-4fe1-b8fb-1e34dbf28957",
  appApiPublicV2FunctionsCallFunctionRequest: {
    input: {
      "x": 4,
      "y": 5,
    },
    examples: [
      {
        input: {
          "x": 1,
          "y": 3,
        },
        output: {
          "sum": 4,
        },
        comment: "Adds two numbers",
      },
    ],
    tags: {
      "tag": "value",
    },
  },
};
```

## Fields

| Field                                                                                                           | Type                                                                                                            | Required                                                                                                        | Description                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `functionId`                                                                                                    | *string*                                                                                                        | :heavy_check_mark:                                                                                              | The id of the function to call                                                                                  |
| `revisionId`                                                                                                    | *string*                                                                                                        | :heavy_check_mark:                                                                                              | The id of the revision to call                                                                                  |
| `appApiPublicV2FunctionsCallFunctionRequest`                                                                    | [models.AppApiPublicV2FunctionsCallFunctionRequest](../../models/appapipublicv2functionscallfunctionrequest.md) | :heavy_check_mark:                                                                                              | N/A                                                                                                             |