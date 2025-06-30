// Run example with "npx tsx examples/question_answering_kb.ts"
import "dotenv/config";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

const AnswerSchema = z.object({
    answer: z.string(),
    steps: z.array(z.string()),
});

const QuestionAndContextSchema = z.object({
    question: z.string(),
    context: z.union([z.array(z.string()), z.string()]),
});

async function answerQuestion(knowledgeBase: any, question: string) {
    // Query the knowledge base
    const results = await opper.knowledge.query(knowledgeBase.id, {
        query: question,
        topK: 1,
    });

    // Use the first result as context
    const context = results.length > 0 ? results[0].content : "";

    // Call with structured input/output
    const response = await opper.call({
        name: "typescript/sdk/answer-question",
        instructions: "Answer the question and provide the steps to do so",
        input: { question, context },
        inputSchema: zodToJsonSchema(QuestionAndContextSchema),
        outputSchema: zodToJsonSchema(AnswerSchema),
    });

    // Create a metric for the response
    await opper.spanMetrics.createMetric(response.spanId, {
        dimension: "artificial_score",
        value: 5,
    });

    return response.jsonPayload;
}

const qna = [
    {
        question: "I cannot log in to my account",
        answer: "Use the reset password feature by clicking on 'Forgot password?' and then follow the instructions from email",
        id: "1",
    },
    {
        question: "How can I see my invoices?",
        answer: "Go to the billing section and click on 'Invoices'",
        id: "2",
    },
    {
        question: "How can I add a new user to my account?",
        answer: "Upgrade account and add the user to your account",
        id: "3",
    },
];

async function indexQnA(qnas: typeof qna) {
    let knowledgeBase;

    try {
        // Try to get existing knowledge base by name
        knowledgeBase = await opper.knowledge.getByName("typescript/sdk/qna");
    } catch (error) {
        // Create new knowledge base if it doesn't exist
        knowledgeBase = await opper.knowledge.create({
            name: "typescript/sdk/qna",
        });
    }

    // Add QnA data to the knowledge base
    for (const qnaItem of qnas) {
        await opper.knowledge.add(knowledgeBase.id, {
            key: qnaItem.id,
            content: `question: ${qnaItem.question}\nanswer: ${qnaItem.answer}`,
            metadata: {
                id: qnaItem.id,
            },
        });
    }

    return knowledgeBase;
}

(async () => {
    console.log("Setting up QnA knowledge base...");
    const knowledgeBase = await indexQnA(qna);
    console.log("Knowledge base indexed with QnA data");

    const question = "How can I see my invoices?";
    console.log(`\nAnswering question: "${question}"`);

    const answer = await answerQuestion(knowledgeBase, question);
    console.log("Answer:", answer);
})();
