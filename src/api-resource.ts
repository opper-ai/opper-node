import { OpperAiChatConversation } from './types';

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
