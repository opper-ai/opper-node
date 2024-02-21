import { OpperAIOptions } from './types';

import { OpperAIError } from './opperai-error';
import OpperAIFunctions from './opperai-functions';
import OpperAIIndexes from './opperai-indexes';

class OpperAIClient {
  /**
   * OpperAI [API key](https://docs.opper.ai/api-keys)
   */
  private apiKey: string;
  private isUsingAuthorization: boolean;

  constructor({ apiKey, isUsingAuthorization }: OpperAIOptions = { apiKey: '' }) {
    if (apiKey === undefined || apiKey === '') {
      throw new OpperAIError('The apiKey is missing or empty.');
    }

    this.apiKey = apiKey;
    this.isUsingAuthorization = !!isUsingAuthorization;
  }

  functions = new OpperAIFunctions(this);
  indexes = new OpperAIIndexes(this);

  getApiKey = () => {
    return this.apiKey;
  };
}

export default OpperAIClient;
