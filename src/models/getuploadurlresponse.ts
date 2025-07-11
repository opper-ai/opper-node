/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type GetUploadUrlResponse = {
  url: string;
  fields: { [k: string]: any };
  id: string;
};

/** @internal */
export const GetUploadUrlResponse$inboundSchema: z.ZodType<
  GetUploadUrlResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  url: z.string(),
  fields: z.record(z.any()),
  id: z.string(),
});

/** @internal */
export type GetUploadUrlResponse$Outbound = {
  url: string;
  fields: { [k: string]: any };
  id: string;
};

/** @internal */
export const GetUploadUrlResponse$outboundSchema: z.ZodType<
  GetUploadUrlResponse$Outbound,
  z.ZodTypeDef,
  GetUploadUrlResponse
> = z.object({
  url: z.string(),
  fields: z.record(z.any()),
  id: z.string(),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace GetUploadUrlResponse$ {
  /** @deprecated use `GetUploadUrlResponse$inboundSchema` instead. */
  export const inboundSchema = GetUploadUrlResponse$inboundSchema;
  /** @deprecated use `GetUploadUrlResponse$outboundSchema` instead. */
  export const outboundSchema = GetUploadUrlResponse$outboundSchema;
  /** @deprecated use `GetUploadUrlResponse$Outbound` instead. */
  export type Outbound = GetUploadUrlResponse$Outbound;
}

export function getUploadUrlResponseToJSON(
  getUploadUrlResponse: GetUploadUrlResponse,
): string {
  return JSON.stringify(
    GetUploadUrlResponse$outboundSchema.parse(getUploadUrlResponse),
  );
}

export function getUploadUrlResponseFromJSON(
  jsonString: string,
): SafeParseResult<GetUploadUrlResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => GetUploadUrlResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'GetUploadUrlResponse' from JSON`,
  );
}
