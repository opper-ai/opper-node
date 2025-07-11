/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { spanMetricsCreateMetric } from "../../funcs/spanMetricsCreateMetric.js";
import * as models from "../../models/index.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  spanId: z.string(),
  createSpanMetricRequest: models.CreateSpanMetricRequest$inboundSchema,
};

export const tool$spanMetricsCreateMetric: ToolDefinition<typeof args> = {
  name: "span-metrics-create-metric",
  description: `Create Metric

Create a new metric for a span`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await spanMetricsCreateMetric(
      client,
      args.spanId,
      args.createSpanMetricRequest,
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
