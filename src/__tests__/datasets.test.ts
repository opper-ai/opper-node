import { Dataset } from "../datasets";
import { DatasetEntry } from "../types";

// Mocking the global fetch to avoid actual API calls
// @ts-expect-error Mocking global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe("Dataset", () => {
    const mockContext = {
        baseURL: "https://api.test.com",
        apiKey: "test-key",
        isUsingAuthorization: false,
        doGet: jest.fn(),
        doPost: jest.fn(),
        doPut: jest.fn(),
        doDelete: jest.fn(),
    };
    const mockHeaders = {
        "Content-Type": "application/json",
        "User-Agent": "opper-node/0.0.0",
        "X-OPPER-API-KEY": "test-key",
    };

    const mockUUID = "test-uuid";
    let dataset: Dataset;

    beforeEach(() => {
        dataset = new Dataset(mockUUID, mockContext);
        jest.clearAllMocks();
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2020-04-01T00:00:00Z"));
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    describe("constructor", () => {
        it("should create a Dataset instance with the correct UUID", () => {
            expect(dataset.uuid).toBe(mockUUID);
        });

        it("should return the correct calcURLDataset URL", () => {
            // @ts-expect-error Testing protected method
            expect(dataset.calcURLDataset()).toBe(`${mockContext.baseURL}/v1/datasets/${mockUUID}`);
        });

        it("should return the correct calcURLDatasetEntry URL", () => {
            // @ts-expect-error Testing protected method
            expect(dataset.calcURLDatasetEntry("entry-uuid")).toBe(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}/entries/entry-uuid`
            );
        });

        it("should return the correct calcURLDatasetEntries URL", () => {
            // @ts-expect-error Testing protected method
            expect(dataset.calcURLDatasetEntries()).toBe(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}/entries?offset=0&limit=100`
            );
        });
    });

    describe("add", () => {
        const mockEntry: Omit<DatasetEntry, "uuid"> = {
            input: "test input",
            output: "test output",
            expected: "test expected",
        };

        const mockResponse: DatasetEntry = {
            uuid: "entry-uuid",
            ...mockEntry,
        };

        it("should successfully add an entry", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse),
            });

            const result = await dataset.add(mockEntry);

            expect(result).toEqual(mockResponse);

            expect(global.fetch).toHaveBeenCalledWith(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}`,
                {
                    method: "POST",
                    headers: mockHeaders,
                    body: JSON.stringify(mockEntry),
                }
            );
        });

        it("should throw OpperError when request fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            });

            await expect(dataset.add(mockEntry)).rejects.toThrow(
                `OpperAIClient: 500 Failed to send request to ${mockContext.baseURL}/v1/datasets/${mockUUID}: Internal Server Error`
            );
        });
    });

    describe("getEntries", () => {
        const mockEntries: DatasetEntry[] = [
            { uuid: "1", input: "input1", output: "output1", expected: "expected1" },
            { uuid: "2", input: "input2", output: "output2", expected: "expected2" },
        ];

        it("should successfully retrieve entries", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockEntries),
            });

            const result = await dataset.getEntries();
            expect(result).toEqual(mockEntries);

            expect(global.fetch).toHaveBeenCalledWith(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}/entries?offset=0&limit=100`,
                {
                    method: "GET",
                    headers: mockHeaders,
                }
            );
        });

        it("should handle pagination parameters", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockEntries),
            });

            await dataset.getEntries(10, 50);
            expect(global.fetch).toHaveBeenCalledWith(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}/entries?offset=10&limit=50`,
                {
                    method: "GET",
                    headers: mockHeaders,
                }
            );
        });

        it("should throw OpperError when request fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            });

            await expect(dataset.getEntries()).rejects.toThrow(
                `OpperAIClient: 500 Failed to fetch request ${mockContext.baseURL}/v1/datasets/${mockUUID}/entries?offset=0&limit=100: Internal Server Error`
            );
        });
    });

    describe("getEntry", () => {
        const mockEntry: DatasetEntry = {
            uuid: "entry-uuid",
            input: "test input",
            output: "test output",
            expected: "test expected",
        };

        it("should successfully retrieve a single entry", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockEntry),
            });

            const result = await dataset.getEntry(mockEntry.uuid);
            expect(result).toEqual(mockEntry);
            expect(global.fetch).toHaveBeenCalledWith(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}/entries/${mockEntry.uuid}`,
                {
                    method: "GET",
                    headers: mockHeaders,
                }
            );
        });

        it("should throw OpperError when request fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            await expect(dataset.getEntry(mockEntry.uuid)).rejects.toThrow(
                `OpperAIClient: 404 Failed to fetch request ${mockContext.baseURL}/v1/datasets/${mockUUID}/entries/${mockEntry.uuid}: Not Found`
            );
        });
    });

    describe("updateEntry", () => {
        const mockEntry: DatasetEntry = {
            uuid: "entry-uuid",
            input: "updated input",
            output: "updated output",
            expected: "updated expected",
        };

        it("should successfully update an entry", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockEntry),
            });

            const result = await dataset.updateEntry(mockEntry.uuid, mockEntry);
            expect(result).toEqual(mockEntry);
            expect(global.fetch).toHaveBeenCalledWith(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}/entries/${mockEntry.uuid}`,
                {
                    method: "PUT",
                    headers: mockHeaders,
                    body: JSON.stringify(mockEntry),
                }
            );
        });

        it("should throw OpperError when request fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: "Bad Request",
            });

            await expect(dataset.updateEntry(mockEntry.uuid, mockEntry)).rejects.toThrow(
                `OpperAIClient: 400 Failed to send request to ${mockContext.baseURL}/v1/datasets/${mockUUID}/entries/${mockEntry.uuid}: Bad Request`
            );
        });
    });

    describe("deleteEntry", () => {
        const entryUUID = "entry-uuid";

        it("should successfully delete an entry", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(true),
            });

            const result = await dataset.deleteEntry(entryUUID);
            expect(result).toBe(true);
            expect(global.fetch).toHaveBeenCalledWith(
                `${mockContext.baseURL}/v1/datasets/${mockUUID}/entries/${entryUUID}`,
                {
                    method: "DELETE",
                    headers: mockHeaders,
                }
            );
        });

        it("should throw OpperError when request fails", async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: "Not Found",
            });

            await expect(dataset.deleteEntry(entryUUID)).rejects.toThrow(
                `OpperAIClient: 404 Failed to fetch request ${mockContext.baseURL}/v1/datasets/${mockUUID}/entries/${entryUUID}: Not Found`
            );
        });
    });
});
