export class OpperError extends Error {
    constructor(message: string | undefined) {
        super(`OpperAIClient: ${message}`);
    }
}

export class APIError extends OpperError {
    readonly status: number | undefined;

    constructor(status: number | undefined, message: string | undefined) {
        super(`${APIError.calcMessage(status, message)}`);

        this.status = status;
    }

    private static calcMessage(status: number | undefined, message: string | undefined) {
        if (status && message) {
            return `${status} ${message}`;
        }
        if (status) {
            return `${status} status code (no body)`;
        }
        if (message) {
            return message;
        }
        return "(no status code or body)";
    }
}
