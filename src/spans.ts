import { SpanMetric, Generation } from "./types";

import APIResource from "./api-resource";
import { OpperSpan } from "./traces";

class Spans extends APIResource {
    /**
     * Saves a metric and or a comment for the span to be displayed in the Opper UI.
     * @param span_id - The uuid of the span to save the metric for.
     * @param metric - The metric to save.
     * @returns The uuid of the saved metric.
     */
    public async saveMetric(span_id: string, metric: SpanMetric): Promise<{ uuid: string }> {
        const span = new OpperSpan({ uuid: span_id }, this);
        return await span.saveMetric(metric);
    }

    /**
     * Save all child spans as examples.
     * @param span_id - The uuid of the span to save the examples for.
     * @returns The uuid of the saved examples.
     */
    public async saveExample(span_id: string): Promise<{ uuid: string }> {
        const span = new OpperSpan({ uuid: span_id }, this);
        return await span.saveExample();
    }

    /**
     * Saves a manual generation for the span.
     * @param span_id - The uuid of the span to save the generation for.
     * @param generation - The generation to save.
     * @returns The uuid of the saved generation.
     */
    public async saveGeneration(
        span_id: string,
        generation: Omit<Generation, "called_at"> & { called_at: Date }
    ): Promise<{
        uuid: string;
    }> {
        const span = new OpperSpan({ uuid: span_id }, this);
        return await span.saveGeneration(generation);
    }
}

export default Spans;
