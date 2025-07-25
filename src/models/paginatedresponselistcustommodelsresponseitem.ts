/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import {
  ListCustomModelsResponseItem,
  ListCustomModelsResponseItem$inboundSchema,
  ListCustomModelsResponseItem$Outbound,
  ListCustomModelsResponseItem$outboundSchema,
} from "./listcustommodelsresponseitem.js";
import {
  Meta,
  Meta$inboundSchema,
  Meta$Outbound,
  Meta$outboundSchema,
} from "./meta.js";

export type PaginatedResponseListCustomModelsResponseItem = {
  meta: Meta;
  /**
   * List of items returned in the response
   */
  data: Array<ListCustomModelsResponseItem>;
};

/** @internal */
export const PaginatedResponseListCustomModelsResponseItem$inboundSchema:
  z.ZodType<
    PaginatedResponseListCustomModelsResponseItem,
    z.ZodTypeDef,
    unknown
  > = z.object({
    meta: Meta$inboundSchema,
    data: z.array(ListCustomModelsResponseItem$inboundSchema),
  });

/** @internal */
export type PaginatedResponseListCustomModelsResponseItem$Outbound = {
  meta: Meta$Outbound;
  data: Array<ListCustomModelsResponseItem$Outbound>;
};

/** @internal */
export const PaginatedResponseListCustomModelsResponseItem$outboundSchema:
  z.ZodType<
    PaginatedResponseListCustomModelsResponseItem$Outbound,
    z.ZodTypeDef,
    PaginatedResponseListCustomModelsResponseItem
  > = z.object({
    meta: Meta$outboundSchema,
    data: z.array(ListCustomModelsResponseItem$outboundSchema),
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PaginatedResponseListCustomModelsResponseItem$ {
  /** @deprecated use `PaginatedResponseListCustomModelsResponseItem$inboundSchema` instead. */
  export const inboundSchema =
    PaginatedResponseListCustomModelsResponseItem$inboundSchema;
  /** @deprecated use `PaginatedResponseListCustomModelsResponseItem$outboundSchema` instead. */
  export const outboundSchema =
    PaginatedResponseListCustomModelsResponseItem$outboundSchema;
  /** @deprecated use `PaginatedResponseListCustomModelsResponseItem$Outbound` instead. */
  export type Outbound = PaginatedResponseListCustomModelsResponseItem$Outbound;
}

export function paginatedResponseListCustomModelsResponseItemToJSON(
  paginatedResponseListCustomModelsResponseItem:
    PaginatedResponseListCustomModelsResponseItem,
): string {
  return JSON.stringify(
    PaginatedResponseListCustomModelsResponseItem$outboundSchema.parse(
      paginatedResponseListCustomModelsResponseItem,
    ),
  );
}

export function paginatedResponseListCustomModelsResponseItemFromJSON(
  jsonString: string,
): SafeParseResult<
  PaginatedResponseListCustomModelsResponseItem,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      PaginatedResponseListCustomModelsResponseItem$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'PaginatedResponseListCustomModelsResponseItem' from JSON`,
  );
}
