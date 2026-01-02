# OCRPageImage

An image extracted from a page.

## Example Usage

```typescript
import { OCRPageImage } from "opperai/models";

let value: OCRPageImage = {
  id: "<id>",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `id`                                                     | *string*                                                 | :heavy_check_mark:                                       | Unique identifier for the image                          |
| `topLeftX`                                               | *number*                                                 | :heavy_minus_sign:                                       | X coordinate of top-left corner                          |
| `topLeftY`                                               | *number*                                                 | :heavy_minus_sign:                                       | Y coordinate of top-left corner                          |
| `bottomRightX`                                           | *number*                                                 | :heavy_minus_sign:                                       | X coordinate of bottom-right corner                      |
| `bottomRightY`                                           | *number*                                                 | :heavy_minus_sign:                                       | Y coordinate of bottom-right corner                      |
| `imageBase64`                                            | *string*                                                 | :heavy_minus_sign:                                       | Base64-encoded image data (if include_image_base64=True) |