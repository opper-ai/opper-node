import {
    Generation,
    SpanMetric,
    SpanStartOptions,
    SpanEndOptions,
    APIClientContext,
} from "./types";
import { OpperError } from "./errors";
import { nanoId, stringify } from "./utils";

import APIResource from "./api-resource";

export class OpperTrace extends APIResource {
    public uuid: string;

    protected calcURLSpanById = (path: string = "") => {
        const uuid = this.uuid;
        return `${this.calcURLSpans()}/${uuid}${path}`;
    };

    constructor(
        { uuid }: { uuid: string },
        { baseURL, apiKey, isUsingAuthorization }: APIClientContext
    ) {
        super({ baseURL, apiKey, isUsingAuthorization });

        this.uuid = uuid;
    }

    /**
     * Starts a new child span.
     */
    public async startSpan({
        name = "mising_name",
        input,
        start_time = new Date(),
        metadata,
    }: SpanStartOptions) {
        const uuid = nanoId();
        const parent_uuid = this.uuid;
        const url = this.calcURLSpans();

        const response = await this.doPost(url, {
            name,
            input: stringify(input),
            start_time,
            uuid,
            parent_uuid,
            metadata,
        });

        if (response.ok) {
            const data = await response.json();
            return new OpperSpan({ uuid: data.uuid }, this);
        }

        throw new OpperError(`Failed to start span: ${response.statusText}`);
    }

    /**
     * Ends the current span.
     */
    public async end({ output, end_time = new Date() }: SpanEndOptions) {
        const uuid = this.uuid;
        const url = this.calcURLSpanById();

        const response = await this.doPut(url, {
            uuid,
            output: stringify(output),
            end_time,
        });

        if (response.ok) {
            return { uuid };
        }

        throw new OpperError(`Failed to end trace: ${response.statusText}`);
    }
}

export class OpperSpan extends OpperTrace {
    /**
     * Saves a metric and or a comment for the span to be displayed in the Opper UI.
     */
    public async saveMetric(metric: SpanMetric): Promise<{ uuid: string }> {
        const url = this.calcURLSpanById(`/metrics`);

        const response = await this.doPost(url, metric);

        if (response.ok) {
            const data = await response.json();
            return { uuid: data.uuid };
        }

        throw new OpperError(`Failed to add metric for span: ${response.statusText}`);
    }

    /**
     * Saves a manual generation for the span.
     */
    public async saveGeneration({ called_at = new Date(), ...generation }: Generation): Promise<{
        uuid: string;
    }> {
        const url = this.calcURLSpanById(`/generation`);

        const response = await this.doPost(url, { called_at, ...generation });

        if (response.ok) {
            const data = await response.json();
            return { uuid: data.uuid };
        }

        throw new OpperError(`Failed to save generation for span: ${response.statusText}`);
    }

    /**
     * Save all child spans as examples.
     */
    public async saveExample(): Promise<{ uuid: string }> {
        const url = this.calcURLSpanById(`/save_examples`);

        const response = await this.doPost(url, {});

        if (response.ok) {
            const data = await response.json();
            return { uuid: data.uuid };
        }

        throw new OpperError(`Failed to save examples for span: ${response.statusText}`);
    }
}

class Traces extends APIResource {
    /**
     * Starts a new trace.
     */
    public async start({
        name = "mising_name",
        input,
        start_time = new Date(),
        metadata,
    }: SpanStartOptions) {
        const url = this.calcURLSpans();

        const response = await this.doPost(url, {
            name,
            input: stringify(input),
            start_time,
            uuid: nanoId(),
            ...(metadata && { meta: metadata }),
        });

        if (response.ok) {
            const data = await response.json();
            return new OpperTrace({ uuid: data.uuid }, this);
        }

        throw new OpperError(`Failed to start trace: ${response.statusText}`);
    }
}

export default Traces;
