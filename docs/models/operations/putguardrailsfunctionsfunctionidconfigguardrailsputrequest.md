# PutGuardrailsFunctionsFunctionIdConfigGuardrailsPutRequest

## Example Usage

```typescript
import { PutGuardrailsFunctionsFunctionIdConfigGuardrailsPutRequest } from "opperai/models/operations";

let value: PutGuardrailsFunctionsFunctionIdConfigGuardrailsPutRequest = {
  functionId: "fa6827de-e4c0-4ae3-b52c-2491197409b0",
  requestBody: [
    {
      check: "<value>",
    },
  ],
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `functionId`                                            | *string*                                                | :heavy_check_mark:                                      | The id of the function whose guardrails to update       |
| `requestBody`                                           | [models.GuardrailItem](../../models/guardrailitem.md)[] | :heavy_check_mark:                                      | N/A                                                     |