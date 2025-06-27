# UpdateDatasetEntryResponse

## Example Usage

```typescript
import { UpdateDatasetEntryResponse } from "opperai";

let value: UpdateDatasetEntryResponse = {
  id: "fdb5d690-362e-41c8-a380-c19a6212bfde",
  input: "Given this input, what is the output?",
  output: "This is the output to the dataset entry",
  expected: "This `was` the output to the dataset entry",
  comment: "This is an example of how one can edit the output",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `id`                                                                                         | *string*                                                                                     | :heavy_check_mark:                                                                           | The id of the dataset entry                                                                  |                                                                                              |
| `input`                                                                                      | *string*                                                                                     | :heavy_check_mark:                                                                           | The input to the dataset entry                                                               | Given this input, what is the output?                                                        |
| `output`                                                                                     | *string*                                                                                     | :heavy_check_mark:                                                                           | The output to the dataset entry                                                              | This is the output to the dataset entry                                                      |
| `expected`                                                                                   | *string*                                                                                     | :heavy_minus_sign:                                                                           | The expected output to the dataset entry, this is an optionally edited version of the output | This `was` the output to the dataset entry                                                   |
| `comment`                                                                                    | *string*                                                                                     | :heavy_minus_sign:                                                                           | The comment to the dataset entry                                                             | This is an example of how one can edit the output                                            |