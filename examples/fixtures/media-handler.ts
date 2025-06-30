import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * A class for handling media files in Opper.
 * This class reads a media file from a specified path, determines its MIME type,
 * and provides a method to get the media input in the format required by the Opper API.
 * It also supports saving new media files.
 */
export class OpperMediaHandler {
    private path: string;
    private fileExtension: string;
    private mimeType: string;

    constructor(filePath: string) {
        // If it's just a filename, put it in the fixtures directory
        if (!path.isAbsolute(filePath) && !filePath.includes("/")) {
            this.path = path.join(__dirname, filePath);
        } else {
            this.path = filePath;
        }

        this.fileExtension = this.path.split(".").pop()?.toLowerCase() || "";
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
            case "wav":
                return "audio/wav";
            default:
                throw new Error(
                    "Unsupported file format. Supported types: jpg, jpeg, png, mp3, wav"
                );
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
     * @returns An object with either _opper_image_input or _opper_audio_input key,
     *          containing the base64-encoded data URL of the media file.
     * @throws Error if the media type is not supported.
     */
    public getInput():
        | { _opper_image_input: string }
        | { _opper_media_input: string } {
        const base64Data = this.getBase64Data();
        if (this.mimeType.startsWith("image/")) {
            return {
                _opper_image_input: `data:${this.mimeType};base64,${base64Data}`,
            };
        } else if (this.mimeType.startsWith("audio/")) {
            return {
                _opper_media_input: `data:${this.mimeType};base64,${base64Data}`,
            };
        }
        throw new Error("Unsupported media type");
    }

    /**
     * Returns the data URL format for the media file.
     * @returns A data URL string with the format data:mimeType;base64,encodedData
     */
    public getDataUrl(): string {
        const base64Data = this.getBase64Data();
        return `data:${this.mimeType};base64,${base64Data}`;
    }

    /**
     * Saves base64-encoded media data to a file.
     * @param base64Data The base64-encoded data to save
     * @param filename Optional filename, if not provided will generate one with timestamp
     * @returns The path where the file was saved
     */
    public static saveBase64ToFile(
        base64Data: string,
        filename?: string
    ): string {
        const fixturesDir = __dirname;
        const finalPath = filename
            ? path.join(fixturesDir, filename)
            : path.join(fixturesDir, `generated_image_${Date.now()}.png`);

        const imageData = Buffer.from(base64Data, "base64");
        fs.writeFileSync(finalPath, imageData);
        return finalPath;
    }

    /**
     * Gets the file path for this media handler.
     * @returns The absolute path to the media file
     */
    public getPath(): string {
        return this.path;
    }
}
