# Opper TypeScript SDK

## Example

```typescript
import Client from 'opper';
import { Message, ChatPayload } from 'opper/types';

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
