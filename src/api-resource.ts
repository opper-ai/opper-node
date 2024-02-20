import { OpperAiChatConversation, OpperAiSSEStreamCallbacks } from './types';

import type OpperClient from './index';
import { OpperError } from './error';

class APIResource {
  protected _client: OpperClient;

  protected baseURL: string;
  protected baseURLInternal: string;

  constructor(client: OpperClient) {
    this._client = client;

    this.baseURL = 'https://api.opper.ai/v1';
    this.baseURLInternal = 'https://api.opper.ai/v1';
  }

  /**
   * This method creates an iterator for a URL stream.
   * It sends a POST request to the specified URL with the provided body.
   * The response body is read as a stream and the iterator yields the stream's values.
   * @param url - The URL to send the POST request to.
   * @param body - The body of the POST request.
   * @returns An async generator that yields the values of the response body.
   */
  protected urlStreamIterator(url: string, body: string) {
    const apiKey = this._client.getApiKey();

    return (async function* () {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-OPPER-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.body) {
        const reader = response.body.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          yield value;
        }
      }
    })();
  }

  /**
   * This method converts an async generator to a readable stream.
   * It uses the async generator to pull values and enqueue them in the stream.
   * @param iterator - The async generator to convert to a stream.
   * @returns A readable stream that yields the values of the async generator.
   */
  protected iteratorToStream(iterator: AsyncGenerator<Uint8Array, void, unknown>) {
    return new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next();

        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
        }
      },
    });
  }

  /**
   * This method processes a Server-Sent Events (SSE) stream from the server.
   * It reads the stream using a ReadableStreamDefaultReader, decodes the Uint8Array chunks to text,
   * and splits the text into messages based on double newline characters.
   * Each message is expected to be in the format "data: <json>", where <json> is a JSON string.
   * The method parses each JSON string and passes the resulting object to the onMessage callback.
   * If the stream ends or an error occurs (including an abort signal), appropriate callbacks are called.
   *
   * @param reader - The ReadableStreamDefaultReader<Uint8Array> to read the stream from.
   * @param callbacks - An object containing callback functions for different events:
   * @param callbacks.onMessage     - for each message received,
   * @param callbacks.onComplete    - when the stream is finished,
   * @param callbacks.onError       - for any error that occurs,
   * @param callbacks.onCancel      - if the fetch request is aborted.
   * @returns A promise that resolves when the stream is finished or an error occurs.
   */
  protected async processSSEStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    callbacks: OpperAiSSEStreamCallbacks
  ): Promise<void> {
    let buffer = '';

    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          callbacks.onComplete();
          break;
        }

        buffer += new TextDecoder('utf-8').decode(value);

        const messages = buffer.split(/\r?\n\r?\n/);
        buffer = messages.pop() || '';

        for (const message of messages) {
          const match = message.match(/^data: (.*)$/);
          if (match) {
            const json = JSON.parse(match[1]);
            callbacks.onMessage(json);
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        callbacks.onCancel ? callbacks.onCancel() : callbacks.onComplete();
      } else {
        console.error('Error reading stream:', error);
        callbacks.onError(error as Error);
      }
    }
  }

  /**
   * This method calculates the message for the POST request.
   * If the message is a string, it is formatted as a user message.
   * If the message is an array of OpperAiChatConversation, it is formatted as a conversation.
   * @param message - The message to be formatted.
   * @returns The formatted message as a JSON string.
   * @throws {OpperError} If the message is not a string or an array of OpperAiChatConversation.
   */
  protected calcMessageForPost(message: string | OpperAiChatConversation[]) {
    if (typeof message === 'string') {
      return this.stringifyMessage([{ role: 'user', content: message }]);
    }

    if (Array.isArray(message) && message.every(this.isOpperAiChatConversation)) {
      return this.stringifyMessage(message);
    }

    throw new OpperError('The message is incorrect.');
  }

  // Safe type test for the OpperAiChatConversation type
  protected isOpperAiChatConversation(m: unknown): m is OpperAiChatConversation {
    return m !== null && typeof m === 'object' && 'role' in m && 'content' in m;
  }

  // Format post body
  protected stringifyMessage(messages: OpperAiChatConversation[]) {
    return JSON.stringify({ messages });
  }
}

export default APIResource;
