/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import {
  WebSearchOptionsUserLocationApproximate,
  WebSearchOptionsUserLocationApproximate$inboundSchema,
  WebSearchOptionsUserLocationApproximate$Outbound,
  WebSearchOptionsUserLocationApproximate$outboundSchema,
} from "./websearchoptionsuserlocationapproximate.js";

export type WebSearchOptionsUserLocation = {
  approximate: WebSearchOptionsUserLocationApproximate;
  type?: "approximate" | undefined;
};

/** @internal */
export const WebSearchOptionsUserLocation$inboundSchema: z.ZodType<
  WebSearchOptionsUserLocation,
  z.ZodTypeDef,
  unknown
> = z.object({
  approximate: WebSearchOptionsUserLocationApproximate$inboundSchema,
  type: z.literal("approximate").default("approximate").optional(),
});

/** @internal */
export type WebSearchOptionsUserLocation$Outbound = {
  approximate: WebSearchOptionsUserLocationApproximate$Outbound;
  type: "approximate";
};

/** @internal */
export const WebSearchOptionsUserLocation$outboundSchema: z.ZodType<
  WebSearchOptionsUserLocation$Outbound,
  z.ZodTypeDef,
  WebSearchOptionsUserLocation
> = z.object({
  approximate: WebSearchOptionsUserLocationApproximate$outboundSchema,
  type: z.literal("approximate").default("approximate" as const),
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace WebSearchOptionsUserLocation$ {
  /** @deprecated use `WebSearchOptionsUserLocation$inboundSchema` instead. */
  export const inboundSchema = WebSearchOptionsUserLocation$inboundSchema;
  /** @deprecated use `WebSearchOptionsUserLocation$outboundSchema` instead. */
  export const outboundSchema = WebSearchOptionsUserLocation$outboundSchema;
  /** @deprecated use `WebSearchOptionsUserLocation$Outbound` instead. */
  export type Outbound = WebSearchOptionsUserLocation$Outbound;
}

export function webSearchOptionsUserLocationToJSON(
  webSearchOptionsUserLocation: WebSearchOptionsUserLocation,
): string {
  return JSON.stringify(
    WebSearchOptionsUserLocation$outboundSchema.parse(
      webSearchOptionsUserLocation,
    ),
  );
}

export function webSearchOptionsUserLocationFromJSON(
  jsonString: string,
): SafeParseResult<WebSearchOptionsUserLocation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => WebSearchOptionsUserLocation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'WebSearchOptionsUserLocation' from JSON`,
  );
}
