# OCRPageElement

A document element with bounding box (returned in Docling JSON output mode).

## Example Usage

```typescript
import { OCRPageElement } from "opperai/models";

let value: OCRPageElement = {
  type: "<value>",
};
```

## Fields

| Field                                                                                                                  | Type                                                                                                                   | Required                                                                                                               | Description                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                 | *string*                                                                                                               | :heavy_check_mark:                                                                                                     | Element type: 'text', 'table', or 'picture'                                                                            |
| `label`                                                                                                                | *string*                                                                                                               | :heavy_minus_sign:                                                                                                     | Element label (e.g. 'title', 'section_header', 'page_header', 'page_footer', 'caption', 'footnote', 'formula', 'text') |
| `text`                                                                                                                 | *string*                                                                                                               | :heavy_minus_sign:                                                                                                     | Text content (for text elements)                                                                                       |
| `bbox`                                                                                                                 | Record<string, *number*>                                                                                               | :heavy_minus_sign:                                                                                                     | Bounding box with l, t, r, b coordinates                                                                               |
| `data`                                                                                                                 | Record<string, *any*>                                                                                                  | :heavy_minus_sign:                                                                                                     | Table data as dictionary (for table elements)                                                                          |