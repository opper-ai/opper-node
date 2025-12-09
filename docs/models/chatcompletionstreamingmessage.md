# ChatCompletionStreamingMessage


## Supported Types

### `models.ChatCompletionDeveloperMessageParam`

```typescript
const value: models.ChatCompletionDeveloperMessageParam = {
  content: "<value>",
  role: "developer",
};
```

### `models.ChatCompletionSystemMessageParam`

```typescript
const value: models.ChatCompletionSystemMessageParam = {
  content: [
    {
      text: "<value>",
      type: "text",
    },
  ],
  role: "system",
};
```

### `models.ChatCompletionUserMessageParam`

```typescript
const value: models.ChatCompletionUserMessageParam = {
  content: [],
  role: "user",
};
```

### `models.ChatCompletionAssistantMessageParam`

```typescript
const value: models.ChatCompletionAssistantMessageParam = {
  role: "assistant",
};
```

### `models.ChatCompletionToolMessageParam`

```typescript
const value: models.ChatCompletionToolMessageParam = {
  content: [
    {
      text: "<value>",
      type: "text",
    },
  ],
  role: "tool",
  toolCallId: "<id>",
};
```

### `models.ChatCompletionFunctionMessageParam`

```typescript
const value: models.ChatCompletionFunctionMessageParam = {
  content: "<value>",
  name: "<value>",
  role: "function",
};
```

