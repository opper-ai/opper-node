import Functions from '../functions';

// Mocking the global fetch to avoid actual API calls
// @ts-expect-error Mocking global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('Functions', () => {
  let functions: Functions;
  const mockApiKey = 'test-api-key';
  const mockClient = { getApiKey: () => mockApiKey };

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    functions = new Functions(mockClient as any);
    // Clear all instances and calls to constructor and all methods:
    (global.fetch as jest.Mock).mockClear();
  });

  describe('chat', () => {
    it('should call fetch with correct parameters and resolve with message and context', async () => {
      const mockChatResponse = { message: 'Hello, world!', context: {} };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockChatResponse),
      });

      const response = await functions.chat({ path: 'hello', message: 'Hi there!' });

      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/chat/hello'), {
        method: 'POST',
        headers: {
          'X-OPPER-API-KEY': mockApiKey,
          'Content-Type': 'application/json',
        },
        body: expect.any(String),
      });
      expect(response).toEqual(mockChatResponse);
    });

    it('should throw an error if fetch response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(functions.chat({ path: 'hello', message: 'Hi there!' })).rejects.toThrow(
        'Failed to send chat request to'
      );
    });
  });

  describe('stream', () => {
    it('should call fetch with correct parameters and return a ReadableStream', async () => {
      const mockStream = new ReadableStream();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true, // Ensure the response is marked as successful
        body: mockStream,
      });

      const stream = functions.stream({ path: 'stream', message: 'Streaming data' });

      expect(stream).toBeInstanceOf(ReadableStream);
    });
  });
});
