# ListFunctionRevisionsFunctionsFunctionIdRevisionsGetRequest

## Example Usage

```typescript
import { ListFunctionRevisionsFunctionsFunctionIdRevisionsGetRequest } from "opperai/models/operations";

let value: ListFunctionRevisionsFunctionsFunctionIdRevisionsGetRequest = {
  functionId: "a8ceae9b-551c-4bdd-90b9-99e4ebbab2c8",
};
```

## Fields

| Field                                       | Type                                        | Required                                    | Description                                 |
| ------------------------------------------- | ------------------------------------------- | ------------------------------------------- | ------------------------------------------- |
| `functionId`                                | *string*                                    | :heavy_check_mark:                          | The id of the function to get revisions for |
| `offset`                                    | *number*                                    | :heavy_minus_sign:                          | The offset of the revisions to get          |
| `limit`                                     | *number*                                    | :heavy_minus_sign:                          | The limit of the revisions to get           |