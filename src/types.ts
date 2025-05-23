type MaxTen = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Options = {
    /**
     * OpperAI [API key](https://docs.opper.ai/api-keys)
     */
    apiKey: string;

    /**
     * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
     */
    dangerouslyAllowBrowser?: boolean;

    /**
     * Override the base url if needed
     * Defaults to https://api.opper.ai
     */
    baseURL?: string;

    isUsingAuthorization?: boolean;
};

export type Message = {
    role: "user" | "assistant";
    content: string;
};

export interface Chat {
    parent_span_uuid?: string;
    path: string;
    message: string | Message[];
    /**
     * Manual examples to use as part of the prompt to guide the model.
     * There is a hard limit of 10 examples.
     */
    examples?: OpperCallExamples;
}

export interface SSEStreamCallbacks {
    controller?: AbortController | null;
    onMessage: (json: unknown) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
    onCancel?: () => void;
}

export interface OpperChatResponse {
    span_id: string;
    message: string;
    json_payload?: Record<string, unknown>;
    context: unknown;
    error?: string;
    cached?: boolean;
}

export interface OpperImageResponse {
    bytes: Uint8Array;
}

export type OpperIndexFile = {
    uuid: string;
    original_filename: string;
    size: number;
    index_status:
        | "init"
        | "pending"
        | "uploading"
        | "indexing"
        | "success"
        | "indexed"
        | "error"
        | "failed"
        | "invalid";
    n_vectors: number;
};

export type OpperIndex = {
    uuid: string;
    name: string;
    created_at: Date;
    files: OpperIndexFile[];
};

export type OpperIndexFilterOperation = "=" | "!=" | ">" | "<" | "in";

export interface OpperIndexFilter {
    key: string;
    operation: OpperIndexFilterOperation;
    value: string | number | Array<string | number>;
}

export type OpperIndexDocument = {
    uuid?: string;
    key?: string; // a unique key that one can use if you want to update the document
    content: string;
    metadata: Record<string, unknown>;
};

export type OpperIndexQuery = {
    /**
     * The query to retrieve documents for.
     */
    query: string;
    /**
     * The maximum number of documents to retrieve.
     */
    k: number;
    /**
     * The filters to apply to the documents in the index.
     */
    filters?: OpperIndexFilter[];
    /**
     * The parent span uuid to use for the request.
     */
    parent_span_uuid?: string;
};

export type OpperCallExample = {
    input: unknown;
    output: unknown;
    comment?: string;
};

export type OpperCallExamples = OpperCallExample[] & { length: MaxTen };

export interface OpperCallConfigurationParameters {
    invocation?: {
        /**
         * Use few shot prompting (also know as In Context Learning) to enable Opper to automatically pull in
         * semantically relevant examples that will guide the model.
         * See: https://docs.opper.ai/datasets
         */
        few_shot?: {
            /**
             * The number of few shot examples to use.
             */
            count?: number;
        };
    };
    model_parameters?: Record<string, unknown>;
}

export interface OpperGenerateImage {
    prompt: string;
    model?: string;
    parameters?: Record<string, unknown>;
    parent_span_uuid?: string;
    configuration?: OpperCallConfigurationParameters;
}

export type OpperCall = {
    /**
     * The name of the function to be used in the Opper UI.
     */
    name: string;

    /**
     * The input to the function.
     */
    input: string | Record<string, unknown>;

    /**
     * The instructions for the call sent to the model to be used as part of the prompt.
     * Defaults to "you are a helpful assistant".
     */
    instructions?: string;

    /**
     * The model to use to generate the output.
     * See: https://docs.opper.ai/functions/models
     */
    model?: string;

    /**
     * The input schema for the function.
     */
    input_schema?: Record<string, unknown>;

    /**
     * The output schema for the function.
     */
    output_schema?: Record<string, unknown>;

    /**
     * This is used to attach to an existing span.
     * If not provided, a new span will be created and displayed in the Opper UI.
     */
    parent_span_uuid?: string;

    /**
     * Manual examples to use as part of the prompt to guide the model.
     * There is a hard limit of 10 examples.
     */
    examples?: OpperCallExample[] & { length: MaxTen };

    /**
     * Whether to stream the response from the function.
     */
    stream?: boolean;

    /**
     * Configuration for the function.
     */
    configuration?: OpperCallConfigurationParameters;

    /**
     * Fallback models to use if the primary model fails.
     */
    fallback_models?: string[];

    /**
     * Tags to be associated with the function call.
     * These can be used for tracking, filtering, and organizing function calls.
     */
    tags?: Record<string, string>;
};

export type OpperFunctionSchema = {
    uuid: string;
    path: string;
    description: string;
    instructions: string;
    model?: string;
    index_ids?: number[];
    few_shot?: boolean;
    few_shot_count?: number;
    cache_config?: CacheConfig;
    input_schema?: Record<string, unknown>;
    out_schema?: Record<string, unknown>;
    dataset_uuid: string;
};

export interface CacheConfig {
    exact_match_cache_tll: number;
    semantic_cache_threshold: number;
    semantic_cache_tll: number;
}

export type Span = {
    uuid: string;
    name?: string;
    input?: string;
    output?: string;
    start_time?: Date;
    parent_uuid?: string;
    end_time?: Date;
    error?: string;
    meta?: Record<string, unknown>;
    evaluations?: Record<string, unknown>;
    score?: number;
};

export type SpanMetric = {
    /**
     * Dimension of the metric. E.g. "accuracy", "faithfulness", "fluency"
     */
    dimension?: string;
    /**
     * Value of the metric. E.g. 0.95
     */
    value?: number;
    /**
     * @deprecated Use 'value' instead
     * Score of the metric. E.g. 0.95
     */
    score?: number;
    /**
     * Comment of the metric. E.g. "The answer is correct"
     */
    comment?: string;
};

export type Generation = {
    called_at?: Date;
    duration_ms: number;
    model?: string;
    response?: string;
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    error?: string;

    messages?: Message[];
    cost?: number;
};

export type Dataset = {
    uuid: string;
    name: string;
    description?: string;
    project_uuid: string;
    created_at?: Date;
    updated_at?: Date;
};

export type DatasetEntry = {
    uuid: string;
    input: string;
    output: string;
    expected: string;
    comment?: string;
    span_id?: string;
    trace_id?: string;
    created_at?: Date;
    updated_at?: Date;
};

export interface SpanStartOptions {
    /**
     * The name of the span to be displayed in the Opper UI.
     */
    name?: string;
    /**
     * The starting input of the span.
     */
    input: unknown;
    /**
     * The start time of the span. Defaults to the current date.
     */
    start_time?: Date;

    /**
     * The metadata of the span to be displayed in the Opper UI.
     */
    metadata?: Record<string, unknown>;
}

export interface SpanEndOptions {
    /**
     * The ending output of the span to be displayed in the Opper UI.
     */
    output: unknown;
    /**
     * The end time of the span. Defaults to the current date.
     */
    end_time?: Date;
}

export type GetOpperFunctionOptions =
    | { uuid: string; name?: never }
    | { uuid?: never; name: string };

export interface APIClientContext {
    baseURL: string;
    apiKey: string;
    isUsingAuthorization: boolean;
}

export type Metric = {
    /**
     * Dimension of the metric. E.g. "accuracy", "faithfulness", "fluency"
     */
    dimension: string;
    /**
     * Value of the metric, between 0 and 1.
     */
    value: number;
    /**
     * Comment explaining the metric or providing additional context.
     */
    comment?: string;
};

export type EvaluatorFn = (...args: any[]) => Promise<Metric[]> | Metric[];

export type EvaluatorResult = Promise<Metric[]> | Metric[];

export interface EvaluationResponse {
    metrics: Record<string, Metric[]>;
}

export interface EvaluationOptions {
    /**
     * The span ID to associate the evaluation with
     */
    span_id: string;
    /**
     * The evaluators to run
     */
    evaluators: EvaluatorResult[];
}

export interface EmbeddingRequest {
    /**
     * The model to use for embedding generation.
     * This is required for the API request.
     */
    model: string;
    
    /**
     * Either a single string or an array of strings to embed.
     */
    input: string | string[];
    
    /**
     * Optional format for the embedding vector data.
     */
    encoding_format?: string;
    
    /**
     * Optional unique identifier for the end-user.
     */
    user?: string;
    
    /**
     * This is used to attach to an existing span.
     * If not provided, a new span will be created and displayed in the Opper UI.
     */
    parent_span_uuid?: string;
}

export interface EmbeddingResponse {
    /**
     * The span ID for this embedding request.
     */
    span_id: string;
    
    /**
     * Array of embeddings, one for each input string.
     */
    data: {
        /**
         * The generated embedding vector.
         */
        embedding: number[];
        
        /**
         * Additional properties provided by the embedding model.
         */
        [additionalProp1: string]: any;
    }[];
    
    /**
     * Additional usage information.
     */
    usage: {
        /**
         * Number of tokens in the input prompt.
         */
        prompt_tokens: number;
        
        /**
         * Total tokens used.
         */
        total_tokens: number;
    };
}
