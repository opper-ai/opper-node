import crypto from "node:crypto";
import fs from "node:fs";

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

export const image = (path: string): {_opper_image_input: string} => {
    const fileExtension = path.split('.').pop()?.toLowerCase();
    let mimeType: string;

    switch (fileExtension) {
        case 'jpg':
        case 'jpeg':
            mimeType = 'image/jpeg';
            break;
        case 'png':
            mimeType = 'image/png';
            break;
        default:
            throw new Error('unsupported image format');
    }

    return {_opper_image_input: `data:${mimeType};base64,${Buffer.from(fs.readFileSync(path)).toString('base64')}`};
}