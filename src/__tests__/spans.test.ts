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
    let traces: Spans;
    const mockApiKey = "test-api-key";

    beforeEach(() => {
        const mockClient = new Client({
            apiKey: mockApiKey,
        });

        jest.useFakeTimers();
        jest.setSystemTime(new Date(2020, 3, 1));

        traces = new Spans(mockClient);
        // Clear all instances and calls to constructor and all methods:
        (global.fetch as jest.Mock).mockClear();
    });

    describe("startSpan", () => {
        it("should call fetch with correct parameters and resolve with the current span", async () => {
            const mockSpan = {
                uuid: "span-uuid",
                name: "test-span",
                start_time: new Date(),
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
            expect(spanId).toMatchSnapshot();
        });
    });

    describe("endSpan", () => {
        it("should call fetch with correct parameters to update the span", async () => {
            const mockSpan = {
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
            expect(spanId).toMatchSnapshot();
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

    describe("span with child span", () => {
        it("Should create a parent and child span", async () => {
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ uuid: "return-a-uuid" }),
            });

            const parent = await traces.startSpan({
                name: "parent-span",
                input: "parent input",
                uuid: "parent-uuid",
            });

            const child = await traces.startSpan({
                name: "child-span",
                uuid: "child-uuid",
                input: "child input",
                parent_uuid: "parent-uuid",
            });

            const childEndSpan = await traces.endSpan({ ...child, output: "child output" });
            const parentEndSpan = await traces.endSpan({ ...parent, output: "parent output" });

            expect(childEndSpan.name).toBe("child-span");
            expect(childEndSpan.output).toBe("child output");
            expect(childEndSpan.parent_uuid).toBe("parent-uuid");
            expect(childEndSpan.project).toBe("missing_project");
            expect(childEndSpan).toMatchSnapshot();

            expect(parentEndSpan.name).toBe("parent-span");
            expect(parentEndSpan.output).toBe("parent output");
            expect(parentEndSpan.parent_uuid).toBe(undefined);
            expect(parentEndSpan.project).toBe("missing_project");
            expect(parentEndSpan).toMatchSnapshot();
        });
    });
});
