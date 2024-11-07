import Client from "../index";
import Spans from "../spans";
import { SpanMetric } from "../types";

// Mocking the global fetch to avoid actual API calls
// @ts-expect-error Mocking global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe("Spans", () => {
    let span: Spans;
    const mockApiKey = "test-api-key";

    beforeEach(() => {
        const mockClient = new Client({
            apiKey: mockApiKey,
        });

        jest.useFakeTimers();
        jest.setSystemTime(new Date("2020-04-01T00:00:00Z"));

        span = new Spans(mockClient);
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    describe("saveMetric", () => {
        it("should call fetch with correct parameters and resolve with metric UUID", async () => {
            const spanUuid = "span-uuid";
            const mockFeedback: SpanMetric = {
                dimension: "quality",
                score: 0.9,
                comment: "Good job",
            };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ uuid: "metric-uuid" }),
            });

            const metricId = await span.saveMetric(spanUuid, mockFeedback);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/spans/${spanUuid}/metrics`),
                {
                    method: "POST",
                    headers: expect.any(Object),
                    body: expect.any(String),
                }
            );
            expect(metricId).toStrictEqual({ uuid: "metric-uuid" });
        });
    });

    describe("saveExample", () => {
        it("should call fetch with correct parameters and resolve with example UUID", async () => {
            const spanUuid = "span-uuid";
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ uuid: "example-uuid" }),
            });

            const exampleId = await span.saveExample(spanUuid);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/spans/${spanUuid}/save_examples`),
                {
                    method: "POST",
                    headers: expect.any(Object),
                    body: "{}",
                }
            );
            expect(exampleId).toStrictEqual({ uuid: "example-uuid" });
        });
    });

    describe("saveGeneration", () => {
        it("should call fetch with correct parameters and resolve with example UUID", async () => {
            const spanUuid = "span-uuid";
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ uuid: "generation-uuid" }),
            });

            const generation = await span.saveGeneration(spanUuid, {
                called_at: new Date(),
                duration_ms: 100,
                model: "test-model",
                response: "test-response",
                prompt_tokens: 100,
                completion_tokens: 100,
                total_tokens: 200,
                error: "test-error",
                messages: [],
                cost: 100,
            });

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/spans/${spanUuid}/generation`),
                {
                    method: "POST",
                    headers: expect.any(Object),
                    body: JSON.stringify({
                        called_at: new Date(),
                        duration_ms: 100,
                        model: "test-model",
                        response: "test-response",
                        prompt_tokens: 100,
                        completion_tokens: 100,
                        total_tokens: 200,
                        error: "test-error",
                        messages: [],
                        cost: 100,
                    }),
                }
            );
            expect(generation).toStrictEqual({ uuid: "generation-uuid" });
        });
    });
});
