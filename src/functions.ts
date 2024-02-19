import { OpperAPIError, OpperError } from './error';
import APIResource from './api-resource';
import { OpperAiChat, OpperAiChatResponse, OpperAiChatConversation } from './types';

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

  /**
   * This method creates an iterator for a URL stream.
   * It sends a POST request to the specified URL with the provided body.
   * The response body is read as a stream and the iterator yields the stream's values.
   * @param url - The URL to send the POST request to.
   * @param body - The body of the POST request.
   * @returns An async generator that yields the values of the response body.
   */
  private urlStreamIterator(url: string, body: string) {
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
  private iteratorToStream(iterator: AsyncGenerator<Uint8Array, void, unknown>) {
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
  private calcMessageForPost(message: string | OpperAiChatConversation[]) {
    if (typeof message === 'string') {
      return this.stringifyMessage([{ role: 'user', content: message }]);
    }

    if (Array.isArray(message) && message.every(this.isOpperAiChatConversation)) {
      return this.stringifyMessage(message);
    }

    throw new OpperError('The message is incorrect.');
  }

  // Safe type test for the OpperAiChatConversation type
  private isOpperAiChatConversation(m: unknown): m is OpperAiChatConversation {
    return m !== null && typeof m === 'object' && 'role' in m && 'content' in m;
  }

  // Format post body
  private stringifyMessage(messages: OpperAiChatConversation[]) {
    return JSON.stringify({ messages });
  }
}

export default Functions;
