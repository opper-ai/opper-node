# CreateDatasetEntryRequest

## Example Usage

```typescript
import { CreateDatasetEntryRequest } from "opperai";

let value: CreateDatasetEntryRequest = {
  input: {
    "x": 4,
    "y": 5,
  },
  output: {
    "sum": 9,
  },
  expected: "This `was` the output to the dataset entry",
  comment: "This is an example of how one can edit the output",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `input`                                                                                      | *any*                                                                                        | :heavy_check_mark:                                                                           | The input to the dataset entry                                                               | {<br/>"x": 4,<br/>"y": 5<br/>}                                                               |
| `output`                                                                                     | *any*                                                                                        | :heavy_check_mark:                                                                           | The output to the dataset entry                                                              | {<br/>"sum": 9<br/>}                                                                         |
| `expected`                                                                                   | *any*                                                                                        | :heavy_minus_sign:                                                                           | The expected output to the dataset entry, this is an optionally edited version of the output | This `was` the output to the dataset entry                                                   |
| `comment`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | The comment to the dataset entry                                                             | This is an example of how one can edit the output                                            |