# ChatCompletionNonStreamingToolChoiceUnion


## Supported Types

### `models.ChatCompletionNonStreamingToolChoiceEnum`

```typescript
const value: models.ChatCompletionNonStreamingToolChoiceEnum = "required";
```

### `models.ChatCompletionAllowedToolChoiceParam`

```typescript
const value: models.ChatCompletionAllowedToolChoiceParam = {
  allowedTools: {
    mode: "required",
    tools: [
      {
        "key": "<value>",
      },
      {
        "key": "<value>",
        "key1": "<value>",
        "key2": "<value>",
      },
      {},
    ],
  },
};
```

### `models.ChatCompletionNamedToolChoiceParam`

```typescript
const value: models.ChatCompletionNamedToolChoiceParam = {
  function: {
    name: "<value>",
  },
};
```

### `models.ChatCompletionNamedToolChoiceCustomParam`

```typescript
const value: models.ChatCompletionNamedToolChoiceCustomParam = {
  custom: {
    name: "<value>",
  },
};
```

