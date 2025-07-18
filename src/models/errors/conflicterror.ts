/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { OpperError } from "./oppererror.js";

export type ConflictErrorData = {
  type?: string;
  message?: string;
  /**
   * The detail of the error
   */
  detail?: any | undefined;
};

export class ConflictError extends OpperError {
  type?: string;
  /**
   * The detail of the error
   */
  detail?: any | undefined;

  /** The original data that was passed to this error instance. */
  data$: ConflictErrorData;

  constructor(
    err: ConflictErrorData,
    httpMeta: { response: Response; request: Request; body: string },
  ) {
    const message = "message" in err && typeof err.message === "string"
      ? err.message
      : `API error occurred: ${JSON.stringify(err)}`;
    super(message, httpMeta);
    this.data$ = err;
    if (err.type != null) this.type = err.type;
    if (err.detail != null) this.detail = err.detail;

    this.name = "ConflictError";
  }
}

/** @internal */
export const ConflictError$inboundSchema: z.ZodType<
  ConflictError,
  z.ZodTypeDef,
  unknown
> = z.object({
  type: z.string().default("ConflictError"),
  message: z.string().default("The resource already exists"),
  detail: z.any().optional(),
  request$: z.instanceof(Request),
  response$: z.instanceof(Response),
  body$: z.string(),
})
  .transform((v) => {
    return new ConflictError(v, {
      request: v.request$,
      response: v.response$,
      body: v.body$,
    });
  });

/** @internal */
export type ConflictError$Outbound = {
  type?: string;
  message?: string;
  detail?: any | undefined;
};

/** @internal */
export const ConflictError$outboundSchema: z.ZodType<
  ConflictError$Outbound,
  z.ZodTypeDef,
  ConflictError
> = z.instanceof(ConflictError)
  .transform(v => v.data$)
  .pipe(z.object({
    type: z.string().default("ConflictError"),
    message: z.string().default("The resource already exists"),
    detail: z.any().optional(),
  }));

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace ConflictError$ {
  /** @deprecated use `ConflictError$inboundSchema` instead. */
  export const inboundSchema = ConflictError$inboundSchema;
  /** @deprecated use `ConflictError$outboundSchema` instead. */
  export const outboundSchema = ConflictError$outboundSchema;
  /** @deprecated use `ConflictError$Outbound` instead. */
  export type Outbound = ConflictError$Outbound;
}
