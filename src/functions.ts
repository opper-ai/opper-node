import { OpperFunction, Chat, OpperAIChatResponse, OpperAIStream } from "./types";

import APIResource from "./api-resource";
import { OpperError } from "./errors";

class Functions extends APIResource {
    /**
     * This method is used to initiate a chat with the OpperAI API.
     * The response is a promise that resolves to an object with the message and context.
     * @param path - The path to the chat endpoint.
     * @param message - The message to be sent.
     * @returns A promise that resolves to an object with the message and context.
     * @throws {APIError} If the response status is not 200.
     * @throws {OpperError} If the response has an error.
     */
    public async chat({ path, message, parent_span_uuid, examples }: Chat): Promise<OpperAIChatResponse> {
        const url = this.calcURLChat(path);
        const body = this.calcChatPayload(message, parent_span_uuid, examples);

        const response = await this.doPost(url, body);

        return (await response.json()) as OpperAIChatResponse;
    }

    /**
     * Updates a function in the OpperAI API.
     * @param f - The function to be updated.
     * @returns A promise that resolves to the updated function.
     * @throws {APIError} If the response status is not 200.
     * @throws {OpperError} If the function id is not provided.
     */
    public async update(fn: OpperFunction): Promise<OpperFunction> {
        if (!fn.uuid) {
            throw new OpperError("Function uuid is required");
        }
        const response = await this.doPost(this.calcURLUpdateFunction(fn.uuid), fn);

        if (response.ok) {
            return fn;
        }

        throw new OpperError(`Failed to update function: ${response.statusText}`);
    }

    /**
     * Creates a function in the OpperAI API.
     * @param f - The function to be created.
     * @param update - Whether to update the function if it already exists.
     * @returns A promise that resolves to the created function.
     * @throws {OpperError} If the function already exists and update is false.
     */
    public async create(fn: OpperFunction): Promise<OpperFunction> {
        const response = await this.doPost(this.calcURLCreateFunction(), fn);

        if (response.ok) {
            const data = await response.json();

            return { ...fn, uuid: data.uuid };
        }

        throw new OpperError(`Failed to create function: ${response.statusText}`);
    }

    /**
     * This method is a helper which can be used in node middleware
     * to pipe the OpperAI chat stream directly to the client. See examples.
     * It sends a POST request to the chat endpoint with the provided path and message.
     * The response is a promise that resolves to a ReadableStream.
     * @param path - The path to the chat endpoint.
     * @param message - The message to be sent.
     * @param parent_span_uuid - The parent span UUID.
     * @returns A promise that resolves to a ReadableStream.
     * @throws {APIError} If the response status is not 200.
     * @throws {OpperError} If the response has an error.
     */
    public pipe({ path, message, parent_span_uuid }: Chat): ReadableStream<unknown> {
        const url = this.calcURLChat(`${path}?stream=True`);
        const body = this.calcChatPayload(message, parent_span_uuid);

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
    public async stream({
        path,
        message,
        parent_span_uuid,
        callbacks,
    }: OpperAIStream): Promise<void> {
        const url = this.calcURLChat(path);
        const body = this.calcChatPayload(message, parent_span_uuid);

        try {
            const response = await this.doPost(url, body, callbacks.controller);

            const reader = response.body?.getReader();
            if (reader) {
                await this.processSSEStream(reader, callbacks);
            } else {
                throw new OpperError("Failed to get a stream reader");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.name === "AbortError") {
                callbacks.onCancel ? callbacks.onCancel() : callbacks.onComplete();
            } else {
                callbacks.onError(error as Error);
            }
        }
    }
}

export default Functions;
