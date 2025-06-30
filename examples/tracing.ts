// Run example with "npx tsx examples/tracing.ts"
import "dotenv/config";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

async function createSpan() {
    const span = await opper.spans.create({
        name: "typescript/sdk/tracing-workflow",
        startTime: new Date(),
        type: "workflow",
    });
    console.log("Created parent span:");
    console.log(span);
    return span;
}

(async () => {
    const parentSpan = await createSpan();
    const startTime = Date.now() / 1000;

    // A call gets its own span but you can make it a child of a parent span
    await opper.call({
        name: "typescript/sdk/tracing-call",
        instructions: "Answer the question",
        input: "What is half the half of double the number 10?",
        model: "openai/gpt-4.1-nano",
        parentSpanId: parentSpan.id,
    });

    const endTime = Date.now() / 1000;
    const totalTime = endTime - startTime;

    // We want to measure if the call is fast. Less than 3s is score=1, else 0
    const score = totalTime < 3 ? 1 : 0;

    await opper.spanMetrics.createMetric(parentSpan.id, {
        dimension: "score",
        value: score,
        comment: `Total time: ${totalTime}`,
    });

    // End the span
    await opper.spans.update(parentSpan.id, {
        endTime: new Date(),
    });

    // Get the trace
    console.log("Getting trace...");
    if (parentSpan.traceId) {
        const trace = await opper.traces.get(parentSpan.traceId);

        console.log(trace);
    }
})();
