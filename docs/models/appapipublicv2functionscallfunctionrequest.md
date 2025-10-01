# AppApiPublicV2FunctionsCallFunctionRequest

## Example Usage

```typescript
import { AppApiPublicV2FunctionsCallFunctionRequest } from "opperai/models";

let value: AppApiPublicV2FunctionsCallFunctionRequest = {
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
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `input`                                                                                    | *any*                                                                                      | :heavy_minus_sign:                                                                         | Input to the function                                                                      | {<br/>"x": 4,<br/>"y": 5<br/>}                                                             |
| `parentSpanId`                                                                             | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |                                                                                            |
| `examples`                                                                                 | [models.ExampleIn](../models/examplein.md)[]                                               | :heavy_minus_sign:                                                                         | N/A                                                                                        | [<br/>{<br/>"comment": "Adds two numbers",<br/>"input": {<br/>"x": 1,<br/>"y": 3<br/>},<br/>"output": {<br/>"sum": 4<br/>}<br/>}<br/>] |
| `tags`                                                                                     | Record<string, *string*>                                                                   | :heavy_minus_sign:                                                                         | Tags to add to the call event                                                              | {<br/>"tag": "value"<br/>}                                                                 |