import { Message, SSEStreamCallbacks, OpperExample } from "./types";

import { APIError, OpperError } from "./errors";
import { stringify } from "./utils";
import type Client from "./index";

class APIResource {
    protected _client: Client;

    constructor(client: Client) {
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
    protected urlStreamIterator(url: string, body: unknown) {
        const headers = this._client.calcAuthorizationHeaders();

        return (async function* () {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: stringify(body),
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
        callbacks: SSEStreamCallbacks
    ): Promise<void> {
        let buffer = "";

        try {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    callbacks.onComplete();
                    break;
                }

                buffer += new TextDecoder("utf-8").decode(value);

                const messages = buffer.split(/\r?\n\r?\n/);
                buffer = messages.pop() || "";

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
            if (error?.name === "AbortError") {
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
     * @throws {APIError} If the response status is not 200.
     */
    protected async doPost(
        url: string,
        body: unknown,
        controller?: AbortController | null | undefined
    ) {
        const headers = this._client.calcAuthorizationHeaders();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: stringify(body),
            signal: controller?.signal,
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to send request to ${url}: ${response.statusText}`
            );
        }

        return response;
    }

    /**
     * This method sends a PUT request to the specified URL with the provided body.
     * If an AbortController is provided, it will be used to cancel the request.
     * The response is a promise that resolves to the fetch response.
     * @param url - The URL to send the PUT request to.
     * @param body - The body of the PUT request.
     * @param controller - Optional AbortController to cancel the request.
     * @returns A promise that resolves to the fetch response.
     * @throws {APIError} If the response status is not 200.
     */
    protected async doPut(
        url: string,
        body: unknown,
        controller?: AbortController | null | undefined
    ) {
        const headers = this._client.calcAuthorizationHeaders();

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: stringify(body),
            signal: controller?.signal,
        });

        if (!response.ok) {
            throw new APIError(
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
     * @throws {APIError} If the response status is not 200.
     */
    protected async doGet(url: string) {
        const headers = this._client.calcAuthorizationHeaders();

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to fetch request ${url}: ${response.statusText}`
            );
        }

        return response;
    }

    /**
     * This method sends a DELETE request to the specified URL.
     * The response is a promise that resolves to the fetch response.
     * @param url - The URL to send the `DELETE` request to.
     * @returns A promise that resolves to the fetch response.
     * @throws {APIError} If the response status is not 200.
     */
    protected async doDelete(url: string) {
        const headers = this._client.calcAuthorizationHeaders();

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });

        if (!response.ok) {
            throw new APIError(
                response.status,
                `Failed to fetch request ${url}: ${response.statusText}`
            );
        }

        return response;
    }

    protected calcChatPayload(
        messages: string | Message[],
        parent_span_uuid?: string,
        examples?: OpperExample[]
    ) {
        return {
            messages: this.calcMessagesForPost(messages),
            parent_span_uuid: parent_span_uuid,
            examples: examples?.map(({ input, output, comment }) => ({
                input: stringify(input) ?? undefined,
                output: stringify(output) ?? undefined,
                comment,
            })),
        };
    }

    protected calcMessagesForPost(messages: string | Message[]) {
        if (typeof messages === "string") {
            return [{ role: "user", content: messages }];
        }

        if (Array.isArray(messages) && messages.every(this.isOpperAIChatConversation)) {
            return messages;
        }

        throw new OpperError("The message is not of type string or OpperAIChatConversation[].");
    }
    /**
     * This method calculates the message for the POST request.
     * If the message is a string, it is formatted as a user message.
     * If the message is an array of OpperAIChatConversation, it is formatted as a conversation.
     * @param message - The message to be formatted.
     * @returns The formatted message as a JSON string.
     * @throws {OpperError} If the message is not a string or an array of OpperAIChatConversation.
     */
    protected calcMessageForPost(message: string | Message[]) {
        if (typeof message === "string") {
            return this.stringifyMessage([{ role: "user", content: message }]);
        }

        if (Array.isArray(message) && message.every(this.isOpperAIChatConversation)) {
            return this.stringifyMessage(message);
        }

        throw new OpperError("The message is not of type string or OpperAIChatConversation[].");
    }

    // Safe type test for the OpperAIChatConversation type
    protected isOpperAIChatConversation(m: unknown): m is Message {
        const candidate = m as Message; // Type assertion to an intermediate type
        return (
            typeof m === "object" &&
            m !== null &&
            typeof candidate.role === "string" &&
            ["assistant", "user"].includes(candidate.role) &&
            "content" in candidate
        );
    }

    // Format post body
    protected stringifyMessage(messages: Message[]) {
        return stringify({ messages });
    }

    protected calcURLChat = (path: string) => {
        return `${this._client.baseURL}/v1/chat/${path}`;
    };

    protected calcURLIndexes = () => {
        return `${this._client.baseURL}/v1/indexes`;
    };
    protected calcURLIndex = (uuid: string) => {
        return `${this._client.baseURL}/v1/indexes/${uuid}`;
    };
    protected calcURLAddIndex = (uuid: string) => {
        return `${this._client.baseURL}/v1/indexes/${uuid}/index`;
    };
    protected calcURLQueryIndex = (uuid: string) => {
        return `${this._client.baseURL}/v1/indexes/${uuid}/query`;
    };
    protected calcURLCreateFunction = () => {
        return `${this._client.baseURL}/api/v1/functions`;
    };
    protected calcURLCall = () => {
        return `${this._client.baseURL}/v1/call`;
    };
    protected calcURLGetFunctionByPath = (path: string) => {
        return `${this._client.baseURL}/api/v1/functions/by_path/${path}`;
    };
    protected calcURLUpdateFunction = (uuid: string) => {
        return `${this._client.baseURL}/api/v1/functions/${uuid}`;
    };

    protected calcURLSpans = () => {
        return `${this._client.baseURL}/v1/spans`;
    };

    protected calcURLSpanById = (spanId: string) => {
        return `${this._client.baseURL}/v1/spans/${spanId}`;
    };

    protected calcURLDatasets(datasetUuid: string): string {
        return `${this._client.baseURL}/v1/datasets/${datasetUuid}`;
    }
}

export default APIResource;
