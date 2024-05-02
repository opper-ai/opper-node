import Client from "../index";
import Spans from "../spans";
import { Span, SpanMetric } from "../types";

// Mocking the global fetch to avoid actual API calls
// @ts-expect-error Mocking global fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe("Traces", () => {
    let traces: Spans;
    const mockApiKey = "test-api-key";

    beforeEach(() => {
        const mockClient = new Client({
            apiKey: mockApiKey,
        });

        traces = new Spans(mockClient);
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    describe("startSpan", () => {
        it("should call fetch with correct parameters and resolve with span UUID", async () => {
            const mockSpan: Span = {
                uuid: "span-uuid",
                name: "test-span",
                start_time: new Date(),
                end_time: new Date(),
            };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ uuid: mockSpan.uuid }),
            });

            const spanId = await traces.startSpan(mockSpan);

            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/v1/spans"), {
                method: "POST",
                headers: expect.any(Object),
                body: expect.any(String),
            });
            expect(spanId).toEqual(mockSpan.uuid);
        });
    });

    describe("endSpan", () => {
        it("should call fetch with correct parameters to update the span", async () => {
            const mockSpan: Span = {
                uuid: "span-uuid",
                name: "test-span",
                start_time: new Date(),
                end_time: new Date(),
            };
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ uuid: mockSpan.uuid }),
            });

            const spanId = await traces.endSpan(mockSpan);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/spans/${mockSpan.uuid}`),
                {
                    method: "PUT",
                    headers: expect.any(Object),
                    body: expect.any(String),
                }
            );
            expect(spanId).toEqual(mockSpan.uuid);
        });
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

            const metricId = await traces.saveMetric(spanUuid, mockFeedback);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/spans/${spanUuid}/metrics`),
                {
                    method: "POST",
                    headers: expect.any(Object),
                    body: expect.any(String),
                }
            );
            expect(metricId).toEqual("metric-uuid");
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

            const exampleId = await traces.saveExample(spanUuid);

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/spans/${spanUuid}/save_examples`),
                {
                    method: "POST",
                    headers: expect.any(Object),
                    body: undefined,
                }
            );
            expect(exampleId).toEqual("example-uuid");
        });
    });
});
