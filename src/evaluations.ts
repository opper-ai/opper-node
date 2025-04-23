import APIResource from './api-resource';
import { EvaluationOptions, EvaluationResponse, Metric } from './types';
import { getEvaluatorName } from './evaluators';
import type Client from '.';

export default class Evaluations extends APIResource {
    private readonly client: Client;

    constructor(client: Client) {
        super(client);
        this.client = client;
    }

    /**
     * Run evaluation for a given span using the provided evaluators.
     * 
     * @param options The evaluation options
     * @returns The evaluation response
     */
    public async evaluate(options: EvaluationOptions): Promise<EvaluationResponse> {
        const { span_id, evaluators } = options;

        // Process the evaluators to get the results
        const evaluatorResults: Record<string, Metric[]> = {};
        
        await Promise.all(
            evaluators.map(async (evaluatorResult) => {
                try {
                    // Get the evaluator name from the function if it's a direct function result
                    // Otherwise, use a generic name based on index
                    const evaluatorName = 
                        evaluatorResult instanceof Promise 
                            ? 'evaluator'
                            : getEvaluatorName(evaluatorResult.constructor);
                    
                    // Resolve the evaluator result
                    const metrics = await evaluatorResult;
                    
                    // Store the metrics under the evaluator name
                    evaluatorResults[evaluatorName] = metrics;
                    
                    // Also save the metrics to the span
                    for (const metric of metrics) {
                        await this.saveMetric(span_id, metric);
                    }
                } catch (error) {
                    console.error('Error running evaluator:', error);
                }
            })
        );

        return {
            metrics: evaluatorResults
        };
    }

    /**
     * Save a metric to a span.
     * 
     * @param spanId The ID of the span
     * @param metric The metric to save
     */
    private async saveMetric(spanId: string, metric: Metric): Promise<void> {
        await this.client.spans.saveMetric(spanId, {
            dimension: metric.dimension,
            value: metric.value,
            comment: metric.comment
        });
    }
} 