import type Client from "./index";

import { Generation, SpanMetric } from "./types";
import { OpperError } from "./errors";
import { nanoId } from "./utils";

import APIResource from "./api-resource";

interface SpanStartOptions {
    /**
     * The name of the span to be displayed in the Opper UI.
     */
    name?: string;
    /**
     * The starting input of the span.
     */
    input?: string;
    /**
     * The start time of the span. Defaults to the current date.
     */
    start_time?: Date;
}

interface SpanEndOptions {
    /**
     * The ending output of the span to be displayed in the Opper UI.
     */
    output: string;
    /**
     * The end time of the span. Defaults to the current date.
     */
    end_time?: Date;
}

class Trace {
    public uuid: string;
    protected _client: Client;

    constructor({ uuid }: { uuid: string }, client: Client) {
        this._client = client;
        this.uuid = uuid;
    }

    /**
     * Starts a new child span.
     */
    public async startSpan({
        name = "mising_name",
        input = "",
        start_time = new Date(),
    }: SpanStartOptions) {
        const uuid = nanoId();
        const parent_uuid = this.uuid;
        const url = this.calcURLSpans();

        const response = await this.doPost(
            url,
            JSON.stringify({
                name,
                input,
                start_time,
                uuid,
                parent_uuid,
            })
        );

        if (response.ok) {
            const data = await response.json();
            return new Span({ uuid: data.uuid }, this._client);
        }

        throw new OpperError(`Failed to start span: ${response.statusText}`);
    }

    /**
     * Ends the current span.
     */
    public async end({ output, end_time = new Date() }: SpanEndOptions) {
        const uuid = this.uuid;
        const url = this.calcURLSpanById();

        const span = {
            uuid,
            output,
            end_time,
        };

        const response = await this.doPut(url, JSON.stringify(span));

        if (response.ok) {
            return { ...span };
        }

        throw new OpperError(`Failed to end trace: ${response.statusText}`);
    }

    protected calcURLSpans = () => {
        return `${this._client.baseURL}/v1/spans`;
    };

    protected calcURLSpanById = (path: string = "") => {
        const uuid = this.uuid;
        return `${this.calcURLSpans()}/${uuid}${path}`;
    };

    protected async doPut(url: string, body: string) {
        const headers = this._client.calcAuthorizationHeaders();

        return await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body,
        });
    }

    protected async doPost(url: string, body?: string) {
        const headers = this._client.calcAuthorizationHeaders();

        return await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ?? undefined,
        });
    }
}

class Span extends Trace {
    /**
     * Saves a metric and or a comment for the span to be displayed in the Opper UI.
     */
    public async saveMetric(metric: SpanMetric): Promise<{ uuid: string }> {
        const url = this.calcURLSpanById(`/metrics`);
        const body = JSON.stringify(metric);

        const response = await this.doPost(url, body);

        if (response.ok) {
            const data = await response.json();
            return { uuid: data.uuid };
        }

        throw new OpperError(`Failed to add metric for span: ${response.statusText}`);
    }

    /**
     * Saves a manual generation for the span.
     */
    public async saveGeneration(generation: Generation): Promise<{ uuid: string }> {
        const url = this.calcURLSpanById(`/generation`);
        const body = JSON.stringify(generation);

        const response = await this.doPost(url, body);

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

        const response = await this.doPost(url);

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
        input = "",
        start_time = new Date(),
    }: SpanStartOptions) {
        const url = this.calcURLSpans();

        const response = await this.doPost(
            url,
            JSON.stringify({
                name,
                input,
                start_time,
                uuid: nanoId(),
            })
        );

        if (response.ok) {
            const data = await response.json();
            return new Trace({ uuid: data.uuid }, this._client);
        }

        throw new OpperError(`Failed to start trace: ${response.statusText}`);
    }
}

export default Traces;
