/* eslint-disable @typescript-eslint/no-explicit-any */
import APIResource from '../api-resource';

import OpperAIClient from '../index';

describe('APIResource', () => {
  let client: OpperAIClient;
  let apiResource: APIResource;

  beforeEach(() => {
    client = new OpperAIClient('test-api-key');
    apiResource = new APIResource(client);
  });

  it('should initialize with the correct base URLs', () => {
    // @ts-expect-error Testing protected prop
    expect(apiResource.baseURL).toBe('https://api.opper.ai/v1');
    // @ts-expect-error Testing protected prop
    expect(apiResource.baseURLInternal).toBe('https://api.opper.ai/v1');
  });

  describe('iteratorToStream', () => {
    it('should convert an async generator to a readable stream', async () => {
      // Mock async generator
      async function* asyncGenerator() {
        yield new TextEncoder().encode('Test');
        yield new TextEncoder().encode('Data');
      }

      const iterator = asyncGenerator();
      // @ts-expect-error Testing protected prop
      const stream = apiResource.iteratorToStream(iterator);

      // Read from stream
      const reader = stream.getReader();
      let result = '';
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        result += new TextDecoder('utf-8').decode(value);
      }

      expect(result).toBe('TestData');
    });

    it('should close the stream when the generator is done', async () => {
      // Mock async generator that immediately finishes
      async function* asyncGenerator() {}

      const iterator = asyncGenerator();
      // @ts-expect-error Testing protected prop
      const stream = apiResource.iteratorToStream(iterator);

      // Read from stream
      const reader = stream.getReader();
      const { done } = await reader.read();

      expect(done).toBe(true);
    });

    it('should handle errors thrown by the async generator', async () => {
      // Mock async generator that throws an error
      // eslint-disable-next-line require-yield
      async function* asyncGenerator() {
        throw new Error('Test Error');
      }

      const iterator = asyncGenerator();
      // @ts-expect-error Testing protected prop
      const stream = apiResource.iteratorToStream(iterator);

      // Read from stream and expect an error
      const reader = stream.getReader();
      await expect(reader.read()).rejects.toThrow('Test Error');
    });
  });
});
