# UpdateFunctionFunctionsFunctionIdPatchRequest

## Example Usage

```typescript
import { UpdateFunctionFunctionsFunctionIdPatchRequest } from "opperai/models/operations";

let value: UpdateFunctionFunctionsFunctionIdPatchRequest = {
  functionId: "bbee41d4-103b-4ab3-8023-56ace721f1a5",
  updateFunctionRequest: {
    name: "my-function",
    description:
      "This function is used to add two numbers and return the result.",
    instructions:
      "You are a calculator that adds two numbers and returns the result.",
    inputSchema: {
      "properties": {
        "x": {
          "title": "X",
          "type": "integer",
        },
        "y": {
          "title": "Y",
          "type": "integer",
        },
      },
      "required": [
        "x",
        "y",
      ],
      "title": "OpperInputExample",
      "type": "object",
    },
    outputSchema: {
      "properties": {
        "sum": {
          "title": "Sum",
          "type": "integer",
        },
      },
      "required": [
        "sum",
      ],
      "title": "OpperOutputExample",
      "type": "object",
    },
    configuration: {
      "beta.invocation.input_validation.enabled": false,
      "beta.invocation.xml_mode.enabled": false,
      "invocation.cache.ttl": 0,
      "invocation.few_shot.count": 3,
      "invocation.structured_generation.max_attempts": 5,
    },
  },
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `functionId`                                                          | *string*                                                              | :heavy_check_mark:                                                    | Unique identifier of the function given as a UUID                     |
| `updateFunctionRequest`                                               | [models.UpdateFunctionRequest](../../models/updatefunctionrequest.md) | :heavy_check_mark:                                                    | N/A                                                                   |