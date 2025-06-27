# UpdateDatasetEntryDatasetsDatasetIdEntriesEntryIdPatchRequest

## Example Usage

```typescript
import { UpdateDatasetEntryDatasetsDatasetIdEntriesEntryIdPatchRequest } from "opperai/models/operations";

let value: UpdateDatasetEntryDatasetsDatasetIdEntriesEntryIdPatchRequest = {
  datasetId: "e818a7c2-24cb-4b3e-9676-90a30b7f2488",
  entryId: "774ea596-f5d8-456c-9d51-d94ed610165e",
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `datasetId`                                                                   | *string*                                                                      | :heavy_check_mark:                                                            | The id of the dataset                                                         |
| `entryId`                                                                     | *string*                                                                      | :heavy_check_mark:                                                            | The id of the entry to update                                                 |
| `updateDatasetEntryRequest`                                                   | [models.UpdateDatasetEntryRequest](../../models/updatedatasetentryrequest.md) | :heavy_check_mark:                                                            | N/A                                                                           |