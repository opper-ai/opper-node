/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type GetSpanMetricResponse = {
  /**
   * The dimension of the metric
   */
  dimension: string;
  /**
   * The value of the metric
   */
  value: number;
  /**
   * A comment about the metric, e.g. a description of the metric
   */
  comment?: string | null | undefined;
  id: string;
  spanId: string;
  createdAt: Date;
};

/** @internal */
export const GetSpanMetricResponse$inboundSchema: z.ZodType<
  GetSpanMetricResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  dimension: z.string(),
  value: z.number(),
  comment: z.nullable(z.string()).optional(),
  id: z.string(),
  span_id: z.string(),
  created_at: z.string().datetime({ offset: true }).transform(v => new Date(v)),
}).transform((v) => {
  return remap$(v, {
    "span_id": "spanId",
    "created_at": "createdAt",
  });
});

/** @internal */
export type GetSpanMetricResponse$Outbound = {
  dimension: string;
  value: number;
  comment?: string | null | undefined;
  id: string;
  span_id: string;
  created_at: string;
};

/** @internal */
export const GetSpanMetricResponse$outboundSchema: z.ZodType<
  GetSpanMetricResponse$Outbound,
  z.ZodTypeDef,
  GetSpanMetricResponse
> = z.object({
  dimension: z.string(),
  value: z.number(),
  comment: z.nullable(z.string()).optional(),
  id: z.string(),
  spanId: z.string(),
  createdAt: z.date().transform(v => v.toISOString()),
}).transform((v) => {
  return remap$(v, {
    spanId: "span_id",
    createdAt: "created_at",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetSpanMetricResponse$ {
  /** @deprecated use `GetSpanMetricResponse$inboundSchema` instead. */
  export const inboundSchema = GetSpanMetricResponse$inboundSchema;
  /** @deprecated use `GetSpanMetricResponse$outboundSchema` instead. */
  export const outboundSchema = GetSpanMetricResponse$outboundSchema;
  /** @deprecated use `GetSpanMetricResponse$Outbound` instead. */
  export type Outbound = GetSpanMetricResponse$Outbound;
}

export function getSpanMetricResponseToJSON(
  getSpanMetricResponse: GetSpanMetricResponse,
): string {
  return JSON.stringify(
    GetSpanMetricResponse$outboundSchema.parse(getSpanMetricResponse),
  );
}

export function getSpanMetricResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetSpanMetricResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetSpanMetricResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetSpanMetricResponse' from JSON`,
  );
}
