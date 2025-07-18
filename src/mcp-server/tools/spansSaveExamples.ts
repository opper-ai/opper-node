/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { spansSaveExamples } from "../../funcs/spansSaveExamples.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  spanId: z.string(),
};

export const tool$spansSaveExamples: ToolDefinition<typeof args> = {
  name: "spans-save-examples",
  description: `Save To Dataset

Save all generation spans to the dataset`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await spansSaveExamples(
      client,
      args.spanId,
      { fetchOptions: { signal: ctx.signal } },
    ).$inspect();

    if (!result.ok) {
      return {
        content: [{ type: "text", text: result.error.message }],
        isError: true,
      };
    }

    const value = result.value;

    return formatResult(value, apiCall);
  },
};
