# CreateDatasetEntryDatasetsDatasetIdPostRequest

## Example Usage

```typescript
import { CreateDatasetEntryDatasetsDatasetIdPostRequest } from "opperai/models/operations";

let value: CreateDatasetEntryDatasetsDatasetIdPostRequest = {
  datasetId: "860680d5-2a8a-4042-8b29-40e4ada41a6a",
  createDatasetEntryRequest: {
    input: {
      "x": 4,
      "y": 5,
    },
    output: {
      "sum": 9,
    },
    expected: "This `was` the output to the dataset entry",
    comment: "This is an example of how one can edit the output",
  },
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `datasetId`                                                                   | *string*                                                                      | :heavy_check_mark:                                                            | The id of the dataset                                                         |
| `createDatasetEntryRequest`                                                   | [models.CreateDatasetEntryRequest](../../models/createdatasetentryrequest.md) | :heavy_check_mark:                                                            | N/A                                                                           |