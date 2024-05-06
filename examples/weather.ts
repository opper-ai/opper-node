import { z } from "zod";
import Client, { fn } from "../src"; // import Client, { Span, fn } from "opperai";

const client = new Client();

const InputSchema = z.object({
    weather: z.string(),
});

const OutputSchema = z.object({
    temperature: z.number(),
    location: z.string(),
    unit: z.enum(["Celcius", "Fahrenheit"]),
});

const weather = fn(
    {
        path: "test_sdk/weather",
        model: "openai/gpt4-turbo",
        description: "Translate the given weather descriptioin into the given json schema",
    },
    InputSchema,
    OutputSchema
);

(async () => {
    const input = {
        weather:
            "In Stockholm its cloudy skies early, followed by partial clearing. Cooler. High 11C. Winds ENE at 15 to 25 km/h.",
    };

    const span = await client.spans.startSpan({
        name: "Weather",
        input: JSON.stringify(input),
    });

    const output = await weather(input);

    await client.spans.endSpan({ ...span, output: JSON.stringify(output) });

    console.log(output);
})();
