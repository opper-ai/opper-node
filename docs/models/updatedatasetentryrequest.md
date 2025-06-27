# UpdateDatasetEntryRequest

## Example Usage

```typescript
import { UpdateDatasetEntryRequest } from "opperai";

let value: UpdateDatasetEntryRequest = {
  input: "Given this input, what is the output?",
  output: "This is the output to the dataset entry",
  expected: "This `was` the output to the dataset entry",
  comment: "This is an example of how one can edit the output",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `input`                                                                                      | *any*                                                                                        | :heavy_minus_sign:                                                                           | The input to the dataset entry                                                               | Given this input, what is the output?                                                        |
| `output`                                                                                     | *any*                                                                                        | :heavy_minus_sign:                                                                           | The output to the dataset entry                                                              | This is the output to the dataset entry                                                      |
| `expected`                                                                                   | *any*                                                                                        | :heavy_minus_sign:                                                                           | The expected output to the dataset entry, this is an optionally edited version of the output | This `was` the output to the dataset entry                                                   |
| `comment`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | The comment to the dataset entry                                                             | This is an example of how one can edit the output                                            |