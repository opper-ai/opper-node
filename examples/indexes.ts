// Run example with "npx ts-node ./examples/indexes.ts"
import "dotenv/config";
import Client from "../src";

const client = new Client();

(async () => {
    const index = await client.indexes.create("support-tickets");

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
        await client.indexes.add(index, doc);
    }

    const query = "Issue with my account";
    const results = await client.indexes.retrieve(index, query, 1, null);

    console.log(results[0].content);
    // 'Issue with my account I cannot log in to my account'
    console.log(results[0].metadata);
    // { status: 'open', id: '1' }

    const open_results = await client.indexes.retrieve(index, query, 1, [
        { key: "status", operation: "=", value: "open" },
    ]);

    console.log(open_results[0].content);

    // 'Issue with my account I cannot log in to my account'
})();
