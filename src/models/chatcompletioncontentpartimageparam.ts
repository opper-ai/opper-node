/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import {
  ImageURL,
  ImageURL$inboundSchema,
  ImageURL$Outbound,
  ImageURL$outboundSchema,
} from "./imageurl.js";

export type ChatCompletionContentPartImageParam = {
  imageUrl: ImageURL;
  type?: "image_url" | undefined;
};

/** @internal */
export const ChatCompletionContentPartImageParam$inboundSchema: z.ZodType<
  ChatCompletionContentPartImageParam,
  z.ZodTypeDef,
  unknown
> = z.object({
  image_url: ImageURL$inboundSchema,
  type: z.literal("image_url").default("image_url").optional(),
}).transform((v) => {
  return remap$(v, {
    "image_url": "imageUrl",
  });
});

/** @internal */
export type ChatCompletionContentPartImageParam$Outbound = {
  image_url: ImageURL$Outbound;
  type: "image_url";
};

/** @internal */
export const ChatCompletionContentPartImageParam$outboundSchema: z.ZodType<
  ChatCompletionContentPartImageParam$Outbound,
  z.ZodTypeDef,
  ChatCompletionContentPartImageParam
> = z.object({
  imageUrl: ImageURL$outboundSchema,
  type: z.literal("image_url").default("image_url" as const),
}).transform((v) => {
  return remap$(v, {
    imageUrl: "image_url",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ChatCompletionContentPartImageParam$ {
  /** @deprecated use `ChatCompletionContentPartImageParam$inboundSchema` instead. */
  export const inboundSchema =
    ChatCompletionContentPartImageParam$inboundSchema;
  /** @deprecated use `ChatCompletionContentPartImageParam$outboundSchema` instead. */
  export const outboundSchema =
    ChatCompletionContentPartImageParam$outboundSchema;
  /** @deprecated use `ChatCompletionContentPartImageParam$Outbound` instead. */
  export type Outbound = ChatCompletionContentPartImageParam$Outbound;
}

export function chatCompletionContentPartImageParamToJSON(
  chatCompletionContentPartImageParam: ChatCompletionContentPartImageParam,
): string {
  return JSON.stringify(
    ChatCompletionContentPartImageParam$outboundSchema.parse(
      chatCompletionContentPartImageParam,
    ),
  );
}

export function chatCompletionContentPartImageParamFromJSON(
  jsonString: string,
): SafeParseResult<ChatCompletionContentPartImageParam, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      ChatCompletionContentPartImageParam$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ChatCompletionContentPartImageParam' from JSON`,
  );
}
