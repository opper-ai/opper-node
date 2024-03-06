/* eslint-disable @typescript-eslint/no-explicit-any */
import APIResource from '../api-resource';

import Client from '../index';
import { Message } from '../types';

describe('APIResource', () => {
  let client: Client;
  let apiResource: APIResource;

  beforeEach(() => {
    client = new Client({ apiKey: 'test-api-key' });
    apiResource = new APIResource(client);
  });

  describe('processSSEStream', () => {
    it('should process a Server-Sent Events (SSE) stream from the server', async () => {
      // Mock SSE stream
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('data: {"test": "message"}\n\n'));
          controller.close();
        },
      });

      const reader = stream.getReader();
      const callbacks = {
        onMessage: jest.fn(),
        onComplete: jest.fn(),
        onError: jest.fn(),
        onCancel: jest.fn(),
      };

      // @ts-expect-error Testing protected method
      await apiResource.processSSEStream(reader, callbacks);

      expect(callbacks.onMessage).toHaveBeenCalledWith({ test: 'message' });
      expect(callbacks.onComplete).toHaveBeenCalled();
    });

    it('should handle errors thrown by the SSE stream', async () => {
      // Mock SSE stream that throws an error
      const stream = new ReadableStream({
        start(controller) {
          controller.error(new Error('Test Error'));
        },
      });

      const reader = stream.getReader();
      const callbacks = {
        onMessage: jest.fn(),
        onComplete: jest.fn(),
        onError: jest.fn(),
        onCancel: jest.fn(),
      };

      // @ts-expect-error Testing protected method
      await apiResource.processSSEStream(reader, callbacks);

      expect(callbacks.onError).toHaveBeenCalledWith(new Error('Test Error'));
    });
  });

  describe('iteratorToStream', () => {
    it('should convert an async generator to a readable stream', async () => {
      // Mock async generator
      async function* asyncGenerator() {
        yield new TextEncoder().encode('Test');
        yield new TextEncoder().encode('Data');
      }

      const iterator = asyncGenerator();
      // @ts-expect-error Testing protected prop
      const stream = apiResource.iteratorToStream(iterator);

      // Read from stream
      const reader = stream.getReader();
      let result = '';
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result += new TextDecoder('utf-8').decode(value);
      }

      expect(result).toBe('TestData');
    });

    it('should close the stream when the generator is done', async () => {
      // Mock async generator that immediately finishes
      async function* asyncGenerator() { }

      const iterator = asyncGenerator();
      // @ts-expect-error Testing protected prop
      const stream = apiResource.iteratorToStream(iterator);

      // Read from stream
      const reader = stream.getReader();
      const { done } = await reader.read();

      expect(done).toBe(true);
    });

    it('should handle errors thrown by the async generator', async () => {
      // Mock async generator that throws an error
      // eslint-disable-next-line require-yield
      async function* asyncGenerator() {
        throw new Error('Test Error');
      }

      const iterator = asyncGenerator();
      // @ts-expect-error Testing protected prop
      const stream = apiResource.iteratorToStream(iterator);

      // Read from stream and expect an error
      const reader = stream.getReader();
      await expect(reader.read()).rejects.toThrow('Test Error');
    });
  });

  describe('calcMessageForPost', () => {
    it('should format a string message as a user message', () => {
      const message = 'Hello, world!';
      // @ts-expect-error Testing protected prop
      const formattedMessage = apiResource.calcMessageForPost(message);
      expect(formattedMessage).toBe('{"messages":[{"role":"user","content":"Hello, world!"}]}');
    });

    it('should format an array of OpperAIChatConversation as a conversation', () => {
      const message = [
        { role: 'user', content: 'Hello, world!' },
        { role: 'assistant', content: 'Hi there!' },
      ];
      // @ts-expect-error Testing protected prop
      const formattedMessage = apiResource.calcMessageForPost(message);
      expect(formattedMessage).toBe(
        '{"messages":[{"role":"user","content":"Hello, world!"},{"role":"assistant","content":"Hi there!"}]}'
      );
    });

    it('should throw an error if the message is not a string or an array of OpperAIChatConversation', () => {
      const message = 123;
      // @ts-expect-error Testing protected prop
      expect(() => apiResource.calcMessageForPost(message)).toThrow(
        'OpperAIClient: The message is not of type string or OpperAIChatConversation[].'
      );
    });
  });

  describe('isOpperAIChatConversation', () => {
    it('should return true for a valid OpperAIChatConversation object', () => {
      const conversation: Message = { role: 'user', content: 'Hello, world!' };
      // @ts-expect-error Testing protected prop
      const result = apiResource.isOpperAIChatConversation(conversation);
      expect(result).toBe(true);
    });

    it('should return false for an invalid OpperAIChatConversation object', () => {
      const conversation = { role: 'user', something: 'Hello, world!' };
      // @ts-expect-error Testing protected prop
      const result = apiResource.isOpperAIChatConversation(conversation);
      expect(result).toBe(false);
    });

    it('should return false if the role is incorrect', () => {
      const conversation = { role: 'wrong', content: 'Hello, world!' };
      // @ts-expect-error Testing protected prop
      const result = apiResource.isOpperAIChatConversation(conversation);
      expect(result).toBe(false);
    });
  });

  describe('stringifyMessage', () => {
    it('should format an array of OpperAIChatConversation as a JSON string', () => {
      const messages = [
        { role: 'user', content: 'Hello, world!' },
        { role: 'bot', content: 'Hi there!' },
      ];
      // @ts-expect-error Testing protected prop
      const formattedMessage = apiResource.stringifyMessage(messages);
      expect(formattedMessage).toBe(
        '{"messages":[{"role":"user","content":"Hello, world!"},{"role":"bot","content":"Hi there!"}]}'
      );
    });
  });

  describe('calcURLChat', () => {
    it('should calculate the correct URL for the chat path', () => {
      const path = 'test-path';
      // @ts-expect-error Testing protected prop
      const expectedURL = `${apiResource._client.baseURL}/v1/chat/${path}`;
      // @ts-expect-error Testing protected prop
      const calculatedURL = apiResource.calcURLChat(path);
      expect(calculatedURL).toBe(expectedURL);
    });
  });

  describe('calcURLIndexes', () => {
    it('should calculate the correct URL for the indexes path', () => {
      // @ts-expect-error Testing protected prop
      const expectedURL = `${apiResource._client.baseURL}/v1/indexes`;
      // @ts-expect-error Testing protected prop
      const calculatedURL = apiResource.calcURLIndexes();
      expect(calculatedURL).toBe(expectedURL);
    });
  });
});
