import { OpperAIIndex } from './types';

import OpperAIAPIResource from './opperai-api-resource';

class OpperAIIndexes extends OpperAIAPIResource {
  /**
   * This method retrieves a list of indexes from the OpperAI API.
   * It sends a GET request to the indexes endpoint and returns the response as an array of OpperAIIndex objects.
   * @returns A promise that resolves to an array of OpperAIIndex objects.
   * @throws {OpperAPIError} If the response status is not 200.
   */
  public async list() {
    const url = `${this.baseURL}/indexes`;

    const response = await this.get(url);

    const indexes: OpperAIIndex[] = await response.json();

    return indexes;
  }
}

export default OpperAIIndexes;
