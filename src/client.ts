import { OPPER_API_URL } from './config';
import { ChatPayload, OpperResponse } from './types';

export class Client {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async chat(functionPath: string, payload: ChatPayload): Promise<OpperResponse> {
        const response = await fetch(`${OPPER_API_URL}/chat/${functionPath}`, {
            method: 'POST',
            headers: {
                'X-OPPER-API-KEY': this.apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`Failed to send chat request: ${response.statusText}`);
        }
        return response.json() as Promise<OpperResponse>;
    }

    async chatStream(functionPath: string, payload: ChatPayload): Promise<ReadableStream<Uint8Array> | null> {
        const response = await fetch(`${OPPER_API_URL}/chat/${functionPath}?stream=True`, {
            method: 'POST',
            headers: {
                'X-OPPER-API-KEY': this.apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`Failed to send chat request: ${response.statusText}`);
        }
        return response.body;
    }
}
