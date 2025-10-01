# ChatCompletionMessageToolCall


## Supported Types

### `models.ChatCompletionMessageFunctionToolCall`

```typescript
const value: models.ChatCompletionMessageFunctionToolCall = {
  id: "<id>",
  function: {
    arguments: "<value>",
    name: "<value>",
  },
};
```

### `models.ChatCompletionMessageCustomToolCall`

```typescript
const value: models.ChatCompletionMessageCustomToolCall = {
  id: "<id>",
  custom: {
    input: "<value>",
    name: "<value>",
  },
};
```

