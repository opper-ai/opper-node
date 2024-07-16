// Run example with "npx ts-node ./examples/tracing_manual.ts"
import "dotenv/config";
import Client from "../src"; 

const client = new Client();


const sleepAndReturn = async (ms: number, returnValue: any) => {
    await new Promise(resolve => setTimeout(resolve, ms));
    return returnValue;
};


(async () => {
    // start outer span
    const outerSpan = await client.spans.startSpan({
        name: "Outer Span",
        input: JSON.stringify({ some: "input given to", to: "the span" }),
    });

    // start the span and provide the input
    const span = await client.spans.startSpan({
        name: "Translate Manual",
        input: JSON.stringify({ some: "input given to", to: "the span" }),
        parent_uuid: outerSpan.uuid,
    });

    // capture time call some function and capture response
    const t0 = new Date();
    const response = await sleepAndReturn(1000, "Hello, world!");
    const t1 = new Date();

    // save the generation under the current span
    await client.spans.saveGeneration(span.uuid, {
        called_at: t0,
        duration_ms: t1.getTime() - t0.getTime(),
        model: "anthropic/claude-3-haiku",
        response: response,
        messages: [{role: "user", content: "Hello, world!"}],
        prompt_tokens: 100,
        completion_tokens: 100,
        total_tokens: 200,
        cost: 0.001,
    });

    // end the span and provide the output
    await client.spans.endSpan({ 
        ...span, 
        output: JSON.stringify({"crip": "crap"}) , 
    });

    await client.spans.endSpan(outerSpan);
})();
