# PutSteeringFunctionsFunctionIdConfigSteeringPutRequest

## Example Usage

```typescript
import { PutSteeringFunctionsFunctionIdConfigSteeringPutRequest } from "opperai/models/operations";

let value: PutSteeringFunctionsFunctionIdConfigSteeringPutRequest = {
  functionId: "d2ae10d7-4676-46ca-b5a8-3462451ad0df",
  steeringConfig: {},
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `functionId`                                            | *string*                                                | :heavy_check_mark:                                      | The id of the function whose steering config to update  |
| `steeringConfig`                                        | [models.SteeringConfig](../../models/steeringconfig.md) | :heavy_check_mark:                                      | N/A                                                     |