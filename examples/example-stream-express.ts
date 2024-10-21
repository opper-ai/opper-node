import Client from "../src";
// @ts-expect-error Install express
import express from "express";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

const app = express();

app.use(express.text());

// This endpoint can be called with:
//
//   curl 127.0.0.1:3000 -N -X POST -H 'Content-Type: text/plain' \
//     --data 'The quick brown fox jumps over the lazy dog'
//
app.post("/", async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const stream = await client.call({
            name: "node-sdk/stream/express",
            instructions: "Translate the given text from English to Swedish",
            input: req.body,
            stream: true,
        });

        res.header("Content-Type", "text/plain");
        for await (const chunk of stream) {
            console.log("Chunk:", chunk);
            res.write(chunk);
        }

        res.end();
    } catch (e) {
        console.error(e);
    }
});

app.listen("3000", () => {
    console.log("Started proxy express server");
});
