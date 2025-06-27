# JSONSchema

## Example Usage

```typescript
import { JSONSchema } from "opperai";

let value: JSONSchema = {
  name: "<value>",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `name`                | *string*              | :heavy_check_mark:    | N/A                   |
| `description`         | *string*              | :heavy_minus_sign:    | N/A                   |
| `schema`              | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |
| `strict`              | *boolean*             | :heavy_minus_sign:    | N/A                   |