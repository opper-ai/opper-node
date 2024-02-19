import APIResource from '../api-resource';

import OpperClient from '../index';

describe('APIResource', () => {
  let client: OpperClient;
  let apiResource: APIResource;

  beforeEach(() => {
    client = new OpperClient('test-api-key');
    apiResource = new APIResource(client);
  });

  it('should initialize with the correct base URLs', () => {
    // @ts-expect-error Testing protected prop
    expect(apiResource.baseURL).toBe('https://api.opper.ai/v1');
    // @ts-expect-error Testing protected prop
    expect(apiResource.baseURLInternal).toBe('https://api.opper.ai/v1');
  });
});
