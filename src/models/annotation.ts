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
import {
  AnnotationURLCitation,
  AnnotationURLCitation$inboundSchema,
  AnnotationURLCitation$Outbound,
  AnnotationURLCitation$outboundSchema,
} from "./annotationurlcitation.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type Annotation = {
  type?: "url_citation" | undefined;
  urlCitation: AnnotationURLCitation;
  additionalProperties?: { [k: string]: any };
};

/** @internal */
export const Annotation$inboundSchema: z.ZodType<
  Annotation,
  z.ZodTypeDef,
  unknown
> = collectExtraKeys$(
  z.object({
    type: z.literal("url_citation").default("url_citation").optional(),
    url_citation: AnnotationURLCitation$inboundSchema,
  }).catchall(z.any()),
  "additionalProperties",
  true,
).transform((v) => {
  return remap$(v, {
    "url_citation": "urlCitation",
  });
});

/** @internal */
export type Annotation$Outbound = {
  type: "url_citation";
  url_citation: AnnotationURLCitation$Outbound;
  [additionalProperties: string]: unknown;
};

/** @internal */
export const Annotation$outboundSchema: z.ZodType<
  Annotation$Outbound,
  z.ZodTypeDef,
  Annotation
> = z.object({
  type: z.literal("url_citation").default("url_citation" as const),
  urlCitation: AnnotationURLCitation$outboundSchema,
  additionalProperties: z.record(z.any()),
}).transform((v) => {
  return {
    ...v.additionalProperties,
    ...remap$(v, {
      urlCitation: "url_citation",
      additionalProperties: null,
    }),
  };
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace Annotation$ {
  /** @deprecated use `Annotation$inboundSchema` instead. */
  export const inboundSchema = Annotation$inboundSchema;
  /** @deprecated use `Annotation$outboundSchema` instead. */
  export const outboundSchema = Annotation$outboundSchema;
  /** @deprecated use `Annotation$Outbound` instead. */
  export type Outbound = Annotation$Outbound;
}

export function annotationToJSON(annotation: Annotation): string {
  return JSON.stringify(Annotation$outboundSchema.parse(annotation));
}

export function annotationFromJSON(
  jsonString: string,
): SafeParseResult<Annotation, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => Annotation$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'Annotation' from JSON`,
  );
}
