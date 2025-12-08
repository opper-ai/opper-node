# Annotation

## Example Usage

```typescript
import { Annotation } from "opperai/models";

let value: Annotation = {
  type: "url_citation",
  urlCitation: {
    endIndex: 92225,
    startIndex: 139911,
    title: "<value>",
    url: "https://right-someplace.net/",
  },
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | *"url_citation"*                                                   | :heavy_check_mark:                                                 | N/A                                                                |
| `urlCitation`                                                      | [models.AnnotationURLCitation](../models/annotationurlcitation.md) | :heavy_check_mark:                                                 | N/A                                                                |
| `additionalProperties`                                             | Record<string, *any*>                                              | :heavy_minus_sign:                                                 | N/A                                                                |