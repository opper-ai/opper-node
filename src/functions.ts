import {
    OpperFunctionSchema,
    OpperCall,
    OpperChatResponse,
    OpperGenerateImage,
    OpperImageResponse,
    Chat,
    GetOpperFunctionOptions,
    APIClientContext,
} from "./types";

import APIResource from "./api-resource";
import { OpperError } from "./errors";
import { Dataset } from "./datasets";

class OpperFunction extends APIResource {
    public uuid: string;
    public dataset_uuid: string;

    constructor(fn: OpperFunctionSchema & { dataset_uuid: string }, ctx: APIClientContext) {
        super(ctx);
        this.uuid = fn.uuid;
        this.dataset_uuid = fn.dataset_uuid;
    }

    public async dataset(): Promise<Dataset> {
        return new Dataset(this.dataset_uuid, this);
    }
}

class Functions extends APIResource {
    protected calcURLChat = (path: string) => {
        return `${this.baseURL}/v1/chat/${path}`;
    };
    protected calcURLCall = () => {
        return `${this.baseURL}/v1/call`;
    };
    protected calcURLFunctions = () => {
        return `${this.baseURL}/api/v1/functions`;
    };
    protected calcURLGetFunctionByPath = (path: string) => {
        return `${this.calcURLFunctions()}/by_path/${path}`;
    };
    protected calcURLUpdateFunctionByUUID = (uuid: string) => {
        return `${this.calcURLFunctions()}/${uuid}`;
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

        const response = await this.doPost(url, body);

        return (await response.json()) as OpperChatResponse;
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

        const response = await this.doGet(url);

        if (response.ok) {
            const fn = await response.json();

            return new OpperFunction(fn, this);
        }

        throw new OpperError(`Failed to get function: ${response.statusText}`);
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
        const response = await this.doPost(this.calcURLUpdateFunctionByUUID(fn.uuid), fn);

        if (response.ok) {
            return fn;
        }

        throw new OpperError(`Failed to update function: ${response.statusText}`);
    }

    /**
     * Creates a new function in the OpperAI API.
     * @param fn - The OpperFunction object containing the function details to be created.
     * @returns A promise that resolves to the created OpperFunction, including the assigned UUID.
     * @throws {OpperError} If the function creation fails.
     */
    public async create(fn: OpperFunctionSchema): Promise<OpperFunctionSchema> {
        const response = await this.doPost(this.calcURLFunctions(), fn);

        if (response.ok) {
            const data = await response.json();

            return { ...fn, uuid: data.uuid };
        }

        throw new OpperError(`Failed to create function: ${response.statusText}`);
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

        const response = await this.doPost(this.calcURLCall(), {
            ...fn,
            input_type: fn?.input_schema,
            output_type: fn?.output_schema,
        });

        if (response.ok) {
            const data = await response.json();

            return data;
        }

        throw new OpperError(`Failed to call function: ${response.statusText}`);
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

        const response = await this.doPost(this.calcURLGenerateImage(), {
            ...args,
            model: model,
            parameters: args.parameters,
        });

        if (response.ok) {
            const data = await response.json();
            const base64Image = data.result.base64_image;
            const imageBytes = Buffer.from(base64Image, "base64");

            return {
                bytes: imageBytes,
            };
        }

        throw new OpperError(`Failed to generate image: ${response.statusText}`);
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
