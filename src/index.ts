import { OpperError } from './error';
import OpperAIFunctions from './opperai-functions';
import OpperAIIndexes from './opperai-indexes';

class OpperAIClient {
  /**
   * OpperAI [API key](https://docs.opper.ai/api-keys)
   */
  private apiKey: string;

  constructor(apiKey: string) {
    if (apiKey === undefined) {
      throw new OpperError('The apiKey is missing or empty.');
    }

    this.apiKey = apiKey;
  }

  functions = new OpperAIFunctions(this);
  indexes = new OpperAIIndexes(this);

  getApiKey = () => {
    return this.apiKey;
  };
}

export default OpperAIClient;
