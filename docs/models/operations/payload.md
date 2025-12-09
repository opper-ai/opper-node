# Payload


## Supported Types

### `models.ChatCompletionNonStreaming`

```typescript
const value: models.ChatCompletionNonStreaming = {
  messages: [
    {
      role: "assistant",
    },
  ],
};
```

### `models.ChatCompletionStreaming`

```typescript
const value: models.ChatCompletionStreaming = {
  messages: [
    {
      content: "<value>",
      role: "user",
    },
  ],
  stream: true,
};
```

