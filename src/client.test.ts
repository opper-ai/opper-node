import { Client } from './client';

describe('Client', () => {
    it('should create an instance of Client with the provided API key', () => {
        const apiKey = 'test-api-key';
        const client = new Client(apiKey);
        expect(client).toBeInstanceOf(Client);
        // expect(client.apiKey).toBe(apiKey);
    });
});