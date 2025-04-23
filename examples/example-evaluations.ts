// Run example with "npx ts-node ./examples/example-evaluations.ts"
import "dotenv/config";
import Client, { evaluator, Metric } from "../src";
import { z } from "zod";

// Check for API key
if (!process.env.OPPER_API_KEY) {
    console.error("Error: OPPER_API_KEY environment variable is not set.");
    console.error("Please set it in a .env file or directly in your environment.");
    console.error("Example usage: OPPER_API_KEY=your_api_key npx ts-node ./examples/example-evaluations.ts");
    process.exit(1);
}

// Create a client with your API key
const client = new Client();

/**
 * Evaluator that checks if the text has enough lines
 */
const lineCountEvaluator = evaluator(
    (result: string, minLines = 10, maxLines = 20): Metric[] => {
        // Count non-empty lines
        const lines = result
            .trim()
            .split("\n")
            .filter((line) => line.trim().length > 0);
        const lineCount = lines.length;

        // Calculate score
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
                dimension: "line_count.score",
                value: score,
                comment: "Line count score",
            } as Metric,
            {
                dimension: "line_count.count",
                value: Math.min(1.0, lineCount / maxLines),
                comment: `Found ${lineCount} lines`,
            } as Metric,
        ];
    }
);

/**
 * Sentiment analysis schema using Zod
 */
const SentimentAnalysis = z.object({
    sentiment: z.enum(["positive", "negative", "neutral"]),
    score: z.number().min(0).max(1),
    explanation: z.string(),
});

type SentimentAnalysisType = z.infer<typeof SentimentAnalysis>;

/**
 * Evaluator that checks sentiment of text using an LLM call
 */
const sentimentEvaluator = evaluator(
    async (
        result: string,
        target: "positive" | "negative" | "neutral" = "positive",
        spanId?: string
    ): Promise<Metric[]> => {
        // Call LLM for sentiment analysis
        const { json_payload, span_id } = await client.call({
            name: "sentiment_analysis",
            instructions: "Analyze the sentiment of the text.",
            input: result,
            output_schema: {
                type: "object",
                properties: {
                    sentiment: {
                        type: "string",
                        enum: ["positive", "negative", "neutral"],
                        description: "The sentiment of the text",
                    },
                    score: {
                        type: "number",
                        minimum: 0,
                        maximum: 1,
                        description: "Sentiment score",
                    },
                    explanation: {
                        type: "string",
                        description: "Brief explanation of the sentiment analysis",
                    },
                },
                required: ["sentiment", "score", "explanation"],
            },
            parent_span_uuid: spanId,
        });

        const response = SentimentAnalysis.parse(json_payload);

        // Check for target sentiment
        const success = response.sentiment === target;

        return [
            {
                dimension: "sentiment.score",
                value: response.score,
                comment: "Sentiment score (0.0-1.0)",
            } as Metric,
            {
                dimension: "sentiment.match",
                value: success ? 1.0 : 0.0,
                comment: `Target sentiment: ${target}`,
            } as Metric,
        ];
    }
);

async function main() {
    // Start a trace
    const trace = await client.traces.start({
        name: "evaluation-example",
        input: "VR Headset",
    });

    console.log("Generating a poem...");

    // Generate content to evaluate
    const instructions = "Write a rhyming poem about the input. Make it at least 12 lines with a positive tone.";
    const input = "VR Headset";

    const { message, span_id } = await client.call({
        name: "poem_generation",
        instructions,
        input,
        parent_span_uuid: trace.uuid,
    });

    console.log("\n--- Generated Poem ---\n");
    console.log(message);
    console.log("\n");

    console.log("Running evaluations...");

    // Run evaluation using decorated evaluators
    const evaluation = await client.evaluate({
        span_id,
        evaluators: [
            lineCountEvaluator(message, 4, 10),
            sentimentEvaluator(message, "positive", span_id),
        ],
    });

    // Display results
    console.log("\n--- Evaluation Results ---\n");

    // Show metrics for each evaluator group
    for (const [groupName, metricsList] of Object.entries(evaluation.metrics)) {
        console.log(`${groupName}:`);
        
        // Calculate average score
        const values = metricsList
            .map((m) => m.value)
            .filter((v): v is number => v !== undefined);
        
        const avgScore = values.length ? 
            values.reduce((sum, val) => sum + val, 0) / values.length : 
            0;
            
        console.log(`  Average Score: ${avgScore.toFixed(2)}`);
        console.log("  Metrics:");
        
        for (const metric of metricsList) {
            console.log(
                `    - ${metric.dimension}: ${metric.value.toFixed(2)} (${metric.comment})`
            );
        }
        console.log();
    }

    // End the trace
    await trace.end({
        output: "Evaluation completed",
    });
}

// Run the example
main().catch((error) => {
    console.error("Error running example:", error);
    process.exit(1);
}); 