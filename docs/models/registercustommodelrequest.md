# RegisterCustomModelRequest

## Example Usage

```typescript
import { RegisterCustomModelRequest } from "opperai/models";

let value: RegisterCustomModelRequest = {
  name: "<value>",
  identifier: "<value>",
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `name`                                                                        | *string*                                                                      | :heavy_check_mark:                                                            | The name of the custom language model                                         |
| `identifier`                                                                  | *string*                                                                      | :heavy_check_mark:                                                            | The identifier of the custom language model (e.g. openai/gpt-4o, azure/gpt-5) |
| `provider`                                                                    | *string*                                                                      | :heavy_minus_sign:                                                            | Provider name (auto-detected from identifier if not specified)                |
| `type`                                                                        | *string*                                                                      | :heavy_minus_sign:                                                            | Model type: 'llm' (default), 'embedding', or 'image'                          |
| `extra`                                                                       | Record<string, *any*>                                                         | :heavy_minus_sign:                                                            | Provider-specific configuration (e.g. api_base, api_version, region)          |
| `apiKey`                                                                      | *string*                                                                      | :heavy_minus_sign:                                                            | The API key or credentials for the model                                      |