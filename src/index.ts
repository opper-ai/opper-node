import { OpperAIChatResponse, OpperCall, Options } from "./types";

import { djb2 } from "./utils";
import { OpperError } from "./errors";

import Datasets from "./datasets";
import Functions from "./functions";
import Indexes from "./indexes";
import Spans from "./spans";
import Traces from "./traces";

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
        };
    };

    isRunningInBrowser = () => {
        return (
            typeof window !== "undefined" &&
            typeof window.document !== "undefined" &&
            typeof navigator !== "undefined"
        );
    };

    call = async ({
        name,
        input,
        description,
        instructions = "default",
        // output_schema,
        parent_span_uuid,
        ...rest
    }: OpperCall): Promise<OpperAIChatResponse> => {
        const path = name ? name : djb2(instructions);

        await this.functions.create({
            path: path,
            instructions: instructions,
            description: description || instructions,
            // out_schema: output_schema,
            ...rest,
        });

        return await this.functions.chat({
            path: path,
            message: input,
            parent_span_uuid,
        });
    };
}

export default Client;
