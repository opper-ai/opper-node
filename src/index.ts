import {
    OpperChatResponse,
    OpperCall,
    OpperGenerateImage,
    OpperImageResponse,
    Options,
    EvaluationOptions,
    EvaluationResponse,
    EmbeddingRequest,
    EmbeddingResponse,
} from "./types";

import { OpperError } from "./errors";

import Functions from "./functions";
import Indexes from "./indexes";
import Spans from "./spans";
import Traces, { OpperSpan, OpperTrace } from "./traces";
import Evaluations from "./evaluations";
import Embeddings from "./embeddings";

class Client {
    public baseURL: string;
    public readonly apiKey: string;
    public readonly isUsingAuthorization: boolean;
    public readonly functions: Functions;
    public readonly indexes: Indexes;
    public readonly spans: Spans;
    public readonly traces: Traces;
    public readonly evaluations: Evaluations;
    public readonly embeddings: Embeddings;

    constructor(
        { apiKey, baseURL, isUsingAuthorization, dangerouslyAllowBrowser }: Options = {
            apiKey: process.env.OPPER_API_KEY || "",
            baseURL: process.env.OPPER_API_URL || "https://api.opper.ai",
        }
    ) {
        if (apiKey === undefined || apiKey === "") {
            throw new OpperError("The apiKey is missing or empty.");
        }

        if (!dangerouslyAllowBrowser && this.isRunningInBrowser()) {
            throw new OpperError(
                "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`"
            );
        }

        this.apiKey = apiKey;
        this.baseURL = baseURL || "https://api.opper.ai";
        this.isUsingAuthorization = !!isUsingAuthorization;

        this.functions = new Functions(this);
        this.indexes = new Indexes(this);
        this.spans = new Spans(this);
        this.traces = new Traces(this);
        this.evaluations = new Evaluations(this);
        this.embeddings = new Embeddings(this);
    }

    public async call(fn: OpperCall & { stream: true }): Promise<ReadableStream<unknown>>;
    public async call(fn: OpperCall & { stream?: false | undefined }): Promise<OpperChatResponse>;
    public async call(fn: OpperCall): Promise<ReadableStream<unknown> | OpperChatResponse> {
        if (fn.stream) {
            return await this.functions.stream(fn);
        }

        return await this.functions.call(fn);
    }

    public generateImage = async (args: OpperGenerateImage): Promise<OpperImageResponse> => {
        return await this.functions.generateImage(args);
    };

    /**
     * Creates embeddings for the provided input text.
     * 
     * @param request - The embedding request parameters
     * @returns A promise that resolves to an EmbeddingResponse containing the generated embeddings
     */
    public async createEmbedding(request: EmbeddingRequest): Promise<EmbeddingResponse> {
        return await this.embeddings.create(request);
    }

    /**
     * Evaluate a span using the provided evaluators.
     * @param options The evaluation options
     * @returns The evaluation results
     */
    public async evaluate(options: EvaluationOptions): Promise<EvaluationResponse> {
        return await this.evaluations.evaluate(options);
    }

    private isRunningInBrowser = () => {
        return (
            typeof window !== "undefined" &&
            typeof window.document !== "undefined" &&
            typeof navigator !== "undefined"
        );
    };
}

// Types which are exported for use outside of the SDK
export {
    OpperChatResponse,
    OpperImageResponse,
    OpperIndexDocument,
    OpperIndex,
    OpperCall,
    OpperCallExample,
    OpperCallExamples,
    OpperCallConfigurationParameters,
    EvaluationOptions,
    EvaluationResponse,
    Metric,
    EmbeddingRequest,
    EmbeddingResponse,
} from "./types";

export { OpperMediaHandler } from "./utils";
export { evaluator } from "./evaluators";
export { type OpperSpan, type OpperTrace };

export default Client;
