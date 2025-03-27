import { OpperIndex } from "../types";

import Client from "../index";
import Indexes, { Index } from "../indexes";

// Mocking the global fetch to avoid actual API calls
// @ts-expect-error Mocking global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);
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

describe("OpperAIIndexes", () => {
    let opperAIIndexes: Indexes;

    beforeEach(() => {
        const mockClient = new Client({
            apiKey: "test-api-key",
        });

        opperAIIndexes = new Indexes(mockClient);
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    describe("calcURLIndexes", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = opperAIIndexes.calcURLIndexes();
            expect(url).toBe("https://api.opper.ai/v1/indexes");
        });
    });

    describe("calcURLIndex", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = opperAIIndexes.calcURLIndexByUUID("test-uuid");
            expect(url).toBe("https://api.opper.ai/v1/indexes/test-uuid");
        });
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
                    "User-Agent": "opper-node/0.0.0",
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

    describe("get", () => {
        it("should retrieve an index by name", async () => {
            const mockIndex = mockIndexes[0];
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockIndex),
            });

            const index = await opperAIIndexes.get("Test Index 1");

            expect(index).toBeInstanceOf(Index);
            expect(index?.uuid).toBe(mockIndex.uuid);
            expect(index?._index).toEqual(mockIndex);
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.opper.ai/v1/indexes/by-name/Test%20Index%201",
                {
                    method: "GET",
                    headers: {
                        "X-OPPER-API-KEY": "test-api-key",
                        "User-Agent": "opper-node/0.0.0",
                        "Content-Type": "application/json",
                    },
                }
            );
        });

        it("should return null when index is not found", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            const index = await opperAIIndexes.get("NonExistentIndex");

            expect(index).toBeNull();
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.opper.ai/v1/indexes/by-name/NonExistentIndex",
                {
                    method: "GET",
                    headers: {
                        "X-OPPER-API-KEY": "test-api-key",
                        "User-Agent": "opper-node/0.0.0",
                        "Content-Type": "application/json",
                    },
                }
            );
        });

        it("should throw an error for non-404 errors", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            });

            await expect(opperAIIndexes.get("Test Index 1")).rejects.toThrow(
                "500 Failed to fetch request https://api.opper.ai/v1/indexes/by-name/Test%20Index%201: Internal Server Error"
            );
        });
    });

    describe("deleteByName", () => {
        it("should delete an index by name", async () => {
            const mockIndex = mockIndexes[0];
            // Mock the get request
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockIndex),
            });
            // Mock the delete request
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(true),
            });

            const result = await opperAIIndexes.deleteByName("Test Index 1");

            expect(result).toBe(true);
            expect(fetch).toHaveBeenCalledTimes(2);
            // Verify get request
            expect(fetch).toHaveBeenNthCalledWith(
                1,
                "https://api.opper.ai/v1/indexes/by-name/Test%20Index%201",
                {
                    method: "GET",
                    headers: {
                        "X-OPPER-API-KEY": "test-api-key",
                        "User-Agent": "opper-node/0.0.0",
                        "Content-Type": "application/json",
                    },
                }
            );
            // Verify delete request
            expect(fetch).toHaveBeenNthCalledWith(2, "https://api.opper.ai/v1/indexes/1", {
                method: "DELETE",
                headers: {
                    "X-OPPER-API-KEY": "test-api-key",
                    "User-Agent": "opper-node/0.0.0",
                    "Content-Type": "application/json",
                },
            });
        });

        it("should return false when index is not found", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            const result = await opperAIIndexes.deleteByName("NonExistentIndex");

            expect(result).toBe(false);
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });
});

describe("OpperAIIndex", () => {
    let index: Index;

    beforeEach(() => {
        index = new Index(mockIndexes[0], {
            baseURL: "https://api.opper.ai",
            apiKey: "test-api-key",
            isUsingAuthorization: true,
        });
    });

    describe("calcResourceURL", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = index.calcResourceURL("/index");
            expect(url).toBe("https://api.opper.ai/v1/indexes/1/index");
        });
    });

    describe("calcResourceURL", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = index.calcResourceURL("/query");
            expect(url).toBe("https://api.opper.ai/v1/indexes/1/query");
        });
    });

    describe("calcURLUploadUrl", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = index.calcURLUploadUrl("test.txt");
            expect(url).toBe("https://api.opper.ai/v1/indexes/1/upload_url?filename=test.txt");
        });
    });
});
