import APIResource from "./api-resource";
import { OpperError } from "./errors";
import { OpperTrace } from "./types";

class Trace extends APIResource {
    public async start({ start_time = new Date(), ...rest }: Omit<OpperTrace, "uuid">) {
        const url = this.calcURLSpans();

        const span = {
            ...rest,

            start_time,
            uuid: this.nanoId(),
        };

        const response = await this.doPost(url, JSON.stringify(span));

        if (response.ok) {
            const data = await response.json();
            return { ...span, uuid: data.uuid };
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

export default Trace;
