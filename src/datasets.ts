import APIResource from "./api-resource";
import { OpperError } from "./errors";
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
     * @returns A promise that resolves to the created DatasetEntry.
     * @throws {OpperError} If the response status is not 200.
     */
    public async add(entry: Omit<DatasetEntry, "uuid">): Promise<DatasetEntry> {
        const url = this.calcURLDataset();

        const response = await this.doPost(url, entry);

        if (response.ok) {
            const data: DatasetEntry = await response.json();

            return data;
        }

        throw new OpperError(`Failed to add entry to dataset: ${response.statusText}`);
    }

    /**
     * Retrieves entries from a dataset.
     * @param offset The number of entries to skip.
     * @param limit The maximum number of entries to retrieve.
     * @returns A promise that resolves to an array of DatasetEntry objects.
     * @throws {OpperError} If the response status is not 200.
     */
    public async getEntries(offset: number = 0, limit: number = 100): Promise<DatasetEntry[]> {
        const url = `${this.calcURLDataset()}/entries?offset=${offset}&limit=${limit}`;

        const response = await this.doGet(url);

        if (response.ok) {
            const entries: DatasetEntry[] = await response.json();

            return entries;
        }

        throw new OpperError(`Failed to get entries from dataset: ${response.statusText}`);
    }

    /**
     * Retrieves a specific entry from a dataset.
     * @param entryUuid The UUID of the entry to retrieve.
     * @returns A promise that resolves to a DatasetEntry object.
     * @throws {OpperError} If the response status is not 200.
     */
    public async getEntry(entryUuid: string): Promise<DatasetEntry> {
        const url = `${this.calcURLDataset()}/entries/${entryUuid}`;
        const response = await this.doGet(url);

        if (response.ok) {
            const entry: DatasetEntry = await response.json();

            return entry;
        }

        throw new OpperError(`Failed to get entry from dataset: ${response.statusText}`);
    }

    /**
     * Updates a specific entry in a dataset.
     * @param entryUuid The UUID of the entry to update.
     * @param updatedEntry The updated entry data.
     * @returns A promise that resolves to the updated DatasetEntry object.
     * @throws {OpperError} If the response status is not 200.
     */
    public async updateEntry(
        entryUuid: string,
        updatedEntry: Partial<DatasetEntry>
    ): Promise<DatasetEntry> {
        const url = `${this.calcURLDataset()}/entries/${entryUuid}`;
        const response = await this.doPut(url, updatedEntry);

        if (response.ok) {
            const entry: DatasetEntry = await response.json();

            return entry;
        }

        throw new OpperError(`Failed to update entry in dataset: ${response.statusText}`);
    }

    /**
     * Deletes a specific entry from a dataset.
     * @param entryUuid The UUID of the entry to delete.
     * @returns A promise that resolves to a boolean indicating success.
     * @throws {OpperError} If the response status is not 200.
     */
    public async deleteEntry(entryUuid: string): Promise<boolean> {
        const url = `${this.calcURLDataset()}/entries/${entryUuid}`;
        const response = await this.doDelete(url);

        if (response.ok) {
            const result: boolean = await response.json();

            return result;
        }

        throw new OpperError(`Failed to delete entry from dataset: ${response.statusText}`);
    }
}
