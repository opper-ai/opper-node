import Client from "../src";
// @ts-expect-error Install next
import type { NextApiRequest, NextApiResponse } from "next";

// This file demonstrates how to stream from a Next.JS server as
// a new-line separated JSON-encoded stream.

// THIS FILE CANNOT BE RUN WITHOUT NEXT.JS SCAFFOLDING.
export async function POST(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: NextApiRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: NextApiResponse
) {
    // Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
    const client = new Client();

    const stream = await client.call({
        name: "node-sdk/stream/nextjs",
        instructions: "Translate the given text from English to Swedish",
        input: req.text(),
        stream: true,
    });

    // When using the next app router
    return new Response(stream);
}
