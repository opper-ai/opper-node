# ListFilesResponse

## Example Usage

```typescript
import { ListFilesResponse } from "opperai/models";

let value: ListFilesResponse = {
  id: "a8601bf1-a0d5-4221-a228-7274bb6e6f38",
  originalFilename: "<value>",
  size: 351349,
  status: "<value>",
  documentId: 118298,
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `id`                              | *string*                          | :heavy_check_mark:                | The id of the file                |
| `originalFilename`                | *string*                          | :heavy_check_mark:                | The original filename             |
| `size`                            | *number*                          | :heavy_check_mark:                | The size of the file in bytes     |
| `status`                          | *string*                          | :heavy_check_mark:                | The indexing status of the file   |
| `documentId`                      | *number*                          | :heavy_check_mark:                | The id of the associated document |