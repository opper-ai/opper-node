# ChatCompletionStreamingToolChoiceUnion


## Supported Types

### `models.ChatCompletionStreamingToolChoiceEnum`

```typescript
const value: models.ChatCompletionStreamingToolChoiceEnum = "required";
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

