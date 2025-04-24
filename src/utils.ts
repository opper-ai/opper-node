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

/**
 * A class for handling media files in Opper.
 * This class reads a media file from a specified path, determines its MIME type,
 * and provides a method to get the media input in the format required by the Opper API.
 */
export class OpperMediaHandler {
    private path: string;
    private fileExtension: string;
    private mimeType: string;

    constructor(path: string) {
        this.path = path;
        this.fileExtension = path.split(".").pop()?.toLowerCase() || "";
        this.mimeType = this.getMimeType();
    }

    /**
     * Determines the MIME type of the media file based on its file extension.
     * @returns The MIME type of the media file.
     * @throws Error if the file extension is not supported.
     */
    private getMimeType(): string {
        switch (this.fileExtension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "mp3":
                return "audio/mp3";
            case "pdf":
                return "application/pdf";
            default:
                throw new Error("Unsupported file format. Supported types: jpg, jpeg, png, mp3, pdf");
        }
    }

    /**
     * Reads the file from the specified path and returns its contents as a base64-encoded string.
     * @returns A base64-encoded string representation of the file's contents.
     */
    private getBase64Data(): string {
        return Buffer.from(fs.readFileSync(this.path)).toString("base64");
    }

    /**
     * Returns the media input in the format required by the Opper API.
     * @returns An object with _opper_image_input, _opper_audio_input, or _opper_pdf_input key,
     *          containing the base64-encoded data URL of the media file.
     * @throws Error if the media type is not supported.
     */
    public getInput(): { _opper_image_input: string } | { _opper_audio_input: string } | { _opper_pdf_input: string } {
        const base64Data = this.getBase64Data();
        if (this.mimeType.startsWith("image/")) {
            return {
                _opper_image_input: `data:${this.mimeType};base64,${base64Data}`,
            };
        } else if (this.mimeType.startsWith("audio/")) {
            return {
                _opper_audio_input: `data:${this.mimeType};base64,${base64Data}`,
            };
        } else if (this.mimeType === "application/pdf") {
            return {
                _opper_pdf_input: `data:${this.mimeType};base64,${base64Data}`,
            };
        }
        throw new Error("Unsupported media type");
    }
}

/**
 * Base paths used throughout the application
 */
export const BASE_PATHS = {
    SPANS: "/v1/spans",
    TRACES: "/v1/traces",
    INDEXES: "/v1/indexes",
    CHAT: "/v1/chat",
    CALL: "/v1/call",
    FUNCTIONS: "/api/v1/functions",
    GENERATE_IMAGE: "/v1/generate-image",
    DATASETS: "/v1/datasets",
    EMBEDDINGS: "/v1/embeddings",
};

export class URLBuilder {
    constructor(private readonly baseURL: string) {}

    /**
     * Builds a complete URL by combining the base URL with a path
     */
    public buildURL(path: string): string {
        return `${this.baseURL}${path}`;
    }

    /**
     * Builds a resource URL with an ID
     */
    public buildResourceURL(basePath: string, resourceId: string, subPath: string = ""): string {
        return `${this.baseURL}${basePath}/${resourceId}${subPath}`;
    }
}
