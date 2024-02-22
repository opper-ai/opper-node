import { OpperAIOptions } from './types';

import { OpperAIError } from './opperai-error';
import OpperAIFunctions from './opperai-functions';
import OpperAIIndexes from './opperai-indexes';

class OpperAIClient {
  public baseURL: string;

  private apiKey: string;
  private isUsingAuthorization: boolean;

  constructor(
    { apiKey, baseURL, isUsingAuthorization, dangerouslyAllowBrowser }: OpperAIOptions = {
      apiKey: '',
    }
  ) {
    if (apiKey === undefined || apiKey === '') {
      throw new OpperAIError('The apiKey is missing or empty.');
    }

    if (!dangerouslyAllowBrowser && this.isRunningInBrowser()) {
      throw new OpperAIError(
        "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`"
      );
    }

    this.apiKey = apiKey;
    this.baseURL = baseURL || 'https://api.opper.ai/v1';
    this.isUsingAuthorization = !!isUsingAuthorization;
  }

  functions = new OpperAIFunctions(this);
  indexes = new OpperAIIndexes(this);

  calcAuthorizationHeaders = () => {
    const isUsingAuthorization = this.isUsingAuthorization;
    const apiKey = this.apiKey;

    const key = isUsingAuthorization ? 'Authorization' : 'X-OPPER-API-KEY';
    const value = isUsingAuthorization ? `Bearer ${apiKey}` : apiKey;

    return {
      [key]: value,
    };
  };

  isRunningInBrowser = () => {
    return (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined' &&
      typeof navigator !== 'undefined'
    );
  };
}

export default OpperAIClient;
