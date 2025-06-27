# QueryDatasetEntriesDatasetsDatasetIdEntriesQueryPostRequest

## Example Usage

```typescript
import { QueryDatasetEntriesDatasetsDatasetIdEntriesQueryPostRequest } from "opperai/models/operations";

let value: QueryDatasetEntriesDatasetsDatasetIdEntriesQueryPostRequest = {
  datasetId: "1629f1a5-764d-489c-ab8f-a4fed8748bdc",
  query: "<value>",
};
```

## Fields

| Field                           | Type                            | Required                        | Description                     |
| ------------------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| `datasetId`                     | *string*                        | :heavy_check_mark:              | The id of the dataset           |
| `query`                         | *string*                        | :heavy_check_mark:              | The query to search for         |
| `limit`                         | *number*                        | :heavy_minus_sign:              | The limit of the entries to get |