/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import {
  Audio,
  Audio$inboundSchema,
  Audio$Outbound,
  Audio$outboundSchema,
} from "./audio.js";
import {
  ChatCompletionContentPartRefusalParam,
  ChatCompletionContentPartRefusalParam$inboundSchema,
  ChatCompletionContentPartRefusalParam$Outbound,
  ChatCompletionContentPartRefusalParam$outboundSchema,
} from "./chatcompletioncontentpartrefusalparam.js";
import {
  ChatCompletionContentPartTextParam,
  ChatCompletionContentPartTextParam$inboundSchema,
  ChatCompletionContentPartTextParam$Outbound,
  ChatCompletionContentPartTextParam$outboundSchema,
} from "./chatcompletioncontentparttextparam.js";
import {
  ChatCompletionMessageToolCallParam,
  ChatCompletionMessageToolCallParam$inboundSchema,
  ChatCompletionMessageToolCallParam$Outbound,
  ChatCompletionMessageToolCallParam$outboundSchema,
} from "./chatcompletionmessagetoolcallparam.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import {
  FunctionCallInput,
  FunctionCallInput$inboundSchema,
  FunctionCallInput$Outbound,
  FunctionCallInput$outboundSchema,
} from "./functioncallinput.js";

export type ChatCompletionAssistantMessageParamContent1 =
  | ChatCompletionContentPartTextParam
  | ChatCompletionContentPartRefusalParam;

export type ChatCompletionAssistantMessageParamContent2 =
  | string
  | Array<
    ChatCompletionContentPartTextParam | ChatCompletionContentPartRefusalParam
  >;

export type ChatCompletionAssistantMessageParam = {
  role?: "assistant" | undefined;
  audio?: Audio | null | undefined;
  content?:
    | string
    | Array<
      ChatCompletionContentPartTextParam | ChatCompletionContentPartRefusalParam
    >
    | null
    | undefined;
  functionCall?: FunctionCallInput | null | undefined;
  name?: string | undefined;
  refusal?: string | null | undefined;
  toolCalls?: Array<ChatCompletionMessageToolCallParam> | undefined;
};

/** @internal */
export const ChatCompletionAssistantMessageParamContent1$inboundSchema:
  z.ZodType<
    ChatCompletionAssistantMessageParamContent1,
    z.ZodTypeDef,
    unknown
  > = z.union([
    ChatCompletionContentPartTextParam$inboundSchema,
    ChatCompletionContentPartRefusalParam$inboundSchema,
  ]);

/** @internal */
export type ChatCompletionAssistantMessageParamContent1$Outbound =
  | ChatCompletionContentPartTextParam$Outbound
  | ChatCompletionContentPartRefusalParam$Outbound;

/** @internal */
export const ChatCompletionAssistantMessageParamContent1$outboundSchema:
  z.ZodType<
    ChatCompletionAssistantMessageParamContent1$Outbound,
    z.ZodTypeDef,
    ChatCompletionAssistantMessageParamContent1
  > = z.union([
    ChatCompletionContentPartTextParam$outboundSchema,
    ChatCompletionContentPartRefusalParam$outboundSchema,
  ]);

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ChatCompletionAssistantMessageParamContent1$ {
  /** @deprecated use `ChatCompletionAssistantMessageParamContent1$inboundSchema` instead. */
  export const inboundSchema =
    ChatCompletionAssistantMessageParamContent1$inboundSchema;
  /** @deprecated use `ChatCompletionAssistantMessageParamContent1$outboundSchema` instead. */
  export const outboundSchema =
    ChatCompletionAssistantMessageParamContent1$outboundSchema;
  /** @deprecated use `ChatCompletionAssistantMessageParamContent1$Outbound` instead. */
  export type Outbound = ChatCompletionAssistantMessageParamContent1$Outbound;
}

export function chatCompletionAssistantMessageParamContent1ToJSON(
  chatCompletionAssistantMessageParamContent1:
    ChatCompletionAssistantMessageParamContent1,
): string {
  return JSON.stringify(
    ChatCompletionAssistantMessageParamContent1$outboundSchema.parse(
      chatCompletionAssistantMessageParamContent1,
    ),
  );
}

export function chatCompletionAssistantMessageParamContent1FromJSON(
  jsonString: string,
): SafeParseResult<
  ChatCompletionAssistantMessageParamContent1,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      ChatCompletionAssistantMessageParamContent1$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'ChatCompletionAssistantMessageParamContent1' from JSON`,
  );
}

/** @internal */
export const ChatCompletionAssistantMessageParamContent2$inboundSchema:
  z.ZodType<
    ChatCompletionAssistantMessageParamContent2,
    z.ZodTypeDef,
    unknown
  > = z.union([
    z.string(),
    z.array(
      z.union([
        ChatCompletionContentPartTextParam$inboundSchema,
        ChatCompletionContentPartRefusalParam$inboundSchema,
      ]),
    ),
  ]);

/** @internal */
export type ChatCompletionAssistantMessageParamContent2$Outbound =
  | string
  | Array<
    | ChatCompletionContentPartTextParam$Outbound
    | ChatCompletionContentPartRefusalParam$Outbound
  >;

/** @internal */
export const ChatCompletionAssistantMessageParamContent2$outboundSchema:
  z.ZodType<
    ChatCompletionAssistantMessageParamContent2$Outbound,
    z.ZodTypeDef,
    ChatCompletionAssistantMessageParamContent2
  > = z.union([
    z.string(),
    z.array(
      z.union([
        ChatCompletionContentPartTextParam$outboundSchema,
        ChatCompletionContentPartRefusalParam$outboundSchema,
      ]),
    ),
  ]);

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ChatCompletionAssistantMessageParamContent2$ {
  /** @deprecated use `ChatCompletionAssistantMessageParamContent2$inboundSchema` instead. */
  export const inboundSchema =
    ChatCompletionAssistantMessageParamContent2$inboundSchema;
  /** @deprecated use `ChatCompletionAssistantMessageParamContent2$outboundSchema` instead. */
  export const outboundSchema =
    ChatCompletionAssistantMessageParamContent2$outboundSchema;
  /** @deprecated use `ChatCompletionAssistantMessageParamContent2$Outbound` instead. */
  export type Outbound = ChatCompletionAssistantMessageParamContent2$Outbound;
}

export function chatCompletionAssistantMessageParamContent2ToJSON(
  chatCompletionAssistantMessageParamContent2:
    ChatCompletionAssistantMessageParamContent2,
): string {
  return JSON.stringify(
    ChatCompletionAssistantMessageParamContent2$outboundSchema.parse(
      chatCompletionAssistantMessageParamContent2,
    ),
  );
}

export function chatCompletionAssistantMessageParamContent2FromJSON(
  jsonString: string,
): SafeParseResult<
  ChatCompletionAssistantMessageParamContent2,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      ChatCompletionAssistantMessageParamContent2$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'ChatCompletionAssistantMessageParamContent2' from JSON`,
  );
}

/** @internal */
export const ChatCompletionAssistantMessageParam$inboundSchema: z.ZodType<
  ChatCompletionAssistantMessageParam,
  z.ZodTypeDef,
  unknown
> = z.object({
  role: z.literal("assistant").default("assistant").optional(),
  audio: z.nullable(Audio$inboundSchema).optional(),
  content: z.nullable(
    z.union([
      z.string(),
      z.array(
        z.union([
          ChatCompletionContentPartTextParam$inboundSchema,
          ChatCompletionContentPartRefusalParam$inboundSchema,
        ]),
      ),
    ]),
  ).optional(),
  function_call: z.nullable(FunctionCallInput$inboundSchema).optional(),
  name: z.string().optional(),
  refusal: z.nullable(z.string()).optional(),
  tool_calls: z.array(ChatCompletionMessageToolCallParam$inboundSchema)
    .optional(),
}).transform((v) => {
  return remap$(v, {
    "function_call": "functionCall",
    "tool_calls": "toolCalls",
  });
});

/** @internal */
export type ChatCompletionAssistantMessageParam$Outbound = {
  role: "assistant";
  audio?: Audio$Outbound | null | undefined;
  content?:
    | string
    | Array<
      | ChatCompletionContentPartTextParam$Outbound
      | ChatCompletionContentPartRefusalParam$Outbound
    >
    | null
    | undefined;
  function_call?: FunctionCallInput$Outbound | null | undefined;
  name?: string | undefined;
  refusal?: string | null | undefined;
  tool_calls?: Array<ChatCompletionMessageToolCallParam$Outbound> | undefined;
};

/** @internal */
export const ChatCompletionAssistantMessageParam$outboundSchema: z.ZodType<
  ChatCompletionAssistantMessageParam$Outbound,
  z.ZodTypeDef,
  ChatCompletionAssistantMessageParam
> = z.object({
  role: z.literal("assistant").default("assistant" as const),
  audio: z.nullable(Audio$outboundSchema).optional(),
  content: z.nullable(
    z.union([
      z.string(),
      z.array(
        z.union([
          ChatCompletionContentPartTextParam$outboundSchema,
          ChatCompletionContentPartRefusalParam$outboundSchema,
        ]),
      ),
    ]),
  ).optional(),
  functionCall: z.nullable(FunctionCallInput$outboundSchema).optional(),
  name: z.string().optional(),
  refusal: z.nullable(z.string()).optional(),
  toolCalls: z.array(ChatCompletionMessageToolCallParam$outboundSchema)
    .optional(),
}).transform((v) => {
  return remap$(v, {
    functionCall: "function_call",
    toolCalls: "tool_calls",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ChatCompletionAssistantMessageParam$ {
  /** @deprecated use `ChatCompletionAssistantMessageParam$inboundSchema` instead. */
  export const inboundSchema =
    ChatCompletionAssistantMessageParam$inboundSchema;
  /** @deprecated use `ChatCompletionAssistantMessageParam$outboundSchema` instead. */
  export const outboundSchema =
    ChatCompletionAssistantMessageParam$outboundSchema;
  /** @deprecated use `ChatCompletionAssistantMessageParam$Outbound` instead. */
  export type Outbound = ChatCompletionAssistantMessageParam$Outbound;
}

export function chatCompletionAssistantMessageParamToJSON(
  chatCompletionAssistantMessageParam: ChatCompletionAssistantMessageParam,
): string {
  return JSON.stringify(
    ChatCompletionAssistantMessageParam$outboundSchema.parse(
      chatCompletionAssistantMessageParam,
    ),
  );
}

export function chatCompletionAssistantMessageParamFromJSON(
  jsonString: string,
): SafeParseResult<ChatCompletionAssistantMessageParam, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) =>
      ChatCompletionAssistantMessageParam$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ChatCompletionAssistantMessageParam' from JSON`,
  );
}
