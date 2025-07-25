/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import {
  collectExtraKeys as collectExtraKeys$,
  safeParse,
} from "../lib/schemas.js";
import { ClosedEnum } from "../types/enums.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  Choice,
  Choice$inboundSchema,
  Choice$Outbound,
  Choice$outboundSchema,
} from "./choice.js";
import {
  CompletionUsage,
  CompletionUsage$inboundSchema,
  CompletionUsage$Outbound,
  CompletionUsage$outboundSchema,
} from "./completionusage.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export const ChatCompletionServiceTier = {
  Auto: "auto",
  Default: "default",
  Flex: "flex",
} as const;
export type ChatCompletionServiceTier = ClosedEnum<
  typeof ChatCompletionServiceTier
>;

export type ChatCompletion = {
  id: string;
  choices: Array<Choice>;
  created: number;
  model: string;
  object?: "chat.completion" | undefined;
  serviceTier?: ChatCompletionServiceTier | null | undefined;
  systemFingerprint?: string | null | undefined;
  usage?: CompletionUsage | null | undefined;
  additionalProperties?: { [k: string]: any };
};

/** @internal */
export const ChatCompletionServiceTier$inboundSchema: z.ZodNativeEnum<
  typeof ChatCompletionServiceTier
> = z.nativeEnum(ChatCompletionServiceTier);

/** @internal */
export const ChatCompletionServiceTier$outboundSchema: z.ZodNativeEnum<
  typeof ChatCompletionServiceTier
> = ChatCompletionServiceTier$inboundSchema;

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ChatCompletionServiceTier$ {
  /** @deprecated use `ChatCompletionServiceTier$inboundSchema` instead. */
  export const inboundSchema = ChatCompletionServiceTier$inboundSchema;
  /** @deprecated use `ChatCompletionServiceTier$outboundSchema` instead. */
  export const outboundSchema = ChatCompletionServiceTier$outboundSchema;
}

/** @internal */
export const ChatCompletion$inboundSchema: z.ZodType<
  ChatCompletion,
  z.ZodTypeDef,
  unknown
> = collectExtraKeys$(
  z.object({
    id: z.string(),
    choices: z.array(Choice$inboundSchema),
    created: z.number().int(),
    model: z.string(),
    object: z.literal("chat.completion").default("chat.completion").optional(),
    service_tier: z.nullable(ChatCompletionServiceTier$inboundSchema)
      .optional(),
    system_fingerprint: z.nullable(z.string()).optional(),
    usage: z.nullable(CompletionUsage$inboundSchema).optional(),
  }).catchall(z.any()),
  "additionalProperties",
  true,
).transform((v) => {
  return remap$(v, {
    "service_tier": "serviceTier",
    "system_fingerprint": "systemFingerprint",
  });
});

/** @internal */
export type ChatCompletion$Outbound = {
  id: string;
  choices: Array<Choice$Outbound>;
  created: number;
  model: string;
  object: "chat.completion";
  service_tier?: string | null | undefined;
  system_fingerprint?: string | null | undefined;
  usage?: CompletionUsage$Outbound | null | undefined;
  [additionalProperties: string]: unknown;
};

/** @internal */
export const ChatCompletion$outboundSchema: z.ZodType<
  ChatCompletion$Outbound,
  z.ZodTypeDef,
  ChatCompletion
> = z.object({
  id: z.string(),
  choices: z.array(Choice$outboundSchema),
  created: z.number().int(),
  model: z.string(),
  object: z.literal("chat.completion").default("chat.completion" as const),
  serviceTier: z.nullable(ChatCompletionServiceTier$outboundSchema).optional(),
  systemFingerprint: z.nullable(z.string()).optional(),
  usage: z.nullable(CompletionUsage$outboundSchema).optional(),
  additionalProperties: z.record(z.any()),
}).transform((v) => {
  return {
    ...v.additionalProperties,
    ...remap$(v, {
      serviceTier: "service_tier",
      systemFingerprint: "system_fingerprint",
      additionalProperties: null,
    }),
  };
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ChatCompletion$ {
  /** @deprecated use `ChatCompletion$inboundSchema` instead. */
  export const inboundSchema = ChatCompletion$inboundSchema;
  /** @deprecated use `ChatCompletion$outboundSchema` instead. */
  export const outboundSchema = ChatCompletion$outboundSchema;
  /** @deprecated use `ChatCompletion$Outbound` instead. */
  export type Outbound = ChatCompletion$Outbound;
}

export function chatCompletionToJSON(chatCompletion: ChatCompletion): string {
  return JSON.stringify(ChatCompletion$outboundSchema.parse(chatCompletion));
}

export function chatCompletionFromJSON(
  jsonString: string,
): SafeParseResult<ChatCompletion, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ChatCompletion$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ChatCompletion' from JSON`,
  );
}
