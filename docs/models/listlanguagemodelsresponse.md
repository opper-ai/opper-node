# ListLanguageModelsResponse

## Example Usage

```typescript
import { ListLanguageModelsResponse } from "opperai/models";

let value: ListLanguageModelsResponse = {
  hostingProvider: "azure",
  name: "azure/gpt-4o-eu",
  location: "us",
  inputCostPerToken: 0.00015,
  outputCostPerToken: 0.0006,
};
```

## Fields

| Field                                | Type                                 | Required                             | Description                          | Example                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `hostingProvider`                    | *string*                             | :heavy_check_mark:                   | The hosting provider of the model    | azure                                |
| `name`                               | *string*                             | :heavy_check_mark:                   | The name of the model                | azure/gpt-4o-eu                      |
| `location`                           | *string*                             | :heavy_check_mark:                   | The location of the model            | us                                   |
| `inputCostPerToken`                  | *number*                             | :heavy_minus_sign:                   | The cost in USD per token for input  | 0.00015                              |
| `outputCostPerToken`                 | *number*                             | :heavy_minus_sign:                   | The cost in USD per token for output | 0.0006                               |