// Run example with "npx ts-node ./examples/example-indexes.ts"
import "dotenv/config";
import Client from "../src";

const client = new Client();

(async () => {
    const query = "Issue with my account";
    const trace = await client.traces.start({
        name: "node-sdk/indexes",
        input: query,
    });

    let index = await client.indexes.get("node-sdk/indexes/support-tickets");
    if (!index) {
        index = await client.indexes.create("node-sdk/indexes/support-tickets");
    }

    const tickets = [
        {
            title: "Issue with my account",
            description: "I cannot log in to my account",
            status: "open",
            id: "1",
        },
        {
            title: "Payment issue",
            description: "I cannot pay for my subscription",
            status: "open",
            id: "2",
        },
        {
            title: "Feature request",
            description: "I would like to request a new feature",
            status: "closed",
            id: "3",
        },
        {
            title: "Slow response time",
            description: "The response time for queries is too slow",
            status: "open",
            id: "4",
        },
        {
            title: "Data sync error",
            description: "There is an error syncing data across devices",
            status: "open",
            id: "5",
        },
        {
            title: "App crash on launch",
            description: "The app crashes every time I try to launch it",
            status: "open",
            id: "6",
        },
    ];

    // Add each ticket to the index. Add status to metadata so we can filter by it later.
    for (const ticket of tickets) {
        const doc = {
            content: ticket.title + " " + ticket.description,
            metadata: {
                status: ticket.status,
            },
        };
        await index.add(doc);
    }

    const results = await index.query({
        query,
        k: 1,
        parent_span_uuid: trace.uuid,
    });

    console.log(results[0].content);
    // 'Issue with my account I cannot log in to my account'
    console.log(results[0].metadata);
    // { status: 'open', id: '1' }

    const open_results = await index.query({
        query,
        k: 1,
        filters: [{ key: "status", operation: "=", value: "open" }],
        parent_span_uuid: trace.uuid,
    });

    console.log(open_results[0].content);

    // Upload a file to the index
    const file = await index.uploadFile("examples/fixtures/example.txt");

    console.log("file: ", file);

    // 'Issue with my account I cannot log in to my account'
    await trace.end({
        output: open_results,
    });
})();
