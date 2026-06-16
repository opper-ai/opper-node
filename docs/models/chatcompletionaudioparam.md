# ChatCompletionAudioParam

Parameters for audio output.

Required when audio output is requested with
`modalities: ["audio"]`. [Learn more](https://platform.openai.com/docs/guides/audio).

## Example Usage

```typescript
import { ChatCompletionAudioParam } from "opperai/models";

let value: ChatCompletionAudioParam = {
  format: "wav",
  voice: "verse",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `format`                                                                             | [models.ChatCompletionAudioParamFormat](../models/chatcompletionaudioparamformat.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `voice`                                                                              | *models.Voice*                                                                       | :heavy_check_mark:                                                                   | N/A                                                                                  |