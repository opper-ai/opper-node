# FileDownloadUrlResponse

## Example Usage

```typescript
import { FileDownloadUrlResponse } from "opperai/models";

let value: FileDownloadUrlResponse = {
  url: "https://overcooked-thyme.name",
  expiresIn: 13071,
};
```

## Fields

| Field                                   | Type                                    | Required                                | Description                             |
| --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| `url`                                   | *string*                                | :heavy_check_mark:                      | Presigned URL to download the file      |
| `expiresIn`                             | *number*                                | :heavy_check_mark:                      | Number of seconds until the URL expires |