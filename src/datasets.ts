import APIResource from "./api-resource";
import { APIClientContext, DatasetEntry } from "./types";

export class Dataset extends APIResource {
    public uuid: string;

    protected calcURLDataset(): string {
        return `${this.baseURL}/v1/datasets/${this.uuid}`;
    }

    constructor(uuid: string, ctx: APIClientContext) {
        super(ctx);
        this.uuid = uuid;
    }

    /**
     * Adds an entry to a dataset.
     * @param entry The entry to add to the dataset.
     * @returns A promise that resolves to the UUID of the created entry.
     * @throws {APIError} If the response status is not 200.
     */
    public async add(entry: Omit<DatasetEntry, "uuid">): Promise<DatasetEntry> {
        const url = this.calcURLDataset();
        const response = await this.doPost(url, entry);
        const data: DatasetEntry = await response.json();

        return data;
    }

    /**
     * Retrieves entries from a dataset.
     * @param offset The number of entries to skip.
     * @param limit The maximum number of entries to retrieve.
     * @returns A promise that resolves to an array of DatasetEntry objects.
     * @throws {APIError} If the response status is not 200.
     */
    public async getEntries(offset: number = 0, limit: number = 100): Promise<DatasetEntry[]> {
        const url = `${this.calcURLDataset()}/entries?offset=${offset}&limit=${limit}`;
        const response = await this.doGet(url);
        const entries: DatasetEntry[] = await response.json();

        return entries;
    }

    /**
     * Retrieves a specific entry from a dataset.
     * @param entryUuid The UUID of the entry to retrieve.
     * @returns A promise that resolves to a DatasetEntry object.
     * @throws {APIError} If the response status is not 200.
     */
    public async getEntry(entryUuid: string): Promise<DatasetEntry> {
        const url = `${this.calcURLDataset()}/entries/${entryUuid}`;
        const response = await this.doGet(url);
        const entry: DatasetEntry = await response.json();
        return entry;
    }

    /**
     * Updates a specific entry in a dataset.
     * @param entryUuid The UUID of the entry to update.
     * @param updatedEntry The updated entry data.
     * @returns A promise that resolves to the updated DatasetEntry object.
     * @throws {APIError} If the response status is not 200.
     */
    public async updateEntry(
        entryUuid: string,
        updatedEntry: Partial<DatasetEntry>
    ): Promise<DatasetEntry> {
        const url = `${this.calcURLDataset()}/entries/${entryUuid}`;
        const response = await this.doPut(url, updatedEntry);
        const entry: DatasetEntry = await response.json();

        return entry;
    }

    /**
     * Deletes a specific entry from a dataset.
     * @param entryUuid The UUID of the entry to delete.
     * @returns A promise that resolves to a boolean indicating success.
     * @throws {APIError} If the response status is not 200.
     */
    public async deleteEntry(entryUuid: string): Promise<boolean> {
        const url = `${this.calcURLDataset()}/entries/${entryUuid}`;
        const response = await this.doDelete(url);
        const result: boolean = await response.json();
        return result;
    }
}
