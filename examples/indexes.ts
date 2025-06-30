// Run example with "npx tsx examples/indexes.ts"
import "dotenv/config";
import { Opper } from "../src";

const opper = new Opper({
    httpBearer: process.env["OPPER_API_KEY"] ?? "",
});

(async () => {
    // Create knowledge base
    const kb = await opper.knowledge.create({
        name: "typescript/sdk/crud-kb",
    });
    console.log("Created knowledge base:", kb);

    // Add content with metadata
    await opper.knowledge.add(kb.id, {
        content: "hello world user",
        metadata: { source: "user" },
    });

    await opper.knowledge.add(kb.id, {
        content: "hello world admin",
        metadata: { source: "admin" },
    });

    console.log("Added content to knowledge base");

    // Query knowledge base (basic query)
    const basicQuery = await opper.knowledge.query(kb.id, {
        query: "hello world",
    });
    console.log("Basic query results:", basicQuery);

    // Query knowledge base (with filters)
    const filteredQuery = await opper.knowledge.query(kb.id, {
        query: "hello world",
        filters: [{ field: "source", operation: "=", value: "user" }],
    });
    console.log("Filtered query results:", filteredQuery);

    // Delete knowledge base
    const deleted = await opper.knowledge.delete(kb.id);
    console.log("Deleted knowledge base:", deleted);
})();
