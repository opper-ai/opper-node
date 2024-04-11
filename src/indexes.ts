import { Document, Filter, Index } from './types';

import APIResource from './api-resource';

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

  public async get(name: string): Promise<Index | null> {
    const list = await this.list();

    const index = list.find((index) => index.name === name);

    if (!index) {
      return null;
    }
    return index;
  }

  public async create(name: string): Promise<Index> {
    const response = await this.doPost(this.calcURLIndexes(), JSON.stringify({ name: name }));

    const data = await response.json();

    return data;
  }

  public async delete(id: number): Promise<void> {
    await this.doDelete(this.calcURLIndex(id));
  }

  public async add(index: Index, document: Document): Promise<void> {
    await this.doPost(this.calcURLAddIndex(index.id), JSON.stringify(document));
  }

  public async retrieve(
    index: Index,
    query: string,
    k: number,
    filters: Filter[]
  ): Promise<Document[]> {
    const response = await this.doPost(
      this.calcURLQueryIndex(index.id),
      JSON.stringify({ q: query, k: k, filters: filters })
    );

    const documents: Document[] = await response.json();

    return documents;
  }
}
export default Indexes;
