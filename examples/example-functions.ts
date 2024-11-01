// Run example with "npx ts-node ./examples/example-functions.ts"
import "dotenv/config";
import Client from "../src";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    const fn = await client.functions.get({ name: "node-sdk/call/basic" });
    console.log(fn);
})();
