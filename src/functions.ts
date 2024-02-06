import { OPPER_API_URL_INTERNAL } from './config';
import { FunctionDescription, FunctionResponse } from './types';

export class Functions {
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
            body: JSON.stringify(body),
        };
        const response = await fetch(`${OPPER_API_URL_INTERNAL}${path}`, options);
        if (!response.ok) {
            throw new Error(`Failed to ${method} to ${OPPER_API_URL_INTERNAL}${path} request: ${response.statusText}`);
        }
        return response.json();
    }

    async createFunction(functionDesc: FunctionDescription): Promise<any> {
        return this.doRequest('POST', '/functions', functionDesc);
    }

    async updateFunction(functionId: number, functionDesc: FunctionDescription): Promise<number> {
        return this.doRequest('POST', `/functions/${functionId}`, functionDesc);
    }

    async getFunctionByPath(functionPath: string): Promise<FunctionDescription | null> {
        try {
            return this.doRequest('GET', `/functions/by_path/${functionPath}`);
        } catch (error) {
            if ((error as Error).message.includes('404')) {
                return null;
            }
            throw error;
        }
    }

    async getFunctionById(functionId: string): Promise<FunctionDescription | null> {
        try {
            return this.doRequest('GET', `/functions/${functionId}`);
        } catch (error) {
            if ((error as Error).message.includes('404')) {
                return null;
            }
            throw error;
        }
    }

    async createOrUpdateFunction(functionDesc: FunctionDescription): Promise<number> {
        const existingFunction = await this.getFunctionByPath(functionDesc.path);
        if (existingFunction === null) {
            return this.createFunction(functionDesc);
        } else {
            return this.updateFunction(existingFunction.id!, functionDesc);
        }
    }

    async deleteFunction(functionPath: string): Promise<void> {
        await this.doRequest('DELETE', `/functions/by_path/${functionPath}`);
    }

    async getFunctions(): Promise<FunctionDescription[]> {
        return this.doRequest('GET', '/functions/for_org');
    }
}
