import { OpperAPIError } from '../error';
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

  describe('pipe', () => {
    it('should call fetch with correct parameters and return a ReadableStream', async () => {
      const mockStream = new ReadableStream();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true, // Ensure the response is marked as successful
        body: mockStream,
      });

      const stream = functions.pipe({ path: 'stream', message: 'Streaming data' });

      expect(stream).toBeInstanceOf(ReadableStream);
    });
  });

  describe('stream', () => {
    it('should call fetch with correct parameters and process the stream correctly', async () => {
      const mockStreamResponse = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('data: {"message":"Hello, stream!"}\n\n'));
          controller.close();
        },
      });

      const mockCallbacks = {
        controller: new AbortController(),
        onMessage: jest.fn(),
        onComplete: jest.fn(),
        onError: jest.fn(),
        onCancel: jest.fn(),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        body: mockStreamResponse,
      });

      await functions.stream({
        path: 'stream',
        message: 'Streaming data',
        callbacks: mockCallbacks,
      });

      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/chat/stream'), {
        method: 'POST',
        headers: {
          'X-OPPER-API-KEY': mockApiKey,
          'Content-Type': 'application/json',
        },
        body: expect.any(String),
        signal: mockCallbacks.controller.signal,
      });
      expect(mockCallbacks.onMessage).toHaveBeenCalledWith({ message: 'Hello, stream!' });
      expect(mockCallbacks.onComplete).toHaveBeenCalled();
      expect(mockCallbacks.onError).not.toHaveBeenCalled();
      expect(mockCallbacks.onCancel).not.toHaveBeenCalled();
    });

    it('should call onError callback if fetch response is not ok', async () => {
      const mockCallbacks = {
        controller: new AbortController(),
        onMessage: jest.fn(),
        onComplete: jest.fn(),
        onError: jest.fn(),
        onCancel: jest.fn(),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await functions.stream({
        path: 'stream',
        message: 'Streaming data',
        callbacks: mockCallbacks,
      });

      expect(mockCallbacks.onError).toHaveBeenCalledWith(expect.any(OpperAPIError));
      expect(mockCallbacks.onMessage).not.toHaveBeenCalled();
      expect(mockCallbacks.onComplete).not.toHaveBeenCalled();
      expect(mockCallbacks.onCancel).not.toHaveBeenCalled();
    });

    it('should call onCancel callback if the fetch request is aborted', async () => {
      const mockCallbacks = {
        controller: new AbortController(),
        onMessage: jest.fn(),
        onComplete: jest.fn(),
        onError: jest.fn(),
        onCancel: jest.fn(),
      };

      const mockError = new Error('AbortError');
      mockError.name = 'AbortError';

      (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

      await functions.stream({
        path: 'stream',
        message: 'Streaming data',
        callbacks: mockCallbacks,
      });

      expect(mockCallbacks.onCancel).toHaveBeenCalled();
      expect(mockCallbacks.onMessage).not.toHaveBeenCalled();
      expect(mockCallbacks.onComplete).not.toHaveBeenCalled();
      expect(mockCallbacks.onError).not.toHaveBeenCalled();
    });
  });
});
