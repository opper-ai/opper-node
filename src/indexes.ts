import { OPPER_API_URL } from './config';
import { IndexDescription, IndexResponse } from './types';

export class Indexes {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    private async doRequest(method: string, path: string, body?: any): Promise<any> {
        const headers = {
            'X-OPPER-API-KEY': this.apiKey,
            'Content-Type': 'application/json',
        };
        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };
        const response = await fetch(`${OPPER_API_URL}${path}`, options);
        if (!response.ok) {
            throw new Error(`Failed to ${method} ${OPPER_API_URL}${path} request: ${response.statusText}`);
        }
        return response.json();
    }

    async createIndex(indexDesc: IndexDescription): Promise<any> {
        return this.doRequest('POST', '/indexes', indexDesc);
    }

    async deleteIndex(indexId: number): Promise<void> {
        await this.doRequest('DELETE', `/indexes/${indexId}`);
    }

    async listIndexes(): Promise<IndexDescription[]> {
        return this.doRequest('GET', '/indexes');
    }

    async getIndexByName(name: string): Promise<IndexDescription | null> {
        const indexes = await this.listIndexes();
        const index = indexes.find(index => index.name === name);
        if (!index) {
            throw new Error(`Index with name ${name} not found`);
        }
        return index;
    }

    async uploadFileToIndex(indexId: number, filePath: string): Promise<any> {
        const filename = filePath.split('/').pop();
        if (!filename) {
            throw new Error(`Failed to parse file name from path: ${filePath}`);
        }

        // Get upload URL
        const uploadUrlResponse = await this.doRequest('GET', `/indexes/${indexId}/upload_url?filename=${encodeURIComponent(filename)}`);

        // Upload file
        const formData = new FormData();
        Object.keys(uploadUrlResponse.fields).forEach(key => {
            formData.append(key, uploadUrlResponse.fields[key]);
        });
        formData.append('file', new Blob([filename], { type: 'text/plain' }));

        const uploadResponse = await fetch(uploadUrlResponse.url, {
            method: 'POST',
            body: formData,
            headers: {},
        });
        if (!uploadResponse.ok) {
            throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
        }
        // Register file
        return this.doRequest('POST', `/indexes/${indexId}/register_file`, {
            uuid: uploadUrlResponse.uuid,
        });
    }

    async indexDocument(indexId: number, document: any): Promise<any> {
        return this.doRequest('POST', `/indexes/${indexId}/index`, document);
    }

    async retrieveDocuments(indexId: number, query: string, k: number): Promise<any[]> {
        return this.doRequest('POST', `/indexes/${indexId}/query`, { q: query, k });
    }
}