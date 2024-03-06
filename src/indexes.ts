import { Document, Index } from './types';

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

    const response = await this.get(url);

    const indexes: Index[] = await response.json();

    return indexes;
  }

  public async getID(name: string): Promise<number | null> {
    const list = await this.list();

    const index = list.find((index) => index.name === name);

    if (!index) {
      return null;
    }
    return index.id;
  }

  public async create(name: string): Promise<Index> {
    const response = await this.post(this.calcURLIndexes(), JSON.stringify({ "name": name }));

    const data = await response.json();

    return data;
  }

  public async delete(id: number): Promise<void> {
    await this.post(this.calcURLIndex(id), JSON.stringify({}));
  }

  public async add(index: Index, document: Document): Promise<void> {
    await this.post(this.calcURLIndex(index.id), JSON.stringify(document));
  }

}

export default Indexes;
