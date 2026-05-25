# FileT

Learn about [file inputs](https://platform.openai.com/docs/guides/text) for text generation.

## Example Usage

```typescript
import { FileT } from "opperai/models";

let value: FileT = {
  file: {},
  type: "file",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `file`                                   | [models.FileFile](../models/filefile.md) | :heavy_check_mark:                       | N/A                                      |
| `type`                                   | *"file"*                                 | :heavy_check_mark:                       | N/A                                      |