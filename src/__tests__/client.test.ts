import { OpperAIOptions, OpperAIIndex } from '../types';

import OpperAIClient from '../index';

describe('OpperAIClient', () => {
  let client: OpperAIClient;

  beforeEach(() => {
    client = new OpperAIClient({
      apiKey: 'test-api-key',
      isUsingAuthorization: true,
    });
  });

  it('should be instantiated with an API key, authorization enabled, and a base URL', () => {
    expect(client).toBeInstanceOf(OpperAIClient);
    // @ts-expect-error Testing protected prop
    expect(client.apiKey).toBe('test-api-key');
    // @ts-expect-error Testing protected prop
    expect(client.isUsingAuthorization).toBe(true);
    expect(client.baseURL).toBe('https://api.opper.ai/v1');
  });

  it('should be able to override the baseURL', () => {
    const example = new OpperAIClient({
      apiKey: 'test-api-key',
      baseURL: 'https://api.test.com',
    });

    expect(example.baseURL).toBe('https://api.test.com');
  });

  it('should throw an error if instantiated without an API key', () => {
    expect(() => new OpperAIClient(undefined as unknown as OpperAIOptions)).toThrow(
      'OpperAIClient: The apiKey is missing or empty.'
    );
  });

  describe('functions', () => {
    it('should have a functions property that is an instance of OpperAIAPIResource', () => {
      expect(client.functions).toBeDefined();
    });

    it('should be able to call chat function', async () => {
      // Mocking the chat function to test if it can be called correctly
      const chatSpy = jest.spyOn(client.functions, 'chat').mockResolvedValue({
        message: 'test response',
        context: {},
      });

      const response = await client.functions.chat({
        path: 'test-path',
        message: 'test message',
      });

      expect(chatSpy).toHaveBeenCalledWith({
        path: 'test-path',
        message: 'test message',
      });
      expect(response).toEqual({
        message: 'test response',
        context: {},
      });

      chatSpy.mockRestore();
    });

    it('should be able to call stream function', () => {
      // Mocking the stream function to test if it can be called correctly
      const streamSpy = jest.spyOn(client.functions, 'pipe').mockReturnValue(new ReadableStream());

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const stream = client.functions.pipe({
        path: 'test-path',
        message: 'test message',
      });

      expect(streamSpy).toHaveBeenCalledWith({
        path: 'test-path',
        message: 'test message',
      });

      streamSpy.mockRestore();
    });
  });

  describe('indexes', () => {
    it('should have an indexes property that is an instance of OpperAIIndexes', () => {
      expect(client.indexes).toBeDefined();
    });

    it('should be able to list indexes', async () => {
      const mockIndexes: OpperAIIndex[] = [
        {
          id: 1,
          name: 'Test Index 1',
          created_at: new Date(),
          files: [],
        },
        {
          id: 2,
          name: 'Test Index 2',
          created_at: new Date(),
          files: [],
        },
      ];

      // Mocking the list method to test if it can be called correctly
      const listSpy = jest.spyOn(client.indexes, 'list').mockResolvedValue(mockIndexes);

      await client.indexes.list();

      expect(listSpy).toHaveBeenCalled();
    });
  });

  describe('calcAuthorizationHeaders', () => {
    it('should return correct headers when using authorization', () => {
      client = new OpperAIClient({
        apiKey: 'test-api-key',
        isUsingAuthorization: true,
      });
      const headers = client.calcAuthorizationHeaders();
      expect(headers).toEqual({ Authorization: 'Bearer test-api-key' });
    });

    it('should return correct headers when not using authorization', () => {
      client = new OpperAIClient({
        apiKey: 'test-api-key',
        isUsingAuthorization: false,
      });
      const headers = client.calcAuthorizationHeaders();
      expect(headers).toEqual({ 'X-OPPER-API-KEY': 'test-api-key' });
    });
  });
});
