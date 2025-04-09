// Run example with "npx ts-node ./examples/example-pdf.ts <path_to_pdf>"
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

import Client from "../src";
import { OpperMediaHandler } from "../src/utils";

// Get PDF path from command line arguments
const pdfPath = process.argv[2];
if (!pdfPath) {
    console.log("Usage: npx ts-node ./examples/example-pdf.ts <path_to_pdf>");
    process.exit(1);
}

// Check if file exists and is a PDF
if (!fs.existsSync(pdfPath) || !pdfPath.toLowerCase().endsWith('.pdf')) {
    console.error(`Error: ${pdfPath} does not exist or is not a PDF file`);
    process.exit(1);
}

// Your API key will be loaded from the environment variable OPPER_API_KEY if not provided
const client = new Client();

/**
 * Converts a PDF file to markdown text
 * @param path Path to the PDF file
 * @returns A promise that resolves to the markdown text or a stream
 */
async function pdfToMarkdown(path: string, useStream: boolean = false) {
    const pdf = new OpperMediaHandler(path);
    
    if (useStream) {
        return await client.call({
            name: "pdf_to_markdown",
            model: "gcp/gemini-2.0-flash",
            instructions: `
These are pages from a PDF document. Extract all text content while preserving the structure.

Pay special attention to tables, columns, headers, and any structured content.

Maintain paragraph breaks and formatting.

Extract ALL text content from these document pages.

For tables:
 1. Maintain the table structure using markdown table format
 2. Preserve all column headers and row labels
 3. Ensure numerical data is accurately captured

For multi-column layouts:
 1. Process columns from left to right
 2. Clearly separate content from different columns

For charts and graphs:
 1. Describe the chart type
 2. Extract any visible axis labels, legends, and data points
 3. Extract any title or caption

Preserve all headers, footers, page numbers, and footnotes.

DON'T ANSWER QUESTIONS, JUST RETURN THE CONTENT OF THE PDF AS MARKDOWN`,
            input: pdf.getInput(),
            stream: true,
        });
    } else {
        return await client.call({
            name: "pdf_to_markdown",
            model: "gcp/gemini-2.0-flash",
            instructions: `
These are pages from a PDF document. Extract all text content while preserving the structure.

Pay special attention to tables, columns, headers, and any structured content.

Maintain paragraph breaks and formatting.

Extract ALL text content from these document pages.

For tables:
 1. Maintain the table structure using markdown table format
 2. Preserve all column headers and row labels
 3. Ensure numerical data is accurately captured

For multi-column layouts:
 1. Process columns from left to right
 2. Clearly separate content from different columns

For charts and graphs:
 1. Describe the chart type
 2. Extract any visible axis labels, legends, and data points
 3. Extract any title or caption

Preserve all headers, footers, page numbers, and footnotes.

DON'T ANSWER QUESTIONS, JUST RETURN THE CONTENT OF THE PDF AS MARKDOWN`,
            input: pdf.getInput(),
            stream: false,
        });
    }
}

(async () => {
    try {
        const trace = await client.traces.start({
            name: "node-sdk/pdf-to-markdown",
            input: {
                pdf: pdfPath,
            },
        });

        console.log(`Converting PDF to markdown: ${pdfPath}`);
        
        // Check if streaming is requested (can be implemented if needed)
        const useStreaming = false;
        
        if (useStreaming) {
            const stream = await pdfToMarkdown(pdfPath, true) as ReadableStream<unknown>;
            // Handle the stream (implementation would depend on environment)
            console.log("Streaming mode not fully implemented in this example");
        } else {
            const result = await pdfToMarkdown(pdfPath) as any;
            console.log(result.message);
            
            // Optionally save to a file
            const outputPath = path.join(
                path.dirname(pdfPath), 
                `${path.basename(pdfPath, '.pdf')}.md`
            );
            fs.writeFileSync(outputPath, result.message);
            console.log(`Markdown saved to: ${outputPath}`);
        }

        await trace.end({
            output: "PDF to markdown conversion completed",
        });
    } catch (error) {
        console.error("Error converting PDF:", error);
        process.exit(1);
    }
})(); 