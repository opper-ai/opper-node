# GetFunctionByRevisionFunctionsFunctionIdRevisionsRevisionIdGetRequest

## Example Usage

```typescript
import { GetFunctionByRevisionFunctionsFunctionIdRevisionsRevisionIdGetRequest } from "opperai/models/operations";

let value:
  GetFunctionByRevisionFunctionsFunctionIdRevisionsRevisionIdGetRequest = {
    functionId: "de96e053-f718-4678-a1ed-35e3e0197129",
    revisionId: "8bdc812c-a76a-4cbc-9050-e1f50e762e59",
  };
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `functionId`                       | *string*                           | :heavy_check_mark:                 | The id of the function to retrieve |
| `revisionId`                       | *string*                           | :heavy_check_mark:                 | The id of the revision to retrieve |