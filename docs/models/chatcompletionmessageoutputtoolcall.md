# ChatCompletionMessageOutputToolCall


## Supported Types

### `models.ChatCompletionMessageFunctionToolCallOutput`

```typescript
const value: models.ChatCompletionMessageFunctionToolCallOutput = {
  id: "<id>",
  function: {
    arguments: "<value>",
    name: "<value>",
  },
};
```

### `models.ChatCompletionMessageCustomToolCallOutput`

```typescript
const value: models.ChatCompletionMessageCustomToolCallOutput = {
  id: "<id>",
  custom: {
    input: "<value>",
    name: "<value>",
  },
};
```

