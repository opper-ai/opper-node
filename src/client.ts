import axios from 'axios';
import { OPPER_API_URL } from './config';
import { ChatPayload, OpperResponse } from './types';

export class Client {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async chat(functionPath: string, payload: ChatPayload): Promise<OpperResponse> {
        try {
            const response = await axios.post(`${OPPER_API_URL}/chat/${functionPath}`, payload, {
                headers: {
                    'X-OPPER-API-KEY': this.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response.data as OpperResponse;
        } catch (error) {
            throw new Error(`Failed to send chat request: ${error}`);
        }
    }
}
