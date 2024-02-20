import { OpperAPIError, OpperError } from './error';
import APIResource from './api-resource';
import { OpperAiChat, OpperAiChatResponse, OpperAiStream } from './types';

class Functions extends APIResource {
  /**
   * This method is used to initiate a chat with the OpperAi API.
   * It sends a POST request to the chat endpoint with the provided path and message.
   * The response is a promise that resolves to an object with the message and context.
   * @param path - The path to the chat endpoint.
   * @param message - The message to be sent.
   * @returns A promise that resolves to an object with the message and context.
   * @throws {OpperAPIError} If the response status is not 200.
   * @throws {OpperError} If the response has an error.
   */
  public async chat({ path, message }: OpperAiChat): Promise<OpperAiChatResponse> {
    const url = `${this.baseURL}/chat/${path}`;
    const body = this.calcMessageForPost(message);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-OPPER-API-KEY': this._client.getApiKey(),
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      throw new OpperAPIError(
        response.status,
        `Failed to send chat request to ${url}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.error) {
      throw new OpperError(`The response from ${url} has an error: ${data.error}`);
    }

    return {
      message: data.message,
      context: data.context,
    };
  }

  /**
   * This method is a helper which can be used in node middleware
   * to pipe the OpperAi chat stream directly to the client. See examples.
   * It sends a POST request to the chat endpoint with the provided path and message.
   * The response is a promise that resolves to a ReadableStream.
   * @param path - The path to the chat endpoint.
   * @param message - The message to be sent.
   * @returns A promise that resolves to a ReadableStream.
   * @throws {OpperAPIError} If the response status is not 200.
   * @throws {OpperError} If the response has an error.
   */
  public pipe({ path, message }: OpperAiChat): ReadableStream<unknown> {
    const url = `${this.baseURL}/chat/${path}?stream=True`;
    const body = this.calcMessageForPost(message);

    const iterator = this.urlStreamIterator(url, body);
    const pipe = this.iteratorToStream(iterator);

    return pipe;
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
   * @param callbacks.controller    - Optional AbortController
   * @param callbacks.onMessage     - for each message received,
   * @param callbacks.onComplete    - when the stream is finished,
   * @param callbacks.onError       - for any error that occurs,
   * @param callbacks.onCancel      - if the fetch request is aborted.
   * @returns A promise that resolves when the stream is finished or an error occurs.
   */
  public async stream({ path, message, callbacks }: OpperAiStream): Promise<void> {
    const url = `${this.baseURL}/chat/${path}`;
    const body = this.calcMessageForPost(message);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'X-OPPER-API-KEY': this._client.getApiKey(),
          'Content-Type': 'application/json',
        },
        body: body,
        signal: callbacks.controller?.signal,
      });

      if (!response.ok) {
        throw new OpperAPIError(
          response.status,
          `Failed to send stream request to ${url}: ${response.statusText}`
        );
      }

      const reader = response.body?.getReader();
      if (reader) {
        await this.processSSEStream(reader, callbacks);
      } else {
        throw new OpperError('Failed to get a stream reader');
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
}

export default Functions;
