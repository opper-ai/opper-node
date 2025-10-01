# CallFunctionFunctionsFunctionIdCallPostRequest

## Example Usage

```typescript
import { CallFunctionFunctionsFunctionIdCallPostRequest } from "opperai/models/operations";

let value: CallFunctionFunctionsFunctionIdCallPostRequest = {
  functionId: "771b74ef-3e63-4e30-89a1-837525070c24",
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
| `appApiPublicV2FunctionsCallFunctionRequest`                                                                    | [models.AppApiPublicV2FunctionsCallFunctionRequest](../../models/appapipublicv2functionscallfunctionrequest.md) | :heavy_check_mark:                                                                                              | N/A                                                                                                             |