import type Client from "./index";

import { OpperTrace, Generation, SpanMetric } from "./types";
import { OpperError } from "./errors";
import { nanoId } from "./utils";

import APIResource from "./api-resource";

class Trace {
    public uuid: string;
    protected _client: Client;

    constructor({ uuid }: { uuid: string }, client: Client) {
        this._client = client;
        this.uuid = uuid;
    }

    public async startSpan({
        name = "mising_name",
        input = "",
        start_time = new Date(),
    }: {
        name?: string;
        input?: string;
        start_time?: Date;
    }) {
        const uuid = nanoId();
        const parent_uuid = this.uuid;
        const url = this.calcURLSpans();

        const span = {
            name,
            input,
            start_time,
            uuid,
            parent_uuid,
        };

        const response = await this.doPost(url, JSON.stringify(span));

        if (response.ok) {
            const data = await response.json();
            return new Span({ uuid: data.uuid }, this._client);
        }

        throw new OpperError(`Failed to start span: ${response.statusText}`);
    }

    public async end({ output, end_time = new Date() }: { output: string; end_time?: Date }) {
        const uuid = this.uuid;
        const url = this.calcURLSpanById(uuid);

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

    protected calcURLSpanById = (spanId: string) => {
        return `${this._client.baseURL}/v1/spans/${spanId}`;
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
    public async saveMetric(metric: SpanMetric): Promise<{ uuid: string }> {
        const uuid = this.uuid;
        const url = this.calcURLSpanById(`${uuid}/metrics`);
        const body = JSON.stringify(metric);

        const response = await this.doPost(url, body);

        if (response.ok) {
            const data = await response.json();
            return { uuid: data.uuid };
        }

        throw new OpperError(`Failed to add metric for span: ${response.statusText}`);
    }

    public async saveGeneration(generation: Generation): Promise<{ uuid: string }> {
        const uuid = this.uuid;
        const url = this.calcURLSpanById(`${uuid}/generation`);
        const body = JSON.stringify(generation);

        const response = await this.doPost(url, body);

        if (response.ok) {
            const data = await response.json();
            return { uuid: data.uuid };
        }

        throw new OpperError(`Failed to save generation for span: ${response.statusText}`);
    }

    public async saveExample(): Promise<{ uuid: string }> {
        const uuid = this.uuid;
        const url = this.calcURLSpanById(`${uuid}/save_examples`);

        const response = await this.doPost(url);

        if (response.ok) {
            const data = await response.json();
            return { uuid: data.uuid };
        }

        throw new OpperError(`Failed to save examples for span: ${response.statusText}`);
    }
}

class Traces extends APIResource {
    public async start({ start_time = new Date(), ...rest }: Omit<OpperTrace, "uuid">) {
        const url = this.calcURLSpans();

        const span = {
            ...rest,
            start_time,
            uuid: nanoId(),
        };

        const response = await this.doPost(url, JSON.stringify(span));

        if (response.ok) {
            const data = await response.json();
            return new Trace({ uuid: data.uuid }, this._client);
        }

        throw new OpperError(`Failed to start trace: ${response.statusText}`);
    }

    public async end({ uuid, end_time = new Date(), ...rest }: OpperTrace) {
        const url = this.calcURLSpanById(uuid);
        const span = {
            ...rest,
            uuid,
            end_time,
        };

        const response = await this.doPut(url, JSON.stringify(span));
        if (response.ok) {
            return { ...span };
        }

        throw new OpperError(`Failed to end trace: ${response.statusText}`);
    }
}

export default Traces;
