import Functions from "../functions";
import Client from "../index";
import { OpperCall } from "../types";

// Mocking the global fetch to avoid actual API calls
// @ts-expect-error Mocking global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe("OpperAIFunctions", () => {
    let functions: Functions;
    const mockApiKey = "test-api-key";

    beforeEach(() => {
        const mockClient = new Client({
            apiKey: mockApiKey,
        });

        functions = new Functions(mockClient);
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    describe("chat", () => {
        it("should call fetch with correct parameters and resolve with message and context", async () => {
            const mockChatResponse = { message: "Hello, world!", context: {} };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockChatResponse),
            });

            const response = await functions.chat({ path: "hello", message: "Hi there!" });

            expect(global.fetch).toHaveBeenCalledWith("https://api.opper.ai/v1/chat/hello", {
                method: "POST",
                headers: {
                    "X-OPPER-API-KEY": mockApiKey,
                    "User-Agent": "opper-node/0.0.0",
                    "Content-Type": "application/json",
                },
                body: expect.any(String),
            });
            expect(response).toEqual(mockChatResponse);
        });

        it("should throw an error if fetch response is not ok", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            await expect(functions.chat({ path: "hello", message: "Hi there!" })).rejects.toThrow(
                "404 Failed to send request to https://api.opper.ai/v1/chat/hello: Not Found"
            );
        });
    });

    describe("call", () => {
        it("should call fetch with correct parameters and resolve with function result", async () => {
            const mockCallResponse = { result: "Function executed successfully" };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockCallResponse),
            });

            const functionCall: OpperCall = {
                name: "testFunction",
                input: { key: "value" },
                instructions: "Test instructions",
                model: "gpt-3.5-turbo",
            };

            const response = await functions.call(functionCall);

            expect(global.fetch).toHaveBeenCalledWith("https://api.opper.ai/v1/call", {
                method: "POST",
                headers: {
                    "X-OPPER-API-KEY": mockApiKey,
                    "User-Agent": "opper-node/0.0.0",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...functionCall,
                    input_type: undefined,
                    output_type: undefined,
                }),
            });
            expect(response).toEqual(mockCallResponse);
        });

        it("should throw an error if fetch response is not ok", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: "Bad Request",
            });

            const functionCall: OpperCall = {
                name: "testFunction",
                input: "Test input",
            };

            await expect(functions.call(functionCall)).rejects.toThrow(
                "OpperAIClient: 400 Failed to send request to https://api.opper.ai/v1/call: Bad Request"
            );
        });

        it("should include input_schema and output_schema if provided", async () => {
            const mockCallResponse = { result: "Function executed successfully" };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockCallResponse),
            });

            const functionCall: OpperCall = {
                name: "testFunction",
                input: { key: "value" },
                input_schema: { type: "object", properties: { key: { type: "string" } } },
                output_schema: { type: "string" },
            };

            await functions.call(functionCall);

            expect(global.fetch).toHaveBeenCalledWith("https://api.opper.ai/v1/call", {
                method: "POST",
                headers: expect.any(Object),
                body: JSON.stringify({
                    ...functionCall,
                    input_type: functionCall.input_schema,
                    output_type: functionCall.output_schema,
                }),
            });
        });

        it("should handle 10 or less examples", async () => {
            const mockCallResponse = { result: "Function executed successfully" };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockCallResponse),
            });

            const functionCall: OpperCall = {
                name: "testFunction",
                input: "Test input",
                // @ts-expect-error - This is a test
                examples: new Array(10).fill({ input: "test", output: "test" }),
            };

            await functions.call(functionCall);

            expect(global.fetch).toHaveBeenCalledWith("https://api.opper.ai/v1/call", {
                method: "POST",
                headers: expect.any(Object),
                body: JSON.stringify({
                    ...functionCall,
                }),
            });
        });

        it("should throw an error if more than 10 examples are provided", async () => {
            const functionCall: OpperCall = {
                name: "testFunction",
                input: "Test input",
                // @ts-expect-error - This is a test
                examples: new Array(11).fill({ input: "test", output: "test" }),
            };

            await expect(functions.call(functionCall)).rejects.toThrow(
                "Maximum number of examples is 10"
            );
        });
    });
});
