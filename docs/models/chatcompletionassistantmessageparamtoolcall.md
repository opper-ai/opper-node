# ChatCompletionAssistantMessageParamToolCall


## Supported Types

### `models.ChatCompletionMessageFunctionToolCallParam`

```typescript
const value: models.ChatCompletionMessageFunctionToolCallParam = {
  id: "<id>",
  function: {
    arguments: "<value>",
    name: "<value>",
  },
};
```

### `models.ChatCompletionMessageCustomToolCallParam`

```typescript
const value: models.ChatCompletionMessageCustomToolCallParam = {
  id: "<id>",
  custom: {
    input: "<value>",
    name: "<value>",
  },
};
```

