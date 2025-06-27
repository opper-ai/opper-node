# SaveToDatasetResponse

## Example Usage

```typescript
import { SaveToDatasetResponse } from "opperai";

let value: SaveToDatasetResponse = {
  datasetId: "c0221260-9884-45d7-aac5-f4095f6edf22",
  datasetEntryId: "0d4f7cae-6085-4dcf-bd91-27f05d9d6701",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `datasetId`                              | *string*                                 | :heavy_check_mark:                       | The ID of the dataset                    |
| `datasetEntryId`                         | *string*                                 | :heavy_check_mark:                       | The ID of the dataset entry              |
| `input`                                  | *string*                                 | :heavy_minus_sign:                       | The input of the dataset entry           |
| `output`                                 | *string*                                 | :heavy_minus_sign:                       | The output of the dataset entry          |
| `expected`                               | *string*                                 | :heavy_minus_sign:                       | The expected output of the dataset entry |
| `comment`                                | *string*                                 | :heavy_minus_sign:                       | The comment of the dataset entry         |