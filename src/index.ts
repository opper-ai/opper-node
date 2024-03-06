import { Options } from './types';

import { OpperError } from './errors';
import Functions from './functions';
import Indexes from './indexes';

class Client {
  public baseURL: string;

  private apiKey: string;
  private isUsingAuthorization: boolean;

  constructor(
    { apiKey, baseURL, isUsingAuthorization, dangerouslyAllowBrowser }: Options = {
      apiKey: '',
    }
  ) {
    if (apiKey === undefined || apiKey === '') {
      throw new OpperError('The apiKey is missing or empty.');
    }

    if (!dangerouslyAllowBrowser && this.isRunningInBrowser()) {
      throw new OpperError(
        "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`"
      );
    }

    this.apiKey = apiKey;
    this.baseURL = baseURL || 'https://api.opper.ai';
    this.isUsingAuthorization = !!isUsingAuthorization;
  }

  functions = new Functions(this);
  indexes = new Indexes(this);

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

export default Client;
