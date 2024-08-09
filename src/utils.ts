import crypto from "node:crypto";

export function djb2(str: string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return Math.abs(hash).toString();
}

export const nanoId = () => {
    return crypto.randomUUID();
};

export const stringify = (value: unknown): string => {
    if (value === null) {
        return "null";
    }
    if (value === undefined) {
        return "undefined";
    }
    if (typeof value === "object" || Array.isArray(value)) {
        try {
            return JSON.stringify(value);
        } catch (error) {
            return "[Circular]";
        }
    }
    return String(value);
};
