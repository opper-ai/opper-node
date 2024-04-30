import { Index } from "../types";

import Client from "../index";
import Indexes from "../indexes";

// Mocking the global fetch to avoid actual API calls
// @ts-expect-error Mocking global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe("OpperAIIndexes", () => {
    let opperAIIndexes: Indexes;
    const mockApiKey = "test-api-key";

    const mockIndexes: Index[] = [
        {
            id: 1,
            name: "Test Index 1",
            created_at: new Date(),
            files: [],
        },
        {
            id: 2,
            name: "Test Index 2",
            created_at: new Date(),
            files: [],
        },
    ];

    beforeEach(() => {
        const mockClient = new Client({
            apiKey: mockApiKey,
        });

        opperAIIndexes = new Indexes(mockClient);
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    describe("list", () => {
        it("should retrieve a list of indexes", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockIndexes),
            });

            const indexes = await opperAIIndexes.list();

            expect(indexes).toEqual(mockIndexes);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith("https://api.opper.ai/v1/indexes", {
                method: "GET",
                headers: {
                    "X-OPPER-API-KEY": "test-api-key",
                    "Content-Type": "application/json",
                },
            });
        });

        it("should throw an error if fetch response is not ok", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            await expect(opperAIIndexes.list()).rejects.toThrow(
                "404 Failed to fetch request https://api.opper.ai/v1/indexes: Not Found"
            );
        });
    });
});
