// Run example with "npx ts-node ./examples/example-functions.ts"
import "dotenv/config";
import Client from "../src";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    // Ensure the function exists
    await client.call({
        name: "node-sdk/datasets",
        input: "what is the capital of sweden",
    });

    const fn = await client.functions.get({ name: "node-sdk/datasets" });

    // Get the dataset for the function
    const dataset = await fn.dataset();

    // Add an entry to the dataset
    const entry = await dataset.add({
        input: "Hello, world!",
        output: "Hello, world!",
        expected: "Hello, world!",
    });
    console.log(entry);

    // Get all entries from the dataset
    const entries = await dataset.getEntries();
    console.log(entries);

    const deleted = await dataset.deleteEntry(entry.uuid);
    console.log(deleted);
})();