import APIResource from "./api-resource";
import { DatasetEntry } from "./types";

class Datasets extends APIResource {
    /**
     * Adds an entry to a dataset.
     * @param datasetUuid The UUID of the dataset to add the entry to.
     * @param entry The entry to add to the dataset.
     * @returns A promise that resolves to the UUID of the created entry.
     * @throws {APIError} If the response status is not 200.
     */
    public async add(datasetUuid: string, entry: DatasetEntry): Promise<string> {
        const url = this.calcURLDatasets(datasetUuid);
        const response = await this.doPost(url, JSON.stringify(entry));
        const data: string = await response.json();
        return data;
    }

    /**
     * Retrieves entries from a dataset.
     * @param datasetUuid The UUID of the dataset to retrieve entries from.
     * @param offset The number of entries to skip.
     * @param limit The maximum number of entries to retrieve.
     * @returns A promise that resolves to an array of DatasetEntry objects.
     * @throws {APIError} If the response status is not 200.
     */
    public async getEntries(datasetUuid: string, offset: number = 0, limit: number = 100): Promise<DatasetEntry[]> {
        const url = `${this.calcURLDatasets(datasetUuid)}/entries?offset=${offset}&limit=${limit}`;
        const response = await this.doGet(url);
        const entries: DatasetEntry[] = await response.json();
        return entries;
    }

    /**
     * Retrieves a specific entry from a dataset.
     * @param datasetUuid The UUID of the dataset containing the entry.
     * @param entryUuid The UUID of the entry to retrieve.
     * @returns A promise that resolves to a DatasetEntry object.
     * @throws {APIError} If the response status is not 200.
     */
    public async getEntry(datasetUuid: string, entryUuid: string): Promise<DatasetEntry> {
        const url = `${this.calcURLDatasets(datasetUuid)}/entries/${entryUuid}`;
        const response = await this.doGet(url);
        const entry: DatasetEntry = await response.json();
        return entry;
    }

    /**
     * Updates a specific entry in a dataset.
     * @param datasetUuid The UUID of the dataset containing the entry.
     * @param entryUuid The UUID of the entry to update.
     * @param updatedEntry The updated entry data.
     * @returns A promise that resolves to the updated DatasetEntry object.
     * @throws {APIError} If the response status is not 200.
     */
    public async updateEntry(datasetUuid: string, entryUuid: string, updatedEntry: Partial<DatasetEntry>): Promise<DatasetEntry> {
        const url = `${this.calcURLDatasets(datasetUuid)}/entries/${entryUuid}`;
        const response = await this.doPut(url, JSON.stringify(updatedEntry));
        const entry: DatasetEntry = await response.json();
        return entry;
    }

    /**
     * Deletes a specific entry from a dataset.
     * @param datasetUuid The UUID of the dataset containing the entry.
     * @param entryUuid The UUID of the entry to delete.
     * @returns A promise that resolves to a boolean indicating success.
     * @throws {APIError} If the response status is not 200.
     */
    public async deleteEntry(datasetUuid: string, entryUuid: string): Promise<boolean> {
        const url = `${this.calcURLDatasets(datasetUuid)}/entries/${entryUuid}`;
        const response = await this.doDelete(url);
        const result: boolean = await response.json();
        return result;
    }


}

export default Datasets;
