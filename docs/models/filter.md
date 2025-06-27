# Filter

## Example Usage

```typescript
import { Filter } from "opperai";

let value: Filter = {
  field: "category",
  operation: "<",
  value: "product",
};
```

## Fields

| Field                        | Type                         | Required                     | Description                  | Example                      |
| ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| `field`                      | *string*                     | :heavy_check_mark:           | The field to filter on       | category                     |
| `operation`                  | [models.Op](../models/op.md) | :heavy_check_mark:           | N/A                          |                              |
| `value`                      | *models.Value2*              | :heavy_check_mark:           | The value to filter on       | product                      |