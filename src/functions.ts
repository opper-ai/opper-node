import {
    OpperFunctionSchema,
    OpperCall,
    OpperChatResponse,
    OpperGenerateImage,
    OpperImageResponse,
    Chat,
    GetOpperFunctionOptions,
    APIClientContext,
    CacheConfig,
} from "./types";

import APIResource from "./api-resource";
import { OpperError } from "./errors";
import { Dataset } from "./datasets";
import { URLBuilder, BASE_PATHS } from "./utils";

class OpperFunction extends APIResource implements OpperFunctionSchema {
    public readonly uuid: string;
    public readonly dataset_uuid: string;
    public readonly path: string;
    public readonly description: string;
    public readonly instructions: string;
    public readonly model?: string;
    public readonly index_ids?: number[];
    public readonly few_shot?: boolean;
    public readonly few_shot_count?: number;
    public readonly cache_config?: CacheConfig;
    public readonly input_schema?: Record<string, unknown>;
    public readonly out_schema?: Record<string, unknown>;

    constructor(fn: OpperFunctionSchema & { dataset_uuid: string }, ctx: APIClientContext) {
        super(ctx);
        this.uuid = fn.uuid;
        this.dataset_uuid = fn.dataset_uuid;
        this.path = fn.path;
        this.description = fn.description;
        this.instructions = fn.instructions;
        this.model = fn.model;
        this.index_ids = fn.index_ids;
        this.few_shot = fn.few_shot;
        this.few_shot_count = fn.few_shot_count;
        this.cache_config = fn.cache_config;
        this.input_schema = fn.input_schema;
        this.out_schema = fn.out_schema;
    }

    /**
     * Get the dataset for the function.
     * @returns A promise that resolves to a Dataset object.
     */
    public async dataset(): Promise<Dataset> {
        return new Dataset(this.dataset_uuid, this);
    }
}

class Functions extends APIResource {
    protected calcURLChat = (path: string) => {
        const urlBuilder = new URLBuilder(this.baseURL);
        const url = urlBuilder.buildURL(BASE_PATHS.CHAT);
        return `${url}/${path}`;
    };
    protected calcURLCall = () => {
        const urlBuilder = new URLBuilder(this.baseURL);
        return urlBuilder.buildURL(BASE_PATHS.CALL);
    };
    protected calcURLFunctions = () => {
        const urlBuilder = new URLBuilder(this.baseURL);
        return urlBuilder.buildURL(BASE_PATHS.FUNCTIONS);
    };
    protected calcURLGetFunctionByPath = (path: string) => {
        return `${this.calcURLFunctions()}/by_path/${path}`;
    };
    protected calcURLUpdateFunctionByUUID = (uuid: string) => {
        return `${this.calcURLFunctions()}/${uuid}`;
    };
    protected calcURLGenerateImage = () => {
        const urlBuilder = new URLBuilder(this.baseURL);
        return urlBuilder.buildURL(BASE_PATHS.GENERATE_IMAGE);
    };

    /**
     * This method is used to initiate a chat with the OpperAI API.
     * The response is a promise that resolves to an object with the message and context.
     * @param path - The path to the chat endpoint.
     * @param message - The message to be sent.
     * @returns A promise that resolves to an object with the message and context.
     * @throws {APIError} If the response status is not 200.
     * @throws {OpperError} If the response has an error.
     */
    public async chat({
        path,
        message,
        parent_span_uuid,
        examples,
    }: Chat): Promise<OpperChatResponse> {
        if (examples && Array.isArray(examples) && examples.length > 10) {
            throw new OpperError("Maximum number of examples is 10");
        }

        const url = this.calcURLChat(path);
        const body = this.calcChatPayload(message, parent_span_uuid, examples);

        const data = await this.doPost<OpperChatResponse>(url, body);

        return data;
    }

    public async get(options: GetOpperFunctionOptions): Promise<OpperFunction> {
        let url: string | null = null;

        if (options.name) {
            url = this.calcURLGetFunctionByPath(options.name);
        }

        if (options.uuid) {
            url = this.calcURLUpdateFunctionByUUID(options.uuid);
        }

        if (!url) {
            throw new OpperError("Function uuid or name is required");
        }

        const fn = await this.doGet<OpperFunctionSchema>(url);

        return new OpperFunction(fn, this);
    }

    /**
     * Updates an existing function in the OpperAI API.
     * @param fn - The OpperFunction object containing the updated function details.
     * @returns A promise that resolves to the updated OpperFunction.
     * @throws {OpperError} If the function uuid is missing or if the update fails.
     */
    public async update(fn: OpperFunctionSchema): Promise<OpperFunctionSchema> {
        if (!fn.uuid) {
            throw new OpperError("Function uuid is required");
        }
        const data = await this.doPost<OpperFunctionSchema>(
            this.calcURLUpdateFunctionByUUID(fn.uuid),
            fn
        );

        return data;
    }

    /**
     * Creates a new function in the OpperAI API.
     * @param fn - The OpperFunction object containing the function details to be created.
     * @returns A promise that resolves to the created OpperFunction, including the assigned UUID.
     * @throws {OpperError} If the function creation fails.
     */
    public async create(fn: OpperFunctionSchema): Promise<OpperFunctionSchema> {
        const data = await this.doPost<{ uuid: string }>(this.calcURLFunctions(), fn);

        return { ...fn, uuid: data.uuid };
    }

    /**
     * Calls a function in the OpperAI API.
     * @param fn - The OpperCall object containing the function call parameters.
     * @returns A promise that resolves to an OpperChatResponse containing the function call result.
     * @throws {OpperError} If the number of examples exceeds 10 or if the function call fails.
     */
    public async call(fn: OpperCall): Promise<OpperChatResponse> {
        if (fn.examples && Array.isArray(fn.examples) && fn.examples.length > 10) {
            throw new OpperError("Maximum number of examples is 10");
        }

        const data = await this.doPost<OpperChatResponse>(this.calcURLCall(), {
            ...fn,
            input_type: fn?.input_schema,
            output_type: fn?.output_schema,
        });

        return data;
    }

    /**
     * Generates an image using the OpperAI API.
     * @param args - The OpperGenerateImage object containing the image generation parameters.
     * @param args.model - Optional. The model to use for image generation. Defaults to "azure/dall-e-3-eu".
     * @param args.parameters - Additional parameters for image generation.
     * @returns A promise that resolves to an OpperImageResponse containing the generated image as bytes.
     * @throws {OpperError} If the image generation fails.
     */
    public async generateImage(args: OpperGenerateImage): Promise<OpperImageResponse> {
        const model = args.model || "azure/dall-e-3-eu";

        const data = await this.doPost<{ result: { base64_image: string } }>(
            this.calcURLGenerateImage(),
            {
                ...args,
                model: model,
                parameters: args.parameters,
            }
        );

        const base64Image = data.result.base64_image;
        const imageBytes = Buffer.from(base64Image, "base64");

        return {
            bytes: imageBytes,
        };
    }

    /**
     * Streams the response from an OpperAI function call.
     * @param fn - The OpperCall object containing the function call parameters.
     * @returns A promise that resolves to a ReadableStream of the function's response.
     * This stream can be used to process the response data as it arrives.
     */
    public async stream(fn: OpperCall): Promise<ReadableStream<unknown>> {
        const iterator = this.urlStreamIterator(this.calcURLCall(), {
            ...fn,
            input_type: fn?.input_schema,
            output_type: fn?.output_schema,
        });
        const pipe = this.iteratorToStream(iterator);

        return pipe;
    }
}

export default Functions;
