/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import {
  ExampleIn,
  ExampleIn$inboundSchema,
  ExampleIn$Outbound,
  ExampleIn$outboundSchema,
} from "./examplein.js";

export type AppApiPublicV2FunctionsCallFunctionRequest = {
  /**
   * Input to the function
   */
  input?: any | null | undefined;
  parentSpanId?: string | null | undefined;
  examples?: Array<ExampleIn> | null | undefined;
  /**
   * Tags to add to the call event
   */
  tags?: { [k: string]: string } | null | undefined;
};

/** @internal */
export const AppApiPublicV2FunctionsCallFunctionRequest$inboundSchema:
  z.ZodType<AppApiPublicV2FunctionsCallFunctionRequest, z.ZodTypeDef, unknown> =
    z.object({
      input: z.nullable(z.any()).optional(),
      parent_span_id: z.nullable(z.string()).optional(),
      examples: z.nullable(z.array(ExampleIn$inboundSchema)).optional(),
      tags: z.nullable(z.record(z.string())).optional(),
    }).transform((v) => {
      return remap$(v, {
        "parent_span_id": "parentSpanId",
      });
    });

/** @internal */
export type AppApiPublicV2FunctionsCallFunctionRequest$Outbound = {
  input?: any | null | undefined;
  parent_span_id?: string | null | undefined;
  examples?: Array<ExampleIn$Outbound> | null | undefined;
  tags?: { [k: string]: string } | null | undefined;
};

/** @internal */
export const AppApiPublicV2FunctionsCallFunctionRequest$outboundSchema:
  z.ZodType<
    AppApiPublicV2FunctionsCallFunctionRequest$Outbound,
    z.ZodTypeDef,
    AppApiPublicV2FunctionsCallFunctionRequest
  > = z.object({
    input: z.nullable(z.any()).optional(),
    parentSpanId: z.nullable(z.string()).optional(),
    examples: z.nullable(z.array(ExampleIn$outboundSchema)).optional(),
    tags: z.nullable(z.record(z.string())).optional(),
  }).transform((v) => {
    return remap$(v, {
      parentSpanId: "parent_span_id",
    });
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace AppApiPublicV2FunctionsCallFunctionRequest$ {
  /** @deprecated use `AppApiPublicV2FunctionsCallFunctionRequest$inboundSchema` instead. */
  export const inboundSchema =
    AppApiPublicV2FunctionsCallFunctionRequest$inboundSchema;
  /** @deprecated use `AppApiPublicV2FunctionsCallFunctionRequest$outboundSchema` instead. */
  export const outboundSchema =
    AppApiPublicV2FunctionsCallFunctionRequest$outboundSchema;
  /** @deprecated use `AppApiPublicV2FunctionsCallFunctionRequest$Outbound` instead. */
  export type Outbound = AppApiPublicV2FunctionsCallFunctionRequest$Outbound;
}

export function appApiPublicV2FunctionsCallFunctionRequestToJSON(
  appApiPublicV2FunctionsCallFunctionRequest:
    AppApiPublicV2FunctionsCallFunctionRequest,
): string {
  return JSON.stringify(
    AppApiPublicV2FunctionsCallFunctionRequest$outboundSchema.parse(
      appApiPublicV2FunctionsCallFunctionRequest,
    ),
  );
}

export function appApiPublicV2FunctionsCallFunctionRequestFromJSON(
  jsonString: string,
): SafeParseResult<
  AppApiPublicV2FunctionsCallFunctionRequest,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      AppApiPublicV2FunctionsCallFunctionRequest$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'AppApiPublicV2FunctionsCallFunctionRequest' from JSON`,
  );
}
