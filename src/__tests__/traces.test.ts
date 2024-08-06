import Traces, { Span, Trace } from "../traces";
import Client from "../index";

describe("Traces", () => {
    let client: Client;
    let traces: Traces;
    let trace: Trace;
    let span: Span;

    beforeEach(() => {
        client = new Client({ apiKey: "test-api-key" });
        traces = new Traces(client);
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2020-04-01T00:00:00Z"));
    });

    describe("start", () => {
        it("should start a new trace successfully", async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ uuid: "test-uuid" }),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            const trace = await traces.start({ name: "Test Trace" });

            expect(trace).toBeInstanceOf(Object);
            expect(trace).toHaveProperty("uuid", "test-uuid");
        });

        it("should throw an error if the API request fails", async () => {
            const mockResponse = {
                ok: false,
                statusText: "Bad Request",
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            await expect(traces.start({ name: "Test Trace" })).rejects.toThrow(
                "OpperAIClient: Failed to send request to https://api.opper.ai/v1/spans: Bad Request"
            );
        });

        it("should use default values if not provided", async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ uuid: "test-uuid" }),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            await traces.start({});

            expect(fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: expect.stringContaining('"name":"mising_name"'),
                })
            );
        });
    });

    describe("startSpan", () => {
        it("should start a new span successfully", async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ uuid: "test-uuid" }),
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            trace = await traces.start({ name: "Test Trace" });
            span = await trace.startSpan({ name: "Test Span" });

            expect(span).toBeInstanceOf(Object);
            expect(span).toHaveProperty("uuid", "test-uuid");
        });
    });

    describe("Span", () => {
        it("should save metric successfully", async () => {
            const metricSpy = jest.spyOn(span, "saveMetric").mockResolvedValue({
                uuid: "test-uuid",
            });

            await span.saveMetric({
                dimension: "accuracy",
                score: 1,
                comment: "This is a comment",
            });

            expect(metricSpy).toHaveBeenCalledWith({
                dimension: "accuracy",
                score: 1,
                comment: "This is a comment",
            });
        });

        it("should save generation successfully", async () => {
            const generationSpy = jest.spyOn(span, "saveGeneration").mockResolvedValue({
                uuid: "test-uuid",
            });

            await span.saveGeneration({
                duration_ms: 123,
                model: "anthropic/claude-3-haiku",
                response: "test",
                messages: [{ role: "user", content: "Hello, world!" }],
                prompt_tokens: 100,
                completion_tokens: 100,
                total_tokens: 200,
                cost: 0.001,
            });

            expect(generationSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    duration_ms: 123,
                    model: "anthropic/claude-3-haiku",
                    response: "test",
                    messages: [{ role: "user", content: "Hello, world!" }],
                    prompt_tokens: 100,
                    completion_tokens: 100,
                    total_tokens: 200,
                    cost: 0.001,
                })
            );
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
});
