# ListFunctionsFunctionsGetRequest

## Example Usage

```typescript
import { ListFunctionsFunctionsGetRequest } from "opperai/models/operations";

let value: ListFunctionsFunctionsGetRequest = {
  name: "my-function",
  sort: "name",
};
```

## Fields

| Field                                                                         | Type                                                                          | Required                                                                      | Description                                                                   | Example                                                                       |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `name`                                                                        | *string*                                                                      | :heavy_minus_sign:                                                            | Filter functions by name                                                      | my-function                                                                   |
| `sort`                                                                        | *string*                                                                      | :heavy_minus_sign:                                                            | Sort the functions by name or created_at, use '-' to sort in descending order | name                                                                          |
| `offset`                                                                      | *number*                                                                      | :heavy_minus_sign:                                                            | The offset of the page of functions to return when paginating                 |                                                                               |
| `limit`                                                                       | *number*                                                                      | :heavy_minus_sign:                                                            | The number of functions to return per page when paginating                    |                                                                               |