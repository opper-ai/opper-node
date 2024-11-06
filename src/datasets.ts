import APIResource from "./api-resource";
import { APIClientContext, DatasetEntry } from "./types";

export class Dataset extends APIResource {
    public uuid: string;

    protected calcURLDataset(): string {
        return `${this.baseURL}/v1/datasets/${this.uuid}`;
    }

    protected calcURLDatasetEntry(uuid: string): string {
        return `${this.calcURLDataset()}/entries/${uuid}`;
    }

    protected calcURLDatasetEntries(offset: number = 0, limit: number = 100): string {
        return `${this.calcURLDataset()}/entries?offset=${offset}&limit=${limit}`;
    }

    constructor(uuid: string, ctx: APIClientContext) {
        super(ctx);
        this.uuid = uuid;
    }

    /**
     * Adds an entry to a dataset.
     * @param entry The entry to add to the dataset.
     * @returns A promise that resolves to the created DatasetEntry.
     * @throws {OpperError} If the response status is not 200.
     */
    public async add(entry: Omit<DatasetEntry, "uuid">): Promise<DatasetEntry> {
        const url = this.calcURLDataset();

        const data = await this.doPost<DatasetEntry>(url, entry);

        return data;
    }

    /**
     * Retrieves entries from a dataset.
     * @param offset The number of entries to skip.
     * @param limit The maximum number of entries to retrieve.
     * @returns A promise that resolves to an array of DatasetEntry objects.
     * @throws {OpperError} If the response status is not 200.
     */
    public async getEntries(offset: number = 0, limit: number = 100): Promise<DatasetEntry[]> {
        const url = this.calcURLDatasetEntries(offset, limit);
        const entries = await this.doGet<DatasetEntry[]>(url);

        return entries;
    }

    /**
     * Retrieves a specific entry from a dataset.
     * @param uuid The UUID of the entry to retrieve.
     * @returns A promise that resolves to a DatasetEntry object.
     * @throws {OpperError} If the response status is not 200.
     */
    public async getEntry(uuid: string): Promise<DatasetEntry> {
        const url = this.calcURLDatasetEntry(uuid);
        const entry = await this.doGet<DatasetEntry>(url);

        return entry;
    }

    /**
     * Updates a specific entry in a dataset.
     * @param uuid The UUID of the entry to update.
     * @param updatedEntry The updated entry data.
     * @returns A promise that resolves to the updated DatasetEntry object.
     * @throws {OpperError} If the response status is not 200.
     */
    public async updateEntry(
        uuid: string,
        updatedEntry: Partial<DatasetEntry>
    ): Promise<DatasetEntry> {
        const url = this.calcURLDatasetEntry(uuid);
        const entry = await this.doPut<DatasetEntry>(url, updatedEntry);

        return entry;
    }

    /**
     * Deletes a specific entry from a dataset.
     * @param uuid The UUID of the entry to delete.
     * @returns A promise that resolves to a boolean indicating success.
     * @throws {OpperError} If the response status is not 200.
     */
    public async deleteEntry(uuid: string): Promise<boolean> {
        const url = this.calcURLDatasetEntry(uuid);
        const data = await this.doDelete<boolean>(url);

        return data;
    }
}
