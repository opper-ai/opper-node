/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type OpenaiTypesChatCompletionCreateParamsFunction = {
  name: string;
  description?: string | undefined;
  parameters?: { [k: string]: any } | undefined;
};

/** @internal */
export const OpenaiTypesChatCompletionCreateParamsFunction$inboundSchema:
  z.ZodType<
    OpenaiTypesChatCompletionCreateParamsFunction,
    z.ZodTypeDef,
    unknown
  > = z.object({
    name: z.string(),
    description: z.string().optional(),
    parameters: z.record(z.any()).optional(),
  });

/** @internal */
export type OpenaiTypesChatCompletionCreateParamsFunction$Outbound = {
  name: string;
  description?: string | undefined;
  parameters?: { [k: string]: any } | undefined;
};

/** @internal */
export const OpenaiTypesChatCompletionCreateParamsFunction$outboundSchema:
  z.ZodType<
    OpenaiTypesChatCompletionCreateParamsFunction$Outbound,
    z.ZodTypeDef,
    OpenaiTypesChatCompletionCreateParamsFunction
  > = z.object({
    name: z.string(),
    description: z.string().optional(),
    parameters: z.record(z.any()).optional(),
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace OpenaiTypesChatCompletionCreateParamsFunction$ {
  /** @deprecated use `OpenaiTypesChatCompletionCreateParamsFunction$inboundSchema` instead. */
  export const inboundSchema =
    OpenaiTypesChatCompletionCreateParamsFunction$inboundSchema;
  /** @deprecated use `OpenaiTypesChatCompletionCreateParamsFunction$outboundSchema` instead. */
  export const outboundSchema =
    OpenaiTypesChatCompletionCreateParamsFunction$outboundSchema;
  /** @deprecated use `OpenaiTypesChatCompletionCreateParamsFunction$Outbound` instead. */
  export type Outbound = OpenaiTypesChatCompletionCreateParamsFunction$Outbound;
}

export function openaiTypesChatCompletionCreateParamsFunctionToJSON(
  openaiTypesChatCompletionCreateParamsFunction:
    OpenaiTypesChatCompletionCreateParamsFunction,
): string {
  return JSON.stringify(
    OpenaiTypesChatCompletionCreateParamsFunction$outboundSchema.parse(
      openaiTypesChatCompletionCreateParamsFunction,
    ),
  );
}

export function openaiTypesChatCompletionCreateParamsFunctionFromJSON(
  jsonString: string,
): SafeParseResult<
  OpenaiTypesChatCompletionCreateParamsFunction,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      OpenaiTypesChatCompletionCreateParamsFunction$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'OpenaiTypesChatCompletionCreateParamsFunction' from JSON`,
  );
}
