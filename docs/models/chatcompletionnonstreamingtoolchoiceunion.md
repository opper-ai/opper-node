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
  type: "allowed_tools",
};
```

### `models.ChatCompletionNamedToolChoiceParam`

```typescript
const value: models.ChatCompletionNamedToolChoiceParam = {
  function: {
    name: "<value>",
  },
  type: "function",
};
```

### `models.ChatCompletionNamedToolChoiceCustomParam`

```typescript
const value: models.ChatCompletionNamedToolChoiceCustomParam = {
  custom: {
    name: "<value>",
  },
  type: "custom",
};
```

