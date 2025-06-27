# ChatCompletionTokenLogprob

## Example Usage

```typescript
import { ChatCompletionTokenLogprob } from "opperai";

let value: ChatCompletionTokenLogprob = {
  token: "<value>",
  logprob: 4190.05,
  topLogprobs: [
    {
      token: "<value>",
      logprob: 3180.5,
    },
  ],
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `token`                                        | *string*                                       | :heavy_check_mark:                             | N/A                                            |
| `bytes`                                        | *number*[]                                     | :heavy_minus_sign:                             | N/A                                            |
| `logprob`                                      | *number*                                       | :heavy_check_mark:                             | N/A                                            |
| `topLogprobs`                                  | [models.TopLogprob](../models/toplogprob.md)[] | :heavy_check_mark:                             | N/A                                            |
| `additionalProperties`                         | Record<string, *any*>                          | :heavy_minus_sign:                             | N/A                                            |