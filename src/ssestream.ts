import { ReadableStreamDefaultReader } from 'web-streams-polyfill/ponyfill/es6';
import { Client } from './client';
import { ChatPayload, SSEStreamCallbacks } from './types';


export class SSEClient {
    private client: Client;

    constructor(apiKey: string) {
        this.client = new Client(apiKey);
    }

    async startStream(topic: string, payload: ChatPayload, callbacks: SSEStreamCallbacks): Promise<void> {
        try {
            const stream = await this.client.chatStream(topic, payload);
            if (stream) {
                const reader = stream.getReader();
                await this.processSSEStream(reader as any, callbacks);
            } else {
                console.log('No stream available.');
            }
        } catch (error) {
            console.error(error);
        }
    }

    private async processSSEStream(
        reader: ReadableStreamDefaultReader<Uint8Array>,
        callbacks: SSEStreamCallbacks
    ): Promise<void> {
        let buffer = "";

        try {
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
        } catch (error: any) {
            if (error?.name === "AbortError") {
                callbacks.onCancel ? callbacks.onCancel() : callbacks.onComplete();
            } else {
                console.error("Error reading stream:", error);
                callbacks.onError(error as Error);
            }
        }
    }
}