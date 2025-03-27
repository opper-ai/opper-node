import { OpperIndex, Options } from "../types";

import Client from "../index";

describe("OpperAIClient", () => {
    let client: Client;

    beforeEach(() => {
        client = new Client({
            apiKey: "test-api-key",
            isUsingAuthorization: true,
        });
    });

    it("should be instantiated with an API key, authorization enabled, and a base URL", () => {
        expect(client).toBeInstanceOf(Client);
        expect(client.apiKey).toBe("test-api-key");
        expect(client.isUsingAuthorization).toBe(true);
        expect(client.baseURL).toBe("https://api.opper.ai");
    });

    it("should be able to override the baseURL", () => {
        const example = new Client({
            apiKey: "test-api-key",
            baseURL: "https://api.test.com",
        });

        expect(example.baseURL).toBe("https://api.test.com");
    });

    it("should throw an error if instantiated without an API key", () => {
        expect(() => new Client(undefined as unknown as Options)).toThrow(
            "OpperAIClient: The apiKey is missing or empty."
        );
    });

    describe("functions", () => {
        it("should have a functions property that is an instance of OpperAIAPIResource", () => {
            expect(client.functions).toBeDefined();
        });

        it("should be able to call chat function", async () => {
            // Mocking the chat function to test if it can be called correctly
            const chatSpy = jest.spyOn(client.functions, "chat").mockResolvedValue({
                message: "test response",
                context: {},
                span_id: "test-span-id",
            });

            const response = await client.functions.chat({
                path: "test-path",
                message: "test message",
            });

            expect(chatSpy).toHaveBeenCalledWith({
                path: "test-path",
                message: "test message",
            });
            expect(response).toEqual({
                message: "test response",
                context: {},
                span_id: "test-span-id",
            });

            chatSpy.mockRestore();
        });

        it("should properly handle tags in function calls", async () => {
            const callSpy = jest.spyOn(client.functions, "call").mockResolvedValue({
                message: "test response",
                context: {},
                span_id: "test-span-id",
                json_payload: { sum: 30 },
            });

            const response = await client.functions.call({
                name: "test-function",
                input: {
                    x: 10,
                    y: 20,
                },
                tags: {
                    environment: "test",
                    feature: "arithmetic",
                    version: "1.0.0",
                },
            });

            expect(callSpy).toHaveBeenCalledWith({
                name: "test-function",
                input: {
                    x: 10,
                    y: 20,
                },
                tags: {
                    environment: "test",
                    feature: "arithmetic",
                    version: "1.0.0",
                },
            });

            expect(response.json_payload).toEqual({ sum: 30 });
            callSpy.mockRestore();
        });
    });

    describe("indexes", () => {
        it("should have an indexes property that is an instance of OpperAIIndexes", () => {
            expect(client.indexes).toBeDefined();
        });

        it("should be able to list indexes", async () => {
            const mockIndexes: OpperIndex[] = [
                {
                    uuid: "1",
                    name: "Test Index 1",
                    created_at: new Date(),
                    files: [],
                },
                {
                    uuid: "2",
                    name: "Test Index 2",
                    created_at: new Date(),
                    files: [],
                },
            ];

            // Mocking the list method to test if it can be called correctly
            const listSpy = jest.spyOn(client.indexes, "list").mockResolvedValue(mockIndexes);

            await client.indexes.list();

            expect(listSpy).toHaveBeenCalled();
        });
    });
});
