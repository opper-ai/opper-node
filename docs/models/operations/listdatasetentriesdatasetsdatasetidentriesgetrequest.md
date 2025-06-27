# ListDatasetEntriesDatasetsDatasetIdEntriesGetRequest

## Example Usage

```typescript
import { ListDatasetEntriesDatasetsDatasetIdEntriesGetRequest } from "opperai/models/operations";

let value: ListDatasetEntriesDatasetsDatasetIdEntriesGetRequest = {
  datasetId: "33cbe741-ace0-4f93-af64-f99f9519593d",
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `datasetId`                      | *string*                         | :heavy_check_mark:               | The id of the dataset            |
| `offset`                         | *number*                         | :heavy_minus_sign:               | The offset of the entries to get |
| `limit`                          | *number*                         | :heavy_minus_sign:               | The limit of the entries to get  |