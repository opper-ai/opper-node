import {
    Generation,
    SpanMetric,
    SpanStartOptions,
    SpanEndOptions,
    APIClientContext,
} from "./types";
import { nanoId, stringify, URLBuilder, BASE_PATHS } from "./utils";

import APIResource from "./api-resource";

export class OpperTrace extends APIResource {
    public uuid: string;

    protected calcBaseURL = () => {
        const urlBuilder = new URLBuilder(this.baseURL);
        return urlBuilder.buildURL(BASE_PATHS.SPANS);
    };

    protected calcResourceURL = (path: string = "") => {
        const urlBuilder = new URLBuilder(this.baseURL);
        const uuid = this.uuid;
        return urlBuilder.buildResourceURL(BASE_PATHS.SPANS, uuid, path);
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
        uuid = nanoId(),
        metadata,
        type,
    }: SpanStartOptions & {
        uuid?: string;
        type?: string;
    }) {
        const parent_uuid = this.uuid;
        const url = this.calcBaseURL();

        const data = await this.doPost<{ uuid: string }>(url, {
            name,
            input: stringify(input),
            start_time,
            uuid,
            parent_uuid,
            metadata,
            type,
        });

        return new OpperSpan({ uuid: data.uuid }, this);
    }

    /**
     * Ends the current span.
     */
    public async end({ output, end_time = new Date() }: SpanEndOptions) {
        const uuid = this.uuid;
        const url = this.calcResourceURL();

        const data = await this.doPut<{ uuid: string }>(url, {
            uuid,
            output: stringify(output),
            end_time,
        });

        return data;
    }
}

export class OpperSpan extends OpperTrace {
    /**
     * Saves a metric and or a comment for the span to be displayed in the Opper UI.
     */
    public async saveMetric(metric: SpanMetric): Promise<{ uuid: string }> {
        const url = this.calcResourceURL(`/metrics`);
        const data = await this.doPost<{ uuid: string }>(url, metric);

        return data;
    }

    /**
     * Save all child spans as examples.
     */
    public async saveExample(): Promise<{ uuid: string }> {
        const url = this.calcResourceURL(`/save_examples`);
        const data = await this.doPost<{ uuid: string }>(url, {});

        return data;
    }

    /**
     * Saves a manual generation for the span.
     */
    public async saveGeneration({ called_at = new Date(), ...generation }: Generation): Promise<{
        uuid: string;
    }> {
        const url = this.calcResourceURL(`/generation`);
        const data = await this.doPost<{ uuid: string }>(url, { called_at, ...generation });

        return data;
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
        const data = await this.doPost<{ uuid: string }>(`${this.baseURL}/v1/spans`, {
            name,
            input: stringify(input),
            start_time,
            uuid: nanoId(),
            ...(metadata && { meta: metadata }),
        });

        return new OpperTrace({ uuid: data.uuid }, this);
    }

    /**
     * Manually create a new span.
     */
    public async startSpan({
        uuid,
        parent_uuid,
        name = "mising_name",
        input,
        start_time = new Date(),
        metadata,
        type,
    }: SpanStartOptions & {
        /**
         * The uuid of the span to be created.
         * If not provided, a new uuid will be generated.
         */
        uuid?: string;
        /**
         * The uuid of the parent span.
         */
        parent_uuid?: string;
        /**
         * The type of the span.
         */
        type?: string;
    }) {
        const data = await this.doPost<{ uuid: string }>(`${this.baseURL}/v1/spans`, {
            name,
            input: stringify(input),
            start_time,
            uuid,
            type,
            parent_uuid,
            ...(metadata && { meta: metadata }),
        });

        return new OpperTrace({ uuid: data.uuid }, this);
    }
}

export default Traces;
