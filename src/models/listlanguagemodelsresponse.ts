/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";

export type ListLanguageModelsResponse = {
  /**
   * The hosting provider of the model
   */
  hostingProvider: string;
  /**
   * The name of the model
   */
  name: string;
  /**
   * The location of the model
   */
  location: string;
  /**
   * The cost in USD per token for input
   */
  inputCostPerToken?: number | null | undefined;
  /**
   * The cost in USD per token for output
   */
  outputCostPerToken?: number | null | undefined;
};

/** @internal */
export const ListLanguageModelsResponse$inboundSchema: z.ZodType<
  ListLanguageModelsResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  hosting_provider: z.string(),
  name: z.string(),
  location: z.string(),
  input_cost_per_token: z.nullable(z.number()).optional(),
  output_cost_per_token: z.nullable(z.number()).optional(),
}).transform((v) => {
  return remap$(v, {
    "hosting_provider": "hostingProvider",
    "input_cost_per_token": "inputCostPerToken",
    "output_cost_per_token": "outputCostPerToken",
  });
});

/** @internal */
export type ListLanguageModelsResponse$Outbound = {
  hosting_provider: string;
  name: string;
  location: string;
  input_cost_per_token?: number | null | undefined;
  output_cost_per_token?: number | null | undefined;
};

/** @internal */
export const ListLanguageModelsResponse$outboundSchema: z.ZodType<
  ListLanguageModelsResponse$Outbound,
  z.ZodTypeDef,
  ListLanguageModelsResponse
> = z.object({
  hostingProvider: z.string(),
  name: z.string(),
  location: z.string(),
  inputCostPerToken: z.nullable(z.number()).optional(),
  outputCostPerToken: z.nullable(z.number()).optional(),
}).transform((v) => {
  return remap$(v, {
    hostingProvider: "hosting_provider",
    inputCostPerToken: "input_cost_per_token",
    outputCostPerToken: "output_cost_per_token",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ListLanguageModelsResponse$ {
  /** @deprecated use `ListLanguageModelsResponse$inboundSchema` instead. */
  export const inboundSchema = ListLanguageModelsResponse$inboundSchema;
  /** @deprecated use `ListLanguageModelsResponse$outboundSchema` instead. */
  export const outboundSchema = ListLanguageModelsResponse$outboundSchema;
  /** @deprecated use `ListLanguageModelsResponse$Outbound` instead. */
  export type Outbound = ListLanguageModelsResponse$Outbound;
}

export function listLanguageModelsResponseToJSON(
  listLanguageModelsResponse: ListLanguageModelsResponse,
): string {
  return JSON.stringify(
    ListLanguageModelsResponse$outboundSchema.parse(listLanguageModelsResponse),
  );
}

export function listLanguageModelsResponseFromJSON(
  jsonString: string,
): SafeParseResult<ListLanguageModelsResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => ListLanguageModelsResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'ListLanguageModelsResponse' from JSON`,
  );
}
