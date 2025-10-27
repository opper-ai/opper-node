# GetUsageResultItemOutput

## Example Usage

```typescript
import { GetUsageResultItemOutput } from "opperai/models";

let value: GetUsageResultItemOutput = {
  timeBucket: new Date("2024-02-11T03:08:43.876Z"),
  cost: "303.09",
};
```

## Fields

| Field                                                                                         | Type                                                                                          | Required                                                                                      | Description                                                                                   |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `timeBucket`                                                                                  | [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :heavy_check_mark:                                                                            | The start time of the time bucket                                                             |
| `cost`                                                                                        | *string*                                                                                      | :heavy_check_mark:                                                                            | The cost in USD for the time bucket                                                           |
| `additionalProperties`                                                                        | Record<string, *any*>                                                                         | :heavy_minus_sign:                                                                            | N/A                                                                                           |