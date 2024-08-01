// Run example with "npx ts-node ./examples/calls.ts"
import "dotenv/config";

import Client from "../src";

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

(async () => {
    const output = await client.call("test_sdk/calls");

    console.log(output);
})();
