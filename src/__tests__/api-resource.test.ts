import APIResource from '../api-resource';

import { Client } from '../index';

describe('APIResource', () => {
  let client: Client;
  let apiResource: APIResource;

  beforeEach(() => {
    client = new Client('test-api-key');
    apiResource = new APIResource(client);
  });

  it('should initialize with the correct base URLs', () => {
    // @ts-expect-error Testing protected prop
    expect(apiResource.baseURL).toBe('https://api.opper.ai/v1');
    // @ts-expect-error Testing protected prop
    expect(apiResource.baseURLInternal).toBe('https://api.opper.ai/v1');
  });
});
