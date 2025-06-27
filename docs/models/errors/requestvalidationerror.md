# RequestValidationError

## Example Usage

```typescript
import { RequestValidationError } from "opperai/models/errors";

// No examples available for this model
```

## Fields

| Field                                                                                                         | Type                                                                                                          | Required                                                                                                      | Description                                                                                                   | Example                                                                                                       |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                        | *string*                                                                                                      | :heavy_minus_sign:                                                                                            | N/A                                                                                                           |                                                                                                               |
| `message`                                                                                                     | *string*                                                                                                      | :heavy_minus_sign:                                                                                            | N/A                                                                                                           |                                                                                                               |
| `detail`                                                                                                      | *any*                                                                                                         | :heavy_check_mark:                                                                                            | Where the error occurred and the error message                                                                | {<br/>"input": "input value",<br/>"loc": [<br/>"path",<br/>"to",<br/>"error"<br/>],<br/>"msg": "error message",<br/>"type": "type of error"<br/>} |