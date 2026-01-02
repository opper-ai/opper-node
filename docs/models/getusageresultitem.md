# GetUsageResultItem

## Example Usage

```typescript
import { GetUsageResultItem } from "opperai/models";

let value: GetUsageResultItem = {
  timeBucket: new Date("2026-04-06T02:05:28.462Z"),
  cost: "997.89",
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `timeBucket`                                                                                  | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | The start time of the time bucket                                                             |
| `cost`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | The cost in USD for the time bucket                                                           |
| `additionalProperties`                                                                        | Record<string, *any*>                                                                         | :heavy_minus_sign:                                                                            | N/A                                                                                           |