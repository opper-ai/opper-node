import { Span, SpanMetric, Generation } from "./types";

import APIResource from "./api-resource";
import { OpperError } from "./errors";
import { nanoId } from "./utils";

class Spans extends APIResource {
    protected calcURLSpanById = (spanId: string) => {
        return `${this.baseURL}/v1/spans/${spanId}`;
    };

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
        uuid = nanoId(),
        ...rest
    }: Omit<Span, "uuid"> & { uuid?: string }): Promise<Span> {
        const url = this.calcURLSpans();

        const span = {
            ...rest,
            name,
            input,
            start_time,
            uuid,
        };

        const data = await this.doPost<{ uuid: string }>(url, span);

        return { ...span, uuid: data.uuid };
    }

    /**
     * This method is used to end an existing span.
     * It sends a PUT request to the spans endpoint with the provided span data.
     * @param span - The span data to be updated.
     * @returns A promise that resolves to the UUID of the updated span.
     * @throws {APIError} If the response status is not 200.
     */
    public async endSpan({ uuid, end_time = new Date(), parent_uuid, ...rest }: Span) {
        const url = this.calcURLSpanById(uuid);
        const span = {
            ...rest,
            uuid,
            end_time,
            parent_uuid,
        };

        await this.doPut<Span>(url, span);

        return { ...span };
    }

    /**
     * This method is used to delete an existing span.
     * It sends a DELETE request to the spans endpoint with the provided span UUID.
     * @param uuid - The UUID of the span to be deleted.
     * @returns A promise that resolves to true if the span was successfully deleted.
     * @throws {APIError} If the response status is not 204.
     */
    public async delete(uuid: string): Promise<boolean> {
        const url = this.calcURLSpanById(uuid);

        const response = await this.doDelete(url);
        if (response.status !== 204) {
            throw new OpperError(`Failed to delete span: ${response.statusText}`);
        }

        return true;
    }

    /**
     * Attaches a metric to a span. (e.g "faithfulness", "context_simlarity")
     * @param uuid - The UUID of the span to save feedback for.
     * @param metric - Metric
     * @param metric.dimension - Metric dimension E.g. "accuracy", "faithfulness", "fluency"
     * @param metric.score - Metric score is between 0 and 1 as per Python's ge=0 and le=1
     * @param metric.comment - Metric comment
     * @returns A promise that resolves to the UUID of the span metric was saved for.
     * @throws {APIError} If the response status is not 200.
     */
    public async saveMetric(uuid: string, metric: SpanMetric): Promise<string> {
        const url = this.calcURLSpanById(`${uuid}/metrics`);

        const data = await this.doPost<{ uuid: string }>(url, metric);

        return data.uuid;
    }

    /**
     * This method is used to save examples for a span.
     * It sends a POST request to the spans examples endpoint with the provided span UUID.
     * @param uuid - The UUID of the span to save examples for.
     * @returns A promise that resolves to the UUID of the span examples were saved for.
     * @throws {APIError} If the response status is not 200.
     */
    public async saveExample(uuid: string): Promise<string> {
        const url = this.calcURLSpanById(`${uuid}/save_examples`);

        const data = await this.doPost<{ uuid: string }>(url, {});

        return data.uuid;
    }

    /**
     * This method is used to manually save a generation for a span.
     * It sends a POST request to the spans generation endpoint with the provided span UUID.
     * @param uuid - The UUID of the span to save the generation for.
     * @param generation - The generation to save.
     * @returns A promise that resolves to the UUID of the span generation was saved for.
     * @throws {APIError} If the response status is not 200.
     */
    public async saveGeneration(
        uuid: string,
        generation: Omit<Generation, "called_at"> & { called_at: Date }
    ): Promise<string> {
        const url = this.calcURLSpanById(`${uuid}/generation`);
        const data = await this.doPost<{ uuid: string }>(url, generation);

        return data.uuid;
    }
}

export default Spans;
