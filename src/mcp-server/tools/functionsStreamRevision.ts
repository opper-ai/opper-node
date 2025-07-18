/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { functionsStreamRevision } from "../../funcs/functionsStreamRevision.js";
import * as models from "../../models/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  functionId: z.string(),
  revisionId: z.string(),
  appApiPublicV2FunctionsCallFunctionRequest:
    models.AppApiPublicV2FunctionsCallFunctionRequest$inboundSchema,
};

export const tool$functionsStreamRevision: ToolDefinition<typeof args> = {
  name: "functions-stream-revision",
  description: `Stream Function Revision

Stream a function revision call execution in real-time using Server-Sent Events (SSE).

This endpoint returns a continuous stream of Server-Sent Event objects as the function executes,
allowing for real-time streaming of responses. The response follows the Server-Sent Events
specification with proper event structure for SDK compatibility.

Each Server-Sent Event contains:
- \`id\`: Optional event identifier
- \`event\`: Optional event type
- \`data\`: JSON payload with streaming chunk information
- \`retry\`: Optional retry interval

The data payload includes:
- \`delta\`: Incremental text content (if any)
- \`span_id\`: Unique identifier for the execution span (when available)`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await functionsStreamRevision(
      client,
      args.functionId,
      args.revisionId,
      args.appApiPublicV2FunctionsCallFunctionRequest,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value.result;

    return formatResult(value, apiCall);
  },
};
