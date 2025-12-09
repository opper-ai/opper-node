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

