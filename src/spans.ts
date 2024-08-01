import { Span, SpanMetric, Generation } from "./types";

import APIResource from "./api-resource";
import { OpperError } from "./errors";

class Spans extends APIResource {
    /**
     * Helper method to start a new span and set the current span context.
     * @param span - The span data to be created.
     * @returns A promise that resolves to the UUID of the created span.
     * @throws {APIError} If the response status is not 200.
     */
    public async startSpan({
        name = "mising_name",
        input = "",
        start_time = new Date(),
        uuid = this.nanoId(),
        ...rest
    }: Omit<Span, "uuid"> & { uuid?: string }) {
        return this.create({
            ...rest,
            name,
            input,
            start_time,
            uuid,
        });
    }

    /**
     * This method is used to end an existing span.
     * It sends a PUT request to the spans endpoint with the provided span data.
     * @param span - The span data to be updated.
     * @returns A promise that resolves to the UUID of the updated span.
     * @throws {APIError} If the response status is not 200.
     */
    public async endSpan({ uuid, end_time = new Date(), parent_uuid, ...rest }: Span) {
        return this.update(uuid, {
            ...rest,
            uuid,
            end_time,
            parent_uuid,
        });
    }

    /**
     * This method is used to create a new span.
     * It sends a POST request to the spans endpoint with the provided span data.
     * @param span - The span data to be created.
     * @returns A promise that resolves to the created span.
     * @throws {APIError} If the response status is not 200.
     */
    public async create(span: Span): Promise<Span> {
        const url = this.calcURLSpans();
        const body = JSON.stringify(span);

        const response = await this.doPost(url, body);

        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(
                `Failed to create span: ${response.statusText}, ${JSON.stringify(responseData)}`
            );
        }

        const data = await response.json();

        return { ...span, uuid: data.uuid };
    }

    /**
     * This method is used to update an existing span.
     * It sends a PUT request to the spans endpoint with the provided span UUID and data.
     * @param spanUuid - The UUID of the span to be updated.
     * @param spanData - The new data for the span.
     * @returns A promise that resolves to the updated span.
     * @throws {APIError} If the response status is not 200.
     */
    public async update(spanUuid: string, spanData: Partial<Span>): Promise<Span> {
        const url = this.calcURLSpanById(spanUuid);
        const body = JSON.stringify(spanData);

        const response = await this.doPut(url, body);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(
                `Failed to update span: ${response.status} ${response.statusText}, ${JSON.stringify(responseData)}`
            );
        }

        const data = await response.json();

        return {
            ...spanData,
            uuid: data.uuid,
        };
    }

    /**
     * This method is used to delete an existing span.
     * It sends a DELETE request to the spans endpoint with the provided span UUID.
     * @param spanUuid - The UUID of the span to be deleted.
     * @returns A promise that resolves to true if the span was successfully deleted.
     * @throws {APIError} If the response status is not 204.
     */
    public async delete(spanUuid: string): Promise<boolean> {
        const url = this.calcURLSpanById(spanUuid);

        const response = await this.doDelete(url);
        if (response.status !== 204) {
            throw new OpperError(`Failed to delete span: ${response.statusText}`);
        }

        return true;
    }

    /**
     * Attaches a metric to a span. (e.g "faithfulness", "context_simlarity")
     * @param spanUuid - The UUID of the span to save feedback for.
     * @param metric - Metric
     * @returns A promise that resolves to the UUID of the span metric was saved for.
     * @throws {APIError} If the response status is not 200.
     */
    public async saveMetric(spanUuid: string, metric: SpanMetric): Promise<string> {
        const url = this.calcURLSpanById(`${spanUuid}/metrics`);
        const body = JSON.stringify(metric);

        const response = await this.doPost(url, body);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(
                `Failed to add metric for span: ${response.statusText}, ${JSON.stringify(responseData)}`
            );
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
        const url = this.calcURLSpanById(`${spanUuid}/save_examples`);

        const response = await this.doPost(url, undefined);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(
                `Failed to save examples for span: ${response.statusText}, ${JSON.stringify(responseData)}`
            );
        }

        const data = await response.json();
        return data.uuid;
    }

    /**
     * This method is used to manually save a generation for a span.
     * It sends a POST request to the spans generation endpoint with the provided span UUID.
     * @param spanUuid - The UUID of the span to save the generation for.
     * @param generation - The generation to save.
     * @returns A promise that resolves to the UUID of the span generation was saved for.
     * @throws {APIError} If the response status is not 200.
     */
    public async saveGeneration(spanUuid: string, generation: Generation): Promise<string> {
        const url = this.calcURLSpanById(`${spanUuid}/generation`);
        const body = JSON.stringify(generation);
        const response = await this.doPost(url, body);
        if (response.status !== 200) {
            const responseData = await response.json();
            throw new OpperError(
                `Failed to save generation for span: ${response.statusText}, ${JSON.stringify(responseData)}`
            );
        }
        const data = await response.json();
        return data.uuid;
    }
}

export default Spans;
