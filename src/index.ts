import {
    OpperChatResponse,
    OpperCall,
    OpperGenerateImage,
    OpperImageResponse,
    Options,
} from "./types";

import { OpperError } from "./errors";

import Datasets from "./datasets";
import Functions from "./functions";
import Indexes from "./indexes";
import Spans from "./spans";
import Traces, { OpperSpan, OpperTrace } from "./traces";

class Client {
    public baseURL: string;

    private apiKey: string;
    private isUsingAuthorization: boolean;

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
    }

    functions = new Functions(this);
    indexes = new Indexes(this);
    spans = new Spans(this);
    datasets = new Datasets(this);
    traces = new Traces(this);

    calcAuthorizationHeaders = () => {
        const isUsingAuthorization = this.isUsingAuthorization;
        const apiKey = this.apiKey;

        const key = isUsingAuthorization ? "Authorization" : "X-OPPER-API-KEY";
        const value = isUsingAuthorization ? `Bearer ${apiKey}` : apiKey;

        return {
            [key]: value,
            "User-Agent": `opper-node/${process.env.PACKAGE_VERSION || "0.0.0"}`,
        };
    };

    isRunningInBrowser = () => {
        return (
            typeof window !== "undefined" &&
            typeof window.document !== "undefined" &&
            typeof navigator !== "undefined"
        );
    };

    async call(fn: OpperCall & { stream: true }): Promise<ReadableStream<unknown>>;
    async call(fn: OpperCall & { stream?: false | undefined }): Promise<OpperChatResponse>;
    async call(fn: OpperCall): Promise<ReadableStream<unknown> | OpperChatResponse> {
        if (fn.stream) {
            return await this.functions.stream(fn);
        }

        return await this.functions.call(fn);
    }

    generateImage = async (args: OpperGenerateImage): Promise<OpperImageResponse> => {
        return await this.functions.generateImage(args);
    };
}

// Types which are exported for use outside of the SDK
export { OpperChatResponse, OpperImageResponse, OpperIndexDocument, OpperIndex } from "./types";

export { OpperMediaHandler } from "./utils";

export { type OpperSpan, type OpperTrace };

export default Client;
