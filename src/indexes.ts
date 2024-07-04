import { Document, Filter, Index } from "./types";

import APIResource from "./api-resource";
import { getCurrentSpanId } from "./context";

class Indexes extends APIResource {
    /**
     * This method retrieves a list of indexes from the OpperAI API.
     * It sends a GET request to the indexes endpoint and returns the response as an array of OpperAIIndex objects.
     * @returns A promise that resolves to an array of OpperAIIndex objects.
     * @throws {APIError} If the response status is not 200.
     */
    public async list() {
        const url = this.calcURLIndexes();

        const response = await this.doGet(url);

        const indexes: Index[] = await response.json();

        return indexes;
    }

    /**
     * Retrieves an index by name from the OpperAI API.
     * @param name The name of the index to retrieve.
     * @returns A promise that resolves to the index with the given name, or null if no index with the given name exists.
     * @throws {APIError} If the response status is not 200.
     */
    public async get(name: string): Promise<Index | null> {
        const list = await this.list();

        const index = list.find((index) => index.name === name);

        if (!index) {
            return null;
        }
        return index;
    }

    /**
     * Creates an index in the OpperAI API.
     * @param name The name of the index to create.
     * @returns A promise that resolves to the created index.
     * @throws {APIError} If the response status is not 200.
     */
    public async create(name: string): Promise<Index> {
        const response = await this.doPost(this.calcURLIndexes(), JSON.stringify({ name: name }));

        const data = await response.json();

        return data;
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
     * Adds a document to an index.
     * @param index The index to add the document to.
     * @param document The document to add to the index.
     * @throws {APIError} If the response status is not 200.
     *
     * @example
     * ```ts
     * const index = await client.indexes.create('support-tickets');
     * const document = { title: 'My first support ticket', content: 'This is my first support ticket.' };
     * await client.indexes.add(index, document);
     * ```
     */
    public async add(index: Index, document: Document): Promise<void> {
        await this.doPost(this.calcURLAddIndex(index.uuid), JSON.stringify(document));
    }

    /**
     * Retrieves the most relevant documents from an index based on semantic similarity to a query.
     * @param index The index to retrieve documents from.
     * @param query The query to retrieve documents for.
     * @param k The maximum number of documents to retrieve.
     * @param filters The filters to apply to the documents in the index.
     * @returns The most relevant documents from the index
     * @throws {APIError} If the response status is not 200.
     */
    public async retrieve(
        index: Index,
        query: string,
        k: number,
        filters: Filter[] | null,
        parentSpanUUID: string | null
    ): Promise<Document[]> {
        if (parentSpanUUID === null) {
            const contextSpanUUID = getCurrentSpanId();
            if (contextSpanUUID !== undefined) {
                parentSpanUUID = contextSpanUUID;
            }
        }
        const response = await this.doPost(
            this.calcURLQueryIndex(index.uuid),
            JSON.stringify({ q: query, k: k, filters: filters, parent_span_uuid: parentSpanUUID })
        );

        const documents: Document[] = await response.json();

        return documents;
    }
}
export default Indexes;
