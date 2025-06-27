# TextProcessingConfiguration

## Example Usage

```typescript
import { TextProcessingConfiguration } from "opperai";

let value: TextProcessingConfiguration = {};
```

## Fields

| Field                                                                                                                                 | Type                                                                                                                                  | Required                                                                                                                              | Description                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `textProcessingChunkSize`                                                                                                             | *number*                                                                                                                              | :heavy_minus_sign:                                                                                                                    | The chunk size to use for the document. This is the number of characters to use for the chunk. The default is 2000 characters.        |
| `textProcessingChunkOverlap`                                                                                                          | *number*                                                                                                                              | :heavy_minus_sign:                                                                                                                    | The chunk overlap to use for the document. This is the number of characters to overlap between chunks. The default is 200 characters. |