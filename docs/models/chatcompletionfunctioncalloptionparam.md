# ChatCompletionFunctionCallOptionParam

Specifying a particular function via `{"name": "my_function"}` forces the model to call that function.

## Example Usage

```typescript
import { ChatCompletionFunctionCallOptionParam } from "opperai/models";

let value: ChatCompletionFunctionCallOptionParam = {
  name: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `name`             | *string*           | :heavy_check_mark: | N/A                |