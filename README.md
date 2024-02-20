# Node SDK

The `OpperAIClient` class is the main interface for interacting with the Opper API. It provides methods for performing various operations such as creating a new chat and piping an opper chat stream.

## Installation

```bash
npm install opper
```

## Basic Usage

```typescript
import OpperAIClient from 'opperai';
// Initialize the client with your API key
const client = new OpperAIClient('your-api-key');

async function main() {
  const { message } = await client.functions.chat({
    path: 'your/function/path', // The API path for your Opper function
    message: 'An example message', // The message you want to send
  });

  console.log(message); // Process the response
}
main();
```

## Conversation

The message parameter can be a single message in the form of a string or a conversation history represented as an array of objects, each containing `role` (a string indicating the speaker's role) and `content` (the message text).

```typescript
import OpperAIClient from 'opperai';
// Initialize the client with your API key
const client = new OpperAIClient('your-api-key');

async function main() {
  const { message } = await client.functions.chat({
    path: 'your/function/path', // The API path for your Opper function
    message: [
      {
        role: 'user',
        content: 'this is the start',
      },
      {
        role: 'opper',
        content: 'this is response',
      },
      {
        role: 'user',
        content: 'this is a followup question',
      },
    ],
  });

  console.log(message); // Process the response
}
main();
```

## Functions

### Functions Chat

The `functions.chat` method allows you to send a message to the Opper API and receive a response. This method is useful for initiating a conversation or sending standalone messages.

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

### Functions Pipe

You can use the `functions.pipe` method to seamlessly integrate an Opper conversation stream into your application, acting as a bridge between the Opper API and your users. This method is particularly useful in server-side environments, such as with Node.js middleware, to forward real-time conversations directly to the client. The following example demonstrates its usage within a Next.js API route, showcasing how to handle incoming messages and pipe them through the Opper API.

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

### Functions Stream

The `functions.stream` method enables real-time communication with the Opper API, allowing you to send messages and receive responses asynchronously. This method is ideal for applications requiring live interaction, such as chat applications or real-time data processing. It supports various callbacks to handle incoming messages, completion events, and errors, providing a robust solution for managing continuous data streams. The example below illustrates how to initiate a streaming session with the Opper API, including how to handle messages and errors, and how to gracefully terminate the stream.

```typescript
import OpperAIClient from 'opperai';

// Initialize the client with your API key
const client = new OpperAIClient('your-api-key');

async function main() {
  // If the stream needs to be canceled use controller.abort();
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

## Indexes

### Indexes List

```typescript
import OpperAIClient from 'opperai';
// Initialize the client with your API key
const client = new OpperAIClient('your-api-key');

async function main() {
  const indexes = await client.indexes.list();

  console.log(indexes);
}
main();
```
