/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { knowledgeGetUploadUrl } from "../../funcs/knowledgeGetUploadUrl.js";
import { formatResult, ToolDefinition } from "../tools.js";

const args = {
  knowledgeBaseId: z.string(),
  filename: z.string(),
};

export const tool$knowledgeGetUploadUrl: ToolDefinition<typeof args> = {
  name: "knowledge-get-upload-url",
  description: `Get Upload Url

Get upload URL for a knowledge base by its id

Uploading files is a three step process:
1. Get upload URL (GET /v2/knowledge/{knowledge_base_id}/upload_url)
2. Upload file to the URL
3. Register file (POST /v2/knowledge/{knowledge_base_id}/register_file)`,
  args,
  tool: async (client, args, ctx) => {
    const [result, apiCall] = await knowledgeGetUploadUrl(
      client,
      args.knowledgeBaseId,
      args.filename,
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
