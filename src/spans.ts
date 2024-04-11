import APIResource from './api-resource';
import { APIError, OpperError } from './errors';
import { Span, SpanFeedback } from './types';

import { AsyncLocalStorage } from 'async_hooks';

interface SpanContext {
    spanId: string;
}

const spanContextStorage = new AsyncLocalStorage<SpanContext>();


export function getCurrentSpanId(): string | undefined {
    const context = spanContextStorage.getStore();
    return context?.spanId;
}

class Spans extends APIResource {

    /**
     * Helper method to start a new span and set the current span context.
     * @param span - The span data to be created.
     * @returns A promise that resolves to the UUID of the created span.
     * @throws {APIError} If the response status is not 200.
     */
    public async startSpan(span: Span) {
        const spanId = span.uuid;
        if (!span.start_time) {
            span.start_time = new Date();
        }
        const currentSpanId = getCurrentSpanId();
        if (currentSpanId && !span.parent_uuid) {
            span.parent_uuid = currentSpanId;
        }
        spanContextStorage.enterWith({ spanId });
        return this.create(span);
    }

    /**
     * This method is used to end an existing span.
     * It sends a PUT request to the spans endpoint with the provided span data.
     * @param span - The span data to be updated.
     * @returns A promise that resolves to the UUID of the updated span.
     * @throws {APIError} If the response status is not 200.
     */
    public async endSpan(span: Span) {
        if (!span.end_time) {
            span.end_time = new Date();
        }
        if (span.parent_uuid) {
            spanContextStorage.run({ spanId: span.parent_uuid }, () => { });
        }
        spanContextStorage.run({ spanId: '' }, () => { });
        return this.update(span.uuid, span);
    }

    /**
     * This method is used to create a new span.
     * It sends a POST request to the spans endpoint with the provided span data.
     * @param span - The span data to be created.
     * @returns A promise that resolves to the UUID of the created span.
     * @throws {APIError} If the response status is not 200.
     */
    public async create(span: Span): Promise<string> {
        const url = `${this._client.baseURL}/v1/spans`;
        if (!span.project) {
            span.project = process.env.OPPER_PROJECT || 'missing_project';
        }
        const body = JSON.stringify(span);


        const response = await this.doPost(url, body);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(`Failed to create span: ${response.statusText}, ${JSON.stringify(responseData)}`);
        }

        const data = await response.json();
        return data.uuid;
    }

    /**
     * This method is used to update an existing span.
     * It sends a PUT request to the spans endpoint with the provided span UUID and data.
     * @param spanUuid - The UUID of the span to be updated.
     * @param spanData - The new data for the span.
     * @returns A promise that resolves to the UUID of the updated span.
     * @throws {APIError} If the response status is not 200.
     */
    public async update(spanUuid: string, spanData: Partial<Span>): Promise<string> {
        const url = `${this._client.baseURL}/v1/spans/${spanUuid}`;
        const body = JSON.stringify(spanData);

        const response = await this.doPut(url, body);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(`Failed to update span: ${response.status} ${response.statusText}, ${JSON.stringify(responseData)}`);
        }

        const data = await response.json();
        return data.uuid;
    }

    /**
     * This method is used to delete an existing span.
     * It sends a DELETE request to the spans endpoint with the provided span UUID.
     * @param spanUuid - The UUID of the span to be deleted.
     * @returns A promise that resolves to true if the span was successfully deleted.
     * @throws {APIError} If the response status is not 204.
     */
    public async delete(spanUuid: string): Promise<boolean> {
        const url = `${this._client.baseURL}/v1/spans/${spanUuid}`;

        const response = await this.doDelete(url);
        if (response.status !== 204) {
            throw new OpperError(`Failed to delete span: ${response.statusText}`);
        }

        return true;
    }

    /**
     * This method is used to save feedback for a span.
     * It sends a POST request to the spans feedback endpoint with the provided span UUID and feedback data.
     * @param spanUuid - The UUID of the span to save feedback for.
     * @param feedback - The feedback data.
     * @returns A promise that resolves to the UUID of the span feedback was saved for.
     * @throws {APIError} If the response status is not 200.
     */
    public async saveFeedback(spanUuid: string, feedback: SpanFeedback): Promise<string> {
        const url = `${this._client.baseURL}/v1/spans/${spanUuid}/feedbacks`;
        const body = JSON.stringify(feedback);

        const response = await this.doPost(url, body);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(`Failed to add feedback for span: ${response.statusText}, ${JSON.stringify(responseData)}`);
        }

        const data = await response.json();
        return data.uuid;
    }

    /**
     * This method is used to save examples for a span.
     * It sends a POST request to the spans examples endpoint with the provided span UUID.
     * @param spanUuid - The UUID of the span to save examples for.
     * @returns A promise that resolves to the UUID of the span examples were saved for.
     * @throws {APIError} If the response status is not 200.
     */
    public async saveExample(spanUuid: string): Promise<string> {
        const url = `${this._client.baseURL}/v1/spans/${spanUuid}/save_examples`;

        const response = await this.doPost(url, undefined);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(`Failed to save examples for span: ${response.statusText}, ${JSON.stringify(responseData)}`);
        }

        const data = await response.json();
        return data.uuid;
    }
}

export default Spans;
