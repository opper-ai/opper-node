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
