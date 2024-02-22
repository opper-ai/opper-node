import { OpperAIChatConversation, OpperAISSEStreamCallbacks } from './types';

import type OpperAIClient from './index';
import { OpperAIAPIError, OpperAIError } from './opperai-error';

class OpperAIAPIResource {
  protected _client: OpperAIClient;

  constructor(client: OpperAIClient) {
    this._client = client;
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
    const headers = this._client.calcAuthorizationHeaders();

    return (async function* () {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
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
    callbacks: OpperAISSEStreamCallbacks
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
        callbacks.onError(error as Error);
      }
    }
  }

  /**
   * This method sends a POST request to the specified URL with the provided body.
   * If an AbortController is provided, it will be used to cancel the request.
   * The response is a promise that resolves to the fetch response.
   * @param url - The URL to send the POST request to.
   * @param body - The body of the POST request.
   * @param controller - Optional AbortController to cancel the request.
   * @returns A promise that resolves to the fetch response.
   * @throws {OpperAIAPIError} If the response status is not 200.
   */
  protected async post(url: string, body: string, controller?: AbortController | null | undefined) {
    const headers = this._client.calcAuthorizationHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body,
      signal: controller?.signal,
    });

    if (!response.ok) {
      throw new OpperAIAPIError(
        response.status,
        `Failed to send request to ${url}: ${response.statusText}`
      );
    }

    return response;
  }

  /**
   * This method sends a GET request to the specified URL.
   * The response is a promise that resolves to the fetch response.
   * @param url - The URL to send the GET request to.
   * @returns A promise that resolves to the fetch response.
   * @throws {OpperAIAPIError} If the response status is not 200.
   */
  protected async get(url: string) {
    const headers = this._client.calcAuthorizationHeaders();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new OpperAIAPIError(
        response.status,
        `Failed to fetch request ${url}: ${response.statusText}`
      );
    }

    return response;
  }

  /**
   * This method calculates the message for the POST request.
   * If the message is a string, it is formatted as a user message.
   * If the message is an array of OpperAIChatConversation, it is formatted as a conversation.
   * @param message - The message to be formatted.
   * @returns The formatted message as a JSON string.
   * @throws {OpperAIError} If the message is not a string or an array of OpperAIChatConversation.
   */
  protected calcMessageForPost(message: string | OpperAIChatConversation[]) {
    if (typeof message === 'string') {
      return this.stringifyMessage([{ role: 'user', content: message }]);
    }

    if (Array.isArray(message) && message.every(this.isOpperAIChatConversation)) {
      return this.stringifyMessage(message);
    }

    throw new OpperAIError('The message is not of type string or OpperAIChatConversation[].');
  }

  // Safe type test for the OpperAIChatConversation type
  protected isOpperAIChatConversation(m: unknown): m is OpperAIChatConversation {
    const candidate = m as OpperAIChatConversation; // Type assertion to an intermediate type
    return (
      typeof m === 'object' &&
      m !== null &&
      typeof candidate.role === 'string' &&
      ['assistant', 'user'].includes(candidate.role) &&
      'content' in candidate
    );
  }

  // Format post body
  protected stringifyMessage(messages: OpperAIChatConversation[]) {
    return JSON.stringify({ messages });
  }

  protected calcURLChat = (path: string) => {
    return `${this._client.baseURL}/chat/${path}`;
  };

  protected calcURLIndexes = () => {
    return `${this._client.baseURL}/indexes`;
  };
}

export default OpperAIAPIResource;
