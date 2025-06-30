// Run example with "npx tsx examples/evaluation.ts"
import "dotenv/config";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

/**
 * Evaluator that checks if the text has enough lines.
 */
function linecountEvaluator(text: string, minLines = 10, maxLines = 20) {
    const lines = text
        .trim()
        .split("\n")
        .filter((line) => line.trim());
    const lineCount = lines.length;

    let score: number;
    if (lineCount < minLines) {
        score = lineCount / minLines;
    } else if (lineCount > maxLines) {
        const excess = lineCount - maxLines;
        const maxExcess = maxLines;
        score = Math.max(0, 1 - excess / maxExcess);
    } else {
        score = 1.0;
    }

    return [
        {
            dimension: "line_count-score",
            value: score,
            comment: "Line count score",
        },
        {
            dimension: "line_count-count",
            value: Math.min(1.0, lineCount / maxLines),
            comment: `Found ${lineCount} lines`,
        },
    ];
}

/**
 * Evaluator that checks sentiment of text using an LLM call.
 */
async function sentimentEvaluator(
    text: string,
    target = "positive",
    spanId?: string
) {
    // Define output schema for sentiment analysis
    const SentimentAnalysisSchema = z.object({
        sentiment: z
            .enum(["positive", "negative", "neutral"])
            .describe("The sentiment of the text"),
        score: z.number().min(0.0).max(1.0).describe("Sentiment score"),
        explanation: z
            .string()
            .describe("Brief explanation of the sentiment analysis"),
    });

    // Call LLM for sentiment analysis
    const response = await opper.call({
        name: "typescript/sdk/sentiment-analysis",
        instructions: "Analyze the sentiment of the text.",
        input: text,
        outputSchema: zodToJsonSchema(SentimentAnalysisSchema),
        parentSpanId: spanId,
    });

    // Check for target sentiment
    const success = response.jsonPayload?.sentiment === target;

    // Return metrics
    return [
        {
            dimension: "sentiment-score",
            value: response.jsonPayload?.score || 0,
            comment: "Sentiment score (0.0-1.0)",
        },
        {
            dimension: "sentiment-match",
            value: success ? 1.0 : 0.0,
            comment: `Target sentiment: ${target}`,
        },
    ];
}

(async () => {
    // Generate content to evaluate
    const instructions =
        "Write a rhyming poem about the input. Make it at least 12 lines with a positive tone.";
    const input = "VR Headset";

    const result = await opper.call({
        name: "typescript/sdk/poem-generation",
        instructions: instructions,
        input: input,
    });

    console.log(`\n--- Generated Poem ---\n${result.message}\n`);

    // Add metrics to Opper
    const linecountMetrics = linecountEvaluator(result.message || "", 4, 10);
    const sentimentMetrics = await sentimentEvaluator(
        result.message || "",
        "positive"
    );
    const metrics = [...linecountMetrics, ...sentimentMetrics];

    for (const metric of metrics) {
        await opper.spanMetrics.createMetric(result.spanId, {
            dimension: metric.dimension,
            value: metric.value,
            comment: metric.comment,
        });
    }

    // Retrieve metrics from Opper and display
    console.log("\n--- Evaluation Results ---");

    // Show metrics for each evaluator group
    const retrievedMetrics = await opper.spanMetrics.list(result.spanId);
    for (const metric of retrievedMetrics.data || []) {
        console.log(`\n${metric.dimension}:`);
        console.log(`  Value: ${metric.value}`);
        console.log(`  Comment: ${metric.comment}`);
        console.log("-".repeat(80));
    }
})();
