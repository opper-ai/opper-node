import crypto from "node:crypto";

export const nanoId = () => {
    return crypto.randomUUID();
};

export const stringify = (value: unknown): string | undefined => {
    if (value === undefined) return undefined;
    if (value === null) return "null";

    try {
        return JSON.stringify(value);
    } catch {
        return typeof value === "object" ? "[Circular]" : String(value);
    }
};
