/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type Example = {
  input?: any | undefined;
  output?: any | undefined;
  comment?: string | null | undefined;
};

/** @internal */
export const Example$inboundSchema: z.ZodType<Example, z.ZodTypeDef, unknown> =
  z.object({
    input: z.any().optional(),
    output: z.any().optional(),
    comment: z.nullable(z.string()).optional(),
  });

/** @internal */
export type Example$Outbound = {
  input?: any | undefined;
  output?: any | undefined;
  comment?: string | null | undefined;
};

/** @internal */
export const Example$outboundSchema: z.ZodType<
  Example$Outbound,
  z.ZodTypeDef,
  Example
> = z.object({
  input: z.any().optional(),
  output: z.any().optional(),
  comment: z.nullable(z.string()).optional(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Example$ {
  /** @deprecated use `Example$inboundSchema` instead. */
  export const inboundSchema = Example$inboundSchema;
  /** @deprecated use `Example$outboundSchema` instead. */
  export const outboundSchema = Example$outboundSchema;
  /** @deprecated use `Example$Outbound` instead. */
  export type Outbound = Example$Outbound;
}

export function exampleToJSON(example: Example): string {
  return JSON.stringify(Example$outboundSchema.parse(example));
}

export function exampleFromJSON(
  jsonString: string,
): SafeParseResult<Example, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Example$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Example' from JSON`,
  );
}
