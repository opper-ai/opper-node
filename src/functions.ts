import { OpperAPIError, OpperError } from './error';
import APIResource from './api-resource';
import { OpperAiChat, OpperAiChatResponse } from './types';

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
   * This method is used to initiate a chat stream with the OpperAi API.
   * It sends a POST request to the chat endpoint with the provided path and message.
   * The response is a promise that resolves to a ReadableStream.
   * @param path - The path to the chat endpoint.
   * @param message - The message to be sent.
   * @returns A promise that resolves to a ReadableStream.
   * @throws {OpperAPIError} If the response status is not 200.
   * @throws {OpperError} If the response has an error.
   */
  public stream({ path, message }: OpperAiChat): ReadableStream<unknown> {
    const url = `${this.baseURL}/chat/${path}?stream=True`;
    const body = this.calcMessageForPost(message);

    const iterator = this.urlStreamIterator(url, body);
    const stream = this.iteratorToStream(iterator);

    return stream;
  }
}

export default Functions;
