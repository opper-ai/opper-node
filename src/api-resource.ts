import type OpperClient from './index';

class APIResource {
  protected _client: OpperClient;

  protected baseURL: string;
  protected baseURLInternal: string;

  constructor(client: OpperClient) {
    this._client = client;

    this.baseURL = 'https://api.opper.ai/v1';
    this.baseURLInternal = 'https://api.opper.ai/v1';
  }
}

export default APIResource;
