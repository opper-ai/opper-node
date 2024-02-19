import OpperClient from '../index';

describe('OpperClient', () => {
  let client: OpperClient;

  beforeEach(() => {
    client = new OpperClient('test-api-key');
  });

  it('should be instantiated with an API key', () => {
    expect(client).toBeInstanceOf(OpperClient);
    expect(client.getApiKey()).toBe('test-api-key');
  });

  it('should throw an error if instantiated without an API key', () => {
    expect(() => new OpperClient(undefined as unknown as string)).toThrow(
      'The apiKey is missing or empty.'
    );
  });

  describe('functions', () => {
    it('should have a functions property that is an instance of Functions', () => {
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
      const streamSpy = jest
        .spyOn(client.functions, 'stream')
        .mockReturnValue(new ReadableStream());

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const stream = client.functions.stream({
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
});
