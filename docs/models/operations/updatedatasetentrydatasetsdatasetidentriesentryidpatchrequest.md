# UpdateDatasetEntryDatasetsDatasetIdEntriesEntryIdPatchRequest

## Example Usage

```typescript
import { UpdateDatasetEntryDatasetsDatasetIdEntriesEntryIdPatchRequest } from "opperai/models/operations";

let value: UpdateDatasetEntryDatasetsDatasetIdEntriesEntryIdPatchRequest = {
  datasetId: "e818a7c2-24cb-4b3e-9676-90a30b7f2488",
  entryId: "774ea596-f5d8-456c-9d51-d94ed610165e",
  updateDatasetEntryRequest: {
    input: "Given this input, what is the output?",
    output: "This is the output to the dataset entry",
    expected: "This `was` the output to the dataset entry",
    comment: "This is an example of how one can edit the output",
  },
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `datasetId`                                                                   | *string*                                                                      | :heavy_check_mark:                                                            | The id of the dataset                                                         |
| `entryId`                                                                     | *string*                                                                      | :heavy_check_mark:                                                            | The id of the entry to update                                                 |
| `updateDatasetEntryRequest`                                                   | [models.UpdateDatasetEntryRequest](../../models/updatedatasetentryrequest.md) | :heavy_check_mark:                                                            | N/A                                                                           |