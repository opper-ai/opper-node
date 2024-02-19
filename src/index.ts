import { OpperError } from './error';
import Functions from './functions';

export class Client {
  /**
   * Opper [API key](https://docs.opper.ai/api-keys)
   */
  private apiKey: string;

  constructor(apiKey: string) {
    if (apiKey === undefined) {
      throw new OpperError('The apiKey is missing or empty.');
    }

    this.apiKey = apiKey;
  }

  functions = new Functions(this);

  getApiKey = () => {
    return this.apiKey;
  };
}

export default Client;
