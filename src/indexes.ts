import fs from "node:fs";

import { OpperIndexDocument, OpperIndexQuery, OpperIndex, APIClientContext } from "./types";

import { OpperError } from "./errors";
import APIResource from "./api-resource";

export class Index extends APIResource {
    public _index: OpperIndex;
    public uuid: string;

    protected calcURLAddIndex = () => {
        return `${this.baseURL}/v1/indexes/${this.uuid}/index`;
    };
    protected calcURLQueryIndex = () => {
        return `${this.baseURL}/v1/indexes/${this.uuid}/query`;
    };
    protected calcURLUploadUrl = (fileName: string) => {
        return `${this.baseURL}/v1/indexes/${this.uuid}/upload_url?filename=${encodeURIComponent(fileName)}`;
    };
    protected calcURLRegisterFile = () => {
        return `${this.baseURL}/v1/indexes/${this.uuid}/register_file`;
    };

    constructor(index: OpperIndex, { baseURL, apiKey, isUsingAuthorization }: APIClientContext) {
        super({ baseURL, apiKey, isUsingAuthorization });

        this.uuid = index.uuid;
        this._index = index;
    }

    /**
     * Adds a document to an index.
     * @param document The document to add to the index.
     * @throws {APIError} If the response status is not 200.
     *
     * @example
     * ```ts
     * const index = await client.indexes.create('support-tickets');
     * await index.add({
     *      title: 'My first support ticket',
     *      content: 'This is my first support ticket.',
     *      metadata: {
     *          priority: 'high',
     *          tags: ['bug', 'urgent'],
     *      }
     * });
     * ```
     */
    public async add(document: OpperIndexDocument): Promise<void> {
        await this.doPost(this.calcURLAddIndex(), document);
    }

    /**
     * Queries the most relevant documents from an index based on semantic similarity to a query.
     * @param query The query to retrieve documents for.
     * @param k The maximum number of documents to retrieve.
     * @param filters Optional. The filters to apply to the documents in the index.
     * @param parent_span_uuid Optional. The parent span uuid to use for the request.
     * @returns A promise that resolves to an array of OpperIndexDocument objects.
     * @throws {APIError} If the response status is not 200.
     *
     * @example
     * ```ts
     * const documents = await index.query({ query: 'I cannot log in to my account', k: 10 });
     * ```
     */
    public async query({
        query,
        k,
        filters,
        parent_span_uuid,
    }: OpperIndexQuery): Promise<OpperIndexDocument[]> {
        const documents = await this.doPost<OpperIndexDocument[]>(this.calcURLQueryIndex(), {
            q: query,
            k: k,
            filters: filters,
            parent_span_uuid,
        });

        return documents;
    }

    /**
     * Uploads a file to an index.
     * @param filePath The path to the file to upload.
     * @returns A promise that resolves to the registered file.
     * @throws {APIError} If the response status is not 200.
     *
     * @example
     * ```ts
     * const file = await index.uploadFile("./example.txt");
     * ```
     */
    public async uploadFile(path: string): Promise<{
        uuid: string;
        key: string;
        original_filename: string;
        document_id: number;
    }> {
        // Get upload URL
        const fileName = path.split("/").pop() || "";
        const uploadUrlData = await this.doGet<{
            uuid: string;
            url: string;
            fields: Record<string, string>;
        }>(this.calcURLUploadUrl(fileName));

        // Upload file
        const fileContent = await fs.promises.readFile(path);
        const formData = new FormData();
        Object.entries(uploadUrlData.fields).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        formData.append("file", new Blob([fileContent]), fileName);

        const uploadResponse = await fetch(uploadUrlData.url, {
            method: "POST",
            body: formData,
        });

        if (!uploadResponse.ok) {
            throw new OpperError(`Failed to upload file: ${uploadResponse.statusText}`);
        }

        // Register file
        const registerFileResponse = await this.doPost<{
            uuid: string;
            key: string;
            original_filename: string;
            document_id: number;
        }>(this.calcURLRegisterFile(), {
            uuid: uploadUrlData.uuid,
        });

        return registerFileResponse;
    }
}

class Indexes extends APIResource {
    protected calcURLIndexes = () => {
        return `${this.baseURL}/v1/indexes`;
    };
    protected calcURLIndexByUUID = (uuid: string) => {
        return `${this.baseURL}/v1/indexes/${uuid}`;
    };

    constructor({ baseURL, apiKey, isUsingAuthorization }: APIClientContext) {
        super({ baseURL, apiKey, isUsingAuthorization });
    }

    /**
     * This method retrieves a list of indexes from the OpperAI API.
     * It sends a GET request to the indexes endpoint and returns the response as an array of OpperAIIndex objects.
     * @returns A promise that resolves to an array of OpperAIIndex objects.
     * @throws {APIError} If the response status is not 200.
     */
    public async list(): Promise<OpperIndex[]> {
        const url = this.calcURLIndexes();
        const indexes = await this.doGet<OpperIndex[]>(url);

        return indexes;
    }

    /**
     * Creates an index in the OpperAI API.
     * @param name The name of the index to create.
     * @param embedding_model Optional. The embedding model to use for the index.
     * @returns A promise that resolves to the created index.
     * @throws {APIError} If the response status is not 200.
     */
    public async create(name: string, embedding_model?: string): Promise<Index> {
        const url = this.calcURLIndexes();
        const data = await this.doPost<OpperIndex>(url, {
            name,
            ...(embedding_model && { embedding_model }),
        });

        return new Index(data, this);
    }

    /**
     * Deletes an index
     * @param uuid The uuid of the index to delete.
     * @returns A promise that resolves to a boolean indicating success.
     */
    public async delete(uuid: string): Promise<boolean> {
        const url = this.calcURLIndexByUUID(uuid);
        const deleted = await this.doDelete<boolean>(url);

        return deleted;
    }

    /**
     * Retrieves an index by name.
     * @param name The name of the index to retrieve.
     * @returns A promise that resolves to the index.
     */
    public async get(name: string) {
        const list = await this.list();
        const index = list.find((index) => index.name === name);

        if (!index) {
            return null;
        }
        return new Index(index, this);
    }
}

export default Indexes;
