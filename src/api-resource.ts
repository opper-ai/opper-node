import type { Client } from './index';

class APIResource {
  protected _client: Client;

  protected baseURL: string;
  protected baseURLInternal: string;

  constructor(client: Client) {
    this._client = client;

    this.baseURL = 'https://api.opper.ai/v1';
    this.baseURLInternal = 'https://api.opper.ai/v1';
  }
}

export default APIResource;
