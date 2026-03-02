# ChatCompletionContentPartInputAudioParam

Learn about [audio inputs](https://platform.openai.com/docs/guides/audio).

## Example Usage

```typescript
import { ChatCompletionContentPartInputAudioParam } from "opperai/models";

let value: ChatCompletionContentPartInputAudioParam = {
  inputAudio: {
    data: "<value>",
    format: "wav",
  },
  type: "input_audio",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `inputAudio`                                 | [models.InputAudio](../models/inputaudio.md) | :heavy_check_mark:                           | N/A                                          |
| `type`                                       | *"input_audio"*                              | :heavy_check_mark:                           | N/A                                          |