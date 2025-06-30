// Run example with "npx tsx examples/datasets.ts"
import "dotenv/config";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

(async () => {
    const f = await opper.functions.create({
        name: "async_dataset_function",
        instructions: "given an input, return the same input",
    });

    const datasetId = f.datasetId!;

    const d = await opper.datasets.createEntry(datasetId, {
        input: "Hello, world!",
        output: "Hello, world!",
        expected: "Hello, world!",
        comment: "Example dataset entry",
    });
    console.log("Dataset populated with sample:");
    console.log(d);

    // list entries
    const entries = await opper.datasets.listEntries(datasetId);
    console.log("Entries in the dataset:");
    console.log(entries);

    // get entry
    const entry = await opper.datasets.getEntry(datasetId, d.id);
    console.log("Entry:");
    console.log(entry);

    // query entries
    const query = await opper.datasets.queryEntries(datasetId, "Hello, world!");
    console.log("Query results:");
    console.log(query);

    // delete entry
    await opper.datasets.deleteEntry(datasetId, d.id);
    console.log("Entry deleted");

    await opper.functions.delete(f.id);
})();
