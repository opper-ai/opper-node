import type Client from "./index";
import { OpperIndexDocument, OpperIndexQuery, OpperIndex } from "./types";

import { OpperError } from "./errors";
import APIResource from "./api-resource";

export class Index extends APIResource {
    public _index: OpperIndex;
    protected _client: Client;

    constructor(index: OpperIndex, client: Client) {
        super(client);
        this._client = client;
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
        await this.doPost(this.calcURLAddIndex(this._index.uuid), document);
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
        const response = await this.doPost(this.calcURLQueryIndex(this._index.uuid), {
            q: query,
            k: k,
            filters: filters,
            parent_span_uuid,
        });

        if (response.ok) {
            const documents = await response.json();
            return documents;
        }

        throw new OpperError(`Failed to query index: ${response.statusText}`);
    }
}

class Indexes extends APIResource {
    /**
     * This method retrieves a list of indexes from the OpperAI API.
     * It sends a GET request to the indexes endpoint and returns the response as an array of OpperAIIndex objects.
     * @returns A promise that resolves to an array of OpperAIIndex objects.
     * @throws {APIError} If the response status is not 200.
     */
    public async list(): Promise<OpperIndex[]> {
        const url = this.calcURLIndexes();

        const response = await this.doGet(url);

        if (response.ok) {
            const indexes = await response.json();
            return indexes;
        }

        throw new OpperError(`Failed to list indexes: ${response.statusText}`);
    }

    /**
     * Creates an index in the OpperAI API.
     * @param name The name of the index to create.
     * @param embedding_model Optional. The embedding model to use for the index.
     * @returns A promise that resolves to the created index.
     * @throws {APIError} If the response status is not 200.
     */
    public async create(name: string, embedding_model?: string): Promise<Index> {
        const response = await this.doPost(this.calcURLIndexes(), {
            name,
            ...(embedding_model && { embedding_model }),
        });

        const data = await response.json();

        return new Index(data, this._client);
    }

    /**
     * Deletes an index
     * @param uuid The uuid of the index to delete.
     * @returns A promise that resolves to void.
     * @throws {APIError} If the response status is not 200.
     */
    public async delete(uuid: string): Promise<void> {
        await this.doDelete(this.calcURLIndex(uuid));
    }

    /**
     * Retrieves an index by name.
     * @param name The name of the index to retrieve.
     * @returns A promise that resolves to the index.
     * @throws {APIError} If the response status is not 200.
     */
    public async get(name: string) {
        const list = await this.list();
        const index = list.find((index) => index.name === name);

        if (!index) {
            return null;
        }
        return new Index(index, this._client);
    }
}

export default Indexes;
