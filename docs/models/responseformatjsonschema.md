# ResponseFormatJSONSchema

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

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `jsonSchema`                                 | [models.JSONSchema](../models/jsonschema.md) | :heavy_check_mark:                           | N/A                                          |
| `type`                                       | *"json_schema"*                              | :heavy_check_mark:                           | N/A                                          |