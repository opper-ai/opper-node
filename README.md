# Opper TypeScript SDK

## Example

```typescript
import { Message, ChatPayload } from 'opper/types';
import Client from 'opper';

const client = new Client("op-xxx");

const message: Message = {
    role: "user",
    content: "hello"
};

const payload: ChatPayload = {
    messages: [message]
};

client.chat("my-function", payload)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```
