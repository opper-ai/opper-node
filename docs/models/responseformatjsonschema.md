# ResponseFormatJSONSchema

JSON Schema response format.

Used to generate structured JSON responses.
Learn more about [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).

## Example Usage

```typescript
import { ResponseFormatJSONSchema } from "opperai/models";

let value: ResponseFormatJSONSchema = {
  jsonSchema: {
    name: "<value>",
  },
  type: "json_schema",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `jsonSchema`                                                       | [models.JSONSchema](../models/jsonschema.md)                       | :heavy_check_mark:                                                 | Structured Outputs configuration options, including a JSON Schema. |
| `type`                                                             | *"json_schema"*                                                    | :heavy_check_mark:                                                 | N/A                                                                |