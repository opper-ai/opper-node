# OpperAI Client

The `OpperAIClient` class is the main interface for interacting with the Opper API. It provides methods for performing various operations such as creating a new chat and piping an opper chat stream.

## Installation

```bash
npm install opper
```

## Usage

## Functions

The `functions` method of the `OpperAIClient` class is designed to interact with specific functionalities within the Opper API. It requires an object with two essential properties for operation:

- `path`: A string that specifies the path to your Opper function. This path can be obtained from the Opper app interface.
- `message`: The content to be processed. This can be a single message in the form of a string or a conversation history represented as an array of objects, each containing `role` (a string indicating the speaker's role) and `content` (the message text).

These methods facilitate various operations, including initiating chats, piping conversation streams, and handling real-time message streams with the Opper API.

### Functions chat

The `chat` method allows you to send a message to the Opper API and receive a response. This method is useful for initiating a conversation or sending standalone messages.

**Parameters:**

- `path` (string): Specifies the path to your Opper function. Obtain this from the Opper app interface.
- `message` (string | object[]): The content to be processed. Can be a single message or a conversation history.

**Return Value:**

- Returns an object containing the `message` field with the API's response.

**Error Handling:**

- Errors are thrown for invalid API keys, network issues, or if the Opper API returns an error. Use try-catch blocks to handle these errors gracefully.

```typescript
import OpperAIClient from 'opperai';
// Initialize the client with your API key
const client = new OpperAIClient('your-api-key');
async function main() {
  try {
    const { message } = await client.functions.chat({
      path: 'your/function/path', // The API path for your Opper function
      message: 'An example message', // The message you want to send
    });
    console.log(message); // Process the response
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}
main();
```

### Functions pipe

You can use the funcitons pipe method to pipe an Opper conversstream to the user
in node middleware. this example is using the nextjs app router.

```typescript
import OpperAIClient from 'opperai';

// Initialize the client with your API key
const client = new OpperAIClient('your-api-key');

export async function POST(req, res) {
  const data = await req.json();
  const { messages } = data;

  const stream = client.functions.pipe({
    path: 'your/function/path',
    message: messages,
  });

  return new Response(stream);
}
```

### Functions stream

```typescript
import OpperAIClient from 'opperai';

// Initialize the client with your API key
const client = new OpperAIClient('your-api-key');

async function main() {
  const controller = new AbortController();

  await client.functions.stream({
    path: 'your/function/path',
    message: 'An example message',
    callbacks: {
      controller: controller,
      onMessage: (data) => {
        console.log(data);
      },
      onComplete: () => {
        console.log('Finished!');
      },
      onError: (error) => {
        console.log('An Error!');
      },
    },
  });
}

main();
```
