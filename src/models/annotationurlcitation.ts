/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import {
  collectExtraKeys as collectExtraKeys$,
  safeParse,
} from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type AnnotationURLCitation = {
  endIndex: number;
  startIndex: number;
  title: string;
  url: string;
  additionalProperties?: { [k: string]: any };
};

/** @internal */
export const AnnotationURLCitation$inboundSchema: z.ZodType<
  AnnotationURLCitation,
  z.ZodTypeDef,
  unknown
> = collectExtraKeys$(
  z.object({
    end_index: z.number().int(),
    start_index: z.number().int(),
    title: z.string(),
    url: z.string(),
  }).catchall(z.any()),
  "additionalProperties",
  true,
).transform((v) => {
  return remap$(v, {
    "end_index": "endIndex",
    "start_index": "startIndex",
  });
});

/** @internal */
export type AnnotationURLCitation$Outbound = {
  end_index: number;
  start_index: number;
  title: string;
  url: string;
  [additionalProperties: string]: unknown;
};

/** @internal */
export const AnnotationURLCitation$outboundSchema: z.ZodType<
  AnnotationURLCitation$Outbound,
  z.ZodTypeDef,
  AnnotationURLCitation
> = z.object({
  endIndex: z.number().int(),
  startIndex: z.number().int(),
  title: z.string(),
  url: z.string(),
  additionalProperties: z.record(z.any()),
}).transform((v) => {
  return {
    ...v.additionalProperties,
    ...remap$(v, {
      endIndex: "end_index",
      startIndex: "start_index",
      additionalProperties: null,
    }),
  };
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace AnnotationURLCitation$ {
  /** @deprecated use `AnnotationURLCitation$inboundSchema` instead. */
  export const inboundSchema = AnnotationURLCitation$inboundSchema;
  /** @deprecated use `AnnotationURLCitation$outboundSchema` instead. */
  export const outboundSchema = AnnotationURLCitation$outboundSchema;
  /** @deprecated use `AnnotationURLCitation$Outbound` instead. */
  export type Outbound = AnnotationURLCitation$Outbound;
}

export function annotationURLCitationToJSON(
  annotationURLCitation: AnnotationURLCitation,
): string {
  return JSON.stringify(
    AnnotationURLCitation$outboundSchema.parse(annotationURLCitation),
  );
}

export function annotationURLCitationFromJSON(
  jsonString: string,
): SafeParseResult<AnnotationURLCitation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => AnnotationURLCitation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'AnnotationURLCitation' from JSON`,
  );
}
