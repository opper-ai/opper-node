/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { EventStream } from "../../lib/event-streams.js";
import { remap as remap$ } from "../../lib/primitives.js";
import { safeParse } from "../../lib/schemas.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as models from "../index.js";

export type StreamFunctionFunctionsFunctionIdCallStreamPostRequest = {
  /**
   * The id of the function to call
   */
  functionId: string;
  appApiPublicV2FunctionsCallFunctionRequest:
    models.AppApiPublicV2FunctionsCallFunctionRequest;
};

/**
 * The actual data payload containing streaming chunk information
 */
export type StreamFunctionFunctionsFunctionIdCallStreamPostData = {
  /**
   * Incremental text content generated by the model
   */
  delta?: string | undefined;
  /**
   * Unique identifier for the execution span
   */
  spanId?: string | undefined;
};

/**
 * Server-Sent Event following the SSE specification
 */
export type StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody = {
  /**
   * Event ID for the SSE event
   */
  id?: string | undefined;
  /**
   * Event type for the SSE event
   */
  event?: string | undefined;
  /**
   * The actual data payload containing streaming chunk information
   */
  data: StreamFunctionFunctionsFunctionIdCallStreamPostData;
  /**
   * Retry interval in milliseconds for the SSE connection
   */
  retry?: number | undefined;
};

export type StreamFunctionFunctionsFunctionIdCallStreamPostResponse = {
  headers: { [k: string]: Array<string> };
  result: EventStream<
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody
  >;
};

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostRequest$inboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest,
    z.ZodTypeDef,
    unknown
  > = z.object({
    function_id: z.string(),
    app__api__public__v2__functions__CallFunctionRequest:
      models.AppApiPublicV2FunctionsCallFunctionRequest$inboundSchema,
  }).transform((v) => {
    return remap$(v, {
      "function_id": "functionId",
      "app__api__public__v2__functions__CallFunctionRequest":
        "appApiPublicV2FunctionsCallFunctionRequest",
    });
  });

/** @internal */
export type StreamFunctionFunctionsFunctionIdCallStreamPostRequest$Outbound = {
  function_id: string;
  app__api__public__v2__functions__CallFunctionRequest:
    models.AppApiPublicV2FunctionsCallFunctionRequest$Outbound;
};

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostRequest$outboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest$Outbound,
    z.ZodTypeDef,
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest
  > = z.object({
    functionId: z.string(),
    appApiPublicV2FunctionsCallFunctionRequest:
      models.AppApiPublicV2FunctionsCallFunctionRequest$outboundSchema,
  }).transform((v) => {
    return remap$(v, {
      functionId: "function_id",
      appApiPublicV2FunctionsCallFunctionRequest:
        "app__api__public__v2__functions__CallFunctionRequest",
    });
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace StreamFunctionFunctionsFunctionIdCallStreamPostRequest$ {
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostRequest$inboundSchema` instead. */
  export const inboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest$inboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostRequest$outboundSchema` instead. */
  export const outboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest$outboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostRequest$Outbound` instead. */
  export type Outbound =
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest$Outbound;
}

export function streamFunctionFunctionsFunctionIdCallStreamPostRequestToJSON(
  streamFunctionFunctionsFunctionIdCallStreamPostRequest:
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest,
): string {
  return JSON.stringify(
    StreamFunctionFunctionsFunctionIdCallStreamPostRequest$outboundSchema.parse(
      streamFunctionFunctionsFunctionIdCallStreamPostRequest,
    ),
  );
}

export function streamFunctionFunctionsFunctionIdCallStreamPostRequestFromJSON(
  jsonString: string,
): SafeParseResult<
  StreamFunctionFunctionsFunctionIdCallStreamPostRequest,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      StreamFunctionFunctionsFunctionIdCallStreamPostRequest$inboundSchema
        .parse(JSON.parse(x)),
    `Failed to parse 'StreamFunctionFunctionsFunctionIdCallStreamPostRequest' from JSON`,
  );
}

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostData$inboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostData,
    z.ZodTypeDef,
    unknown
  > = z.object({
    delta: z.string().optional(),
    span_id: z.string().optional(),
  }).transform((v) => {
    return remap$(v, {
      "span_id": "spanId",
    });
  });

/** @internal */
export type StreamFunctionFunctionsFunctionIdCallStreamPostData$Outbound = {
  delta?: string | undefined;
  span_id?: string | undefined;
};

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostData$outboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostData$Outbound,
    z.ZodTypeDef,
    StreamFunctionFunctionsFunctionIdCallStreamPostData
  > = z.object({
    delta: z.string().optional(),
    spanId: z.string().optional(),
  }).transform((v) => {
    return remap$(v, {
      spanId: "span_id",
    });
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace StreamFunctionFunctionsFunctionIdCallStreamPostData$ {
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostData$inboundSchema` instead. */
  export const inboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostData$inboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostData$outboundSchema` instead. */
  export const outboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostData$outboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostData$Outbound` instead. */
  export type Outbound =
    StreamFunctionFunctionsFunctionIdCallStreamPostData$Outbound;
}

export function streamFunctionFunctionsFunctionIdCallStreamPostDataToJSON(
  streamFunctionFunctionsFunctionIdCallStreamPostData:
    StreamFunctionFunctionsFunctionIdCallStreamPostData,
): string {
  return JSON.stringify(
    StreamFunctionFunctionsFunctionIdCallStreamPostData$outboundSchema.parse(
      streamFunctionFunctionsFunctionIdCallStreamPostData,
    ),
  );
}

export function streamFunctionFunctionsFunctionIdCallStreamPostDataFromJSON(
  jsonString: string,
): SafeParseResult<
  StreamFunctionFunctionsFunctionIdCallStreamPostData,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      StreamFunctionFunctionsFunctionIdCallStreamPostData$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'StreamFunctionFunctionsFunctionIdCallStreamPostData' from JSON`,
  );
}

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$inboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody,
    z.ZodTypeDef,
    unknown
  > = z.object({
    id: z.string().optional(),
    event: z.string().optional(),
    data: z.string().transform((v, ctx) => {
      try {
        return JSON.parse(v);
      } catch (err) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `malformed json: ${err}`,
        });
        return z.NEVER;
      }
    }).pipe(
      z.lazy(() =>
        StreamFunctionFunctionsFunctionIdCallStreamPostData$inboundSchema
      ),
    ),
    retry: z.number().int().optional(),
  });

/** @internal */
export type StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$Outbound =
  {
    id?: string | undefined;
    event?: string | undefined;
    data: StreamFunctionFunctionsFunctionIdCallStreamPostData$Outbound;
    retry?: number | undefined;
  };

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$outboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$Outbound,
    z.ZodTypeDef,
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody
  > = z.object({
    id: z.string().optional(),
    event: z.string().optional(),
    data: z.lazy(() =>
      StreamFunctionFunctionsFunctionIdCallStreamPostData$outboundSchema
    ),
    retry: z.number().int().optional(),
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$ {
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$inboundSchema` instead. */
  export const inboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$inboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$outboundSchema` instead. */
  export const outboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$outboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$Outbound` instead. */
  export type Outbound =
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$Outbound;
}

export function streamFunctionFunctionsFunctionIdCallStreamPostResponseBodyToJSON(
  streamFunctionFunctionsFunctionIdCallStreamPostResponseBody:
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody,
): string {
  return JSON.stringify(
    StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$outboundSchema
      .parse(streamFunctionFunctionsFunctionIdCallStreamPostResponseBody),
  );
}

export function streamFunctionFunctionsFunctionIdCallStreamPostResponseBodyFromJSON(
  jsonString: string,
): SafeParseResult<
  StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$inboundSchema
        .parse(JSON.parse(x)),
    `Failed to parse 'StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody' from JSON`,
  );
}

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostResponse$inboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse,
    z.ZodTypeDef,
    unknown
  > = z.object({
    Headers: z.record(z.array(z.string())),
    Result: z.instanceof(ReadableStream<Uint8Array>).transform(stream => {
      return new EventStream({
        stream,
        decoder(rawEvent) {
          const schema = z.lazy(() =>
            StreamFunctionFunctionsFunctionIdCallStreamPostResponseBody$inboundSchema
          );
          return schema.parse(rawEvent);
        },
      });
    }),
  }).transform((v) => {
    return remap$(v, {
      "Headers": "headers",
      "Result": "result",
    });
  });

/** @internal */
export type StreamFunctionFunctionsFunctionIdCallStreamPostResponse$Outbound = {
  Headers: { [k: string]: Array<string> };
  Result: never;
};

/** @internal */
export const StreamFunctionFunctionsFunctionIdCallStreamPostResponse$outboundSchema:
  z.ZodType<
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse$Outbound,
    z.ZodTypeDef,
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse
  > = z.object({
    headers: z.record(z.array(z.string())),
    result: z.never(),
  }).transform((v) => {
    return remap$(v, {
      headers: "Headers",
      result: "Result",
    });
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace StreamFunctionFunctionsFunctionIdCallStreamPostResponse$ {
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostResponse$inboundSchema` instead. */
  export const inboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse$inboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostResponse$outboundSchema` instead. */
  export const outboundSchema =
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse$outboundSchema;
  /** @deprecated use `StreamFunctionFunctionsFunctionIdCallStreamPostResponse$Outbound` instead. */
  export type Outbound =
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse$Outbound;
}

export function streamFunctionFunctionsFunctionIdCallStreamPostResponseToJSON(
  streamFunctionFunctionsFunctionIdCallStreamPostResponse:
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse,
): string {
  return JSON.stringify(
    StreamFunctionFunctionsFunctionIdCallStreamPostResponse$outboundSchema
      .parse(streamFunctionFunctionsFunctionIdCallStreamPostResponse),
  );
}

export function streamFunctionFunctionsFunctionIdCallStreamPostResponseFromJSON(
  jsonString: string,
): SafeParseResult<
  StreamFunctionFunctionsFunctionIdCallStreamPostResponse,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      StreamFunctionFunctionsFunctionIdCallStreamPostResponse$inboundSchema
        .parse(JSON.parse(x)),
    `Failed to parse 'StreamFunctionFunctionsFunctionIdCallStreamPostResponse' from JSON`,
  );
}
