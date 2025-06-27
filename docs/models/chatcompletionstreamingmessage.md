# ChatCompletionStreamingMessage


## Supported Types

### `models.ChatCompletionDeveloperMessageParam`

```typescript
const value: models.ChatCompletionDeveloperMessageParam = {
  content: "<value>",
};
```

### `models.ChatCompletionSystemMessageParam`

```typescript
const value: models.ChatCompletionSystemMessageParam = {
  content: [
    {
      text: "<value>",
    },
  ],
};
```

### `models.ChatCompletionUserMessageParam`

```typescript
const value: models.ChatCompletionUserMessageParam = {
  content: [],
};
```

### `models.ChatCompletionAssistantMessageParam`

```typescript
const value: models.ChatCompletionAssistantMessageParam = {};
```

### `models.ChatCompletionToolMessageParam`

```typescript
const value: models.ChatCompletionToolMessageParam = {
  content: [
    {
      text: "<value>",
    },
  ],
  toolCallId: "<id>",
};
```

### `models.ChatCompletionFunctionMessageParam`

```typescript
const value: models.ChatCompletionFunctionMessageParam = {
  content: "<value>",
  name: "<value>",
};
```

