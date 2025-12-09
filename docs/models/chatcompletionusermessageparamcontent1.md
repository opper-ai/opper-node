# ChatCompletionUserMessageParamContent1


## Supported Types

### `models.ChatCompletionContentPartTextParam`

```typescript
const value: models.ChatCompletionContentPartTextParam = {
  text: "<value>",
  type: "text",
};
```

### `models.ChatCompletionContentPartImageParam`

```typescript
const value: models.ChatCompletionContentPartImageParam = {
  imageUrl: {
    url: "https://lustrous-mouser.org/",
  },
  type: "image_url",
};
```

### `models.ChatCompletionContentPartInputAudioParam`

```typescript
const value: models.ChatCompletionContentPartInputAudioParam = {
  inputAudio: {
    data: "<value>",
    format: "wav",
  },
  type: "input_audio",
};
```

### `models.FileT`

```typescript
const value: models.FileT = {
  file: {},
  type: "file",
};
```

