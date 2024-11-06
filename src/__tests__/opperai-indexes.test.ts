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
});

describe("Index", () => {
    let index: Index;

    beforeEach(() => {
        index = new Index(mockIndexes[0], {
            baseURL: "https://api.opper.ai",
            apiKey: "test-api-key",
            isUsingAuthorization: true,
        });
    });

    describe("calcURLAddIndex", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = index.calcURLAddIndex();
            expect(url).toBe("https://api.opper.ai/v1/indexes/1/index");
        });
    });

    describe("calcURLQueryIndex", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = index.calcURLQueryIndex();
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

    describe("calcURLRegisterFile", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = index.calcURLRegisterFile();
            expect(url).toBe("https://api.opper.ai/v1/indexes/1/register_file");
        });
    });
});
