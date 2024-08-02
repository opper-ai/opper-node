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
}

export interface SSEStreamCallbacks {
    controller?: AbortController | null;
    onMessage: (json: unknown) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
    onCancel?: () => void;
}

export interface OpperAIStream {
    path: string;
    parent_span_uuid?: string;
    message: string | Message[];
    callbacks: SSEStreamCallbacks;
}

export interface OpperAIChatResponse {
    span_id: string;
    message: string;
    json_payload?: Record<string, unknown>;
    context: unknown;
    error?: string;
    cached?: boolean;
}

export type IndexFileData = {
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

export type Index = {
    uuid: string;
    name: string;
    created_at: Date;
    files: IndexFileData[];
};

export type FilterOperation = "=" | "!=" | ">" | "<" | "in";

export interface Filter {
    key: string;
    operation: FilterOperation;
    value: string | number | Array<string | number>;
}

export type Document = {
    uuid?: string;
    key?: string; // a unique key that one can use if you want to update the document
    content: string;
    metadata: Record<string, unknown>;
};

export type BaseOpperCall = {
    /**
     * The input to the function.
     */
    input: string;
    /**
     * Description of the function for reference in the Opper UI.
     * Will default to the instructions if not provided.
     */
    description?: string;
    /**
     * The instructions for the call sent to the model to be used as part of the prompt.
     */
    instructions?: string;
    /**
     * The model to use to generate the output.
     * See: https://docs.opper.ai/functions/models
     */
    model?: string;
    input_schema?: Record<string, unknown>;
    output_schema?: Record<string, unknown>;
    parent_span_uuid?: string;
};

export type OpperCall =
    // Basic call
    | (BaseOpperCall & {
          name?: string;
          few_shot?: never;
          few_shot_count?: never;
          cache_config?: never;
      })
    // Adavanced named function call
    | (BaseOpperCall & {
          name: string;
          few_shot?: boolean;
          few_shot_count?: number;
          cache_config?: CacheConfig;
      });

export type AIFunction = {
    uuid?: string;
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
    dataset_uuid?: string;
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
    dimension?: string; // E.g. "accuracy", "faithfulness", "fluency"
    score?: number; // Assuming the score is between 0 and 1 as per Python's ge=0 and le=1
    comment?: string;
};

export type Generation = {
    called_at: Date;
    duration_ms: number;
    model?: string;
    response?: string;
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
    error?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages?: Array<Record<string, any>>;
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
    comment?: string;
    span_id?: string;
    trace_id?: string;
    created_at?: Date;
    updated_at?: Date;
};
