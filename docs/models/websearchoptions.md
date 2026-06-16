# WebSearchOptions

This tool searches the web for relevant results to use in a response.
Learn more about the [web search tool](https://platform.openai.com/docs/guides/tools-web-search?api-mode=chat).

## Example Usage

```typescript
import { WebSearchOptions } from "opperai/models";

let value: WebSearchOptions = {};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `searchContextSize`                                                              | [models.SearchContextSize](../models/searchcontextsize.md)                       | :heavy_minus_sign:                                                               | N/A                                                                              |
| `userLocation`                                                                   | [models.WebSearchOptionsUserLocation](../models/websearchoptionsuserlocation.md) | :heavy_minus_sign:                                                               | N/A                                                                              |