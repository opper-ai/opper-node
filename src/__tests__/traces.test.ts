import Traces, { OpperSpan, OpperTrace } from "../traces";
import Client from "../index";

describe("Traces", () => {
    let client: Client;
    let traces: Traces;
    let trace: OpperTrace;
    let span: OpperSpan;

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

            const trace = await traces.start({ name: "Test Trace", input: "string input" });

            expect(trace).toBeInstanceOf(Object);
            expect(trace).toHaveProperty("uuid", "test-uuid");
        });

        it("should throw an error if the API request fails", async () => {
            const mockResponse = {
                ok: false,
                statusText: "Bad Request",
            };
            global.fetch = jest.fn().mockResolvedValue(mockResponse);

            await expect(
                traces.start({ name: "Test Trace", input: "string input" })
            ).rejects.toThrow(
                "OpperAIClient: Failed to send request to https://api.opper.ai/v1/spans: Bad Request"
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

            trace = await traces.start({ name: "Test Trace", input: "string input" });
            span = await trace.startSpan({ name: "Test Span", input: "string input" });

            expect(span).toBeInstanceOf(Object);
            expect(span).toHaveProperty("uuid", "test-uuid");
        });
    });

    describe("calcBaseURL", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = trace.calcBaseURL();
            expect(url).toBe("https://api.opper.ai/v1/spans");
        });
    });

    describe("calcResourceURL", () => {
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = trace.calcResourceURL();
            expect(url).toBe("https://api.opper.ai/v1/spans/test-uuid");
        });
        it("should return the correct URL", () => {
            // @ts-expect-error Testing protected method
            const url = trace.calcResourceURL("/sub-path");
            expect(url).toBe("https://api.opper.ai/v1/spans/test-uuid/sub-path");
        });
    });

    describe("Span", () => {
        it("should save metric successfully", async () => {
            const metricSpy = jest.spyOn(span, "saveMetric").mockResolvedValue({
                uuid: "test-uuid",
            });

            await span.saveMetric({
                dimension: "accuracy",
                value: 1,
                comment: "This is a comment",
            });

            expect(metricSpy).toHaveBeenCalledWith({
                dimension: "accuracy",
                value: 1,
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
