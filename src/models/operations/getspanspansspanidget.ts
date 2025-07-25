/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";

export type GetSpanSpansSpanIdGetRequest = {
  /**
   * The ID of the span to get
   */
  spanId: string;
};

/** @internal */
export const GetSpanSpansSpanIdGetRequest$inboundSchema: z.ZodType<
  GetSpanSpansSpanIdGetRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  span_id: z.string(),
}).transform((v) => {
  return remap$(v, {
    "span_id": "spanId",
  });
});

/** @internal */
export type GetSpanSpansSpanIdGetRequest$Outbound = {
  span_id: string;
};

/** @internal */
export const GetSpanSpansSpanIdGetRequest$outboundSchema: z.ZodType<
  GetSpanSpansSpanIdGetRequest$Outbound,
  z.ZodTypeDef,
  GetSpanSpansSpanIdGetRequest
> = z.object({
  spanId: z.string(),
}).transform((v) => {
  return remap$(v, {
    spanId: "span_id",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetSpanSpansSpanIdGetRequest$ {
  /** @deprecated use `GetSpanSpansSpanIdGetRequest$inboundSchema` instead. */
  export const inboundSchema = GetSpanSpansSpanIdGetRequest$inboundSchema;
  /** @deprecated use `GetSpanSpansSpanIdGetRequest$outboundSchema` instead. */
  export const outboundSchema = GetSpanSpansSpanIdGetRequest$outboundSchema;
  /** @deprecated use `GetSpanSpansSpanIdGetRequest$Outbound` instead. */
  export type Outbound = GetSpanSpansSpanIdGetRequest$Outbound;
}

export function getSpanSpansSpanIdGetRequestToJSON(
  getSpanSpansSpanIdGetRequest: GetSpanSpansSpanIdGetRequest,
): string {
  return JSON.stringify(
    GetSpanSpansSpanIdGetRequest$outboundSchema.parse(
      getSpanSpansSpanIdGetRequest,
    ),
  );
}

export function getSpanSpansSpanIdGetRequestFromJSON(
  jsonString: string,
): SafeParseResult<GetSpanSpansSpanIdGetRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetSpanSpansSpanIdGetRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetSpanSpansSpanIdGetRequest' from JSON`,
  );
}
