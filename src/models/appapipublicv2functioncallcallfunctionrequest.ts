/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { Result as SafeParseResult } from "../types/fp.js";
import { SDKValidationError } from "./errors/sdkvalidationerror.js";
import {
  Example,
  Example$inboundSchema,
  Example$Outbound,
  Example$outboundSchema,
} from "./example.js";
import {
  FunctionCallConfiguration,
  FunctionCallConfiguration$inboundSchema,
  FunctionCallConfiguration$Outbound,
  FunctionCallConfiguration$outboundSchema,
} from "./functioncallconfiguration.js";
import {
  TModel,
  TModel$inboundSchema,
  TModel$Outbound,
  TModel$outboundSchema,
} from "./tmodel.js";

export type AppApiPublicV2FunctionCallCallFunctionRequest = {
  /**
   * Provide a unique name of the task. A function with this name will be created in the project. Functions configuration is overridden by the request parameters.
   */
  name: string;
  /**
   * Optionally provide an instruction for the model to complete the task. Recommended to be concise and to the point
   */
  instructions?: string | null | undefined;
  /**
   * Optionally provide an input schema for the task. Can preferably include field descriptions to allow the model to reason about the input variables. Schema is validated against the input data and issues an error if it does not match. With the Opper SDKs you can define these schemas through libraries like Pydantic and Zod. For schemas with definitions, prefer using '$defs' and '#/$defs/...' references.
   */
  inputSchema?: { [k: string]: any } | null | undefined;
  /**
   * Optionally provide an output schema for the task. Response is guaranteed to match the schema or throw an error. Can preferably include field descriptions to allow the model to reason about the output variables. With the Opper SDKs you can define these schemas through libraries like Pydantic and Zod. For schemas with definitions, prefer using '$defs' and '#/$defs/...' references.
   */
  outputSchema?: { [k: string]: any } | null | undefined;
  /**
   * Optionally provide input data as context to complete the task. Could be a text, image, audio or a combination of these.
   */
  input?: any | null | undefined;
  model?: TModel | undefined;
  /**
   * Optionally provide examples of successful task completions. Will be added to the prompt to help the model understand the task from examples.
   */
  examples?: Array<Example> | null | undefined;
  /**
   * Optionally provide the parent span ID to add to the call event. This will automatically tie the call to a parent span in the UI.
   */
  parentSpanId?: string | null | undefined;
  /**
   * Optionally provide a list of tags to add to the call event. Useful for being able to understand aggregate analytics on some dimension.
   */
  tags?: { [k: string]: string } | null | undefined;
  /**
   * Optional configuration for the function.Configuration is a dictionary of key-value pairs that can be used to override the default configuration for the function.
   */
  configuration?: FunctionCallConfiguration | null | undefined;
};

/** @internal */
export const AppApiPublicV2FunctionCallCallFunctionRequest$inboundSchema:
  z.ZodType<
    AppApiPublicV2FunctionCallCallFunctionRequest,
    z.ZodTypeDef,
    unknown
  > = z.object({
    name: z.string(),
    instructions: z.nullable(z.string()).optional(),
    input_schema: z.nullable(z.record(z.any())).optional(),
    output_schema: z.nullable(z.record(z.any())).optional(),
    input: z.nullable(z.any()).optional(),
    model: TModel$inboundSchema.optional(),
    examples: z.nullable(z.array(Example$inboundSchema)).optional(),
    parent_span_id: z.nullable(z.string()).optional(),
    tags: z.nullable(z.record(z.string())).optional(),
    configuration: z.nullable(FunctionCallConfiguration$inboundSchema)
      .optional(),
  }).transform((v) => {
    return remap$(v, {
      "input_schema": "inputSchema",
      "output_schema": "outputSchema",
      "parent_span_id": "parentSpanId",
    });
  });

/** @internal */
export type AppApiPublicV2FunctionCallCallFunctionRequest$Outbound = {
  name: string;
  instructions?: string | null | undefined;
  input_schema?: { [k: string]: any } | null | undefined;
  output_schema?: { [k: string]: any } | null | undefined;
  input?: any | null | undefined;
  model?: TModel$Outbound | undefined;
  examples?: Array<Example$Outbound> | null | undefined;
  parent_span_id?: string | null | undefined;
  tags?: { [k: string]: string } | null | undefined;
  configuration?: FunctionCallConfiguration$Outbound | null | undefined;
};

/** @internal */
export const AppApiPublicV2FunctionCallCallFunctionRequest$outboundSchema:
  z.ZodType<
    AppApiPublicV2FunctionCallCallFunctionRequest$Outbound,
    z.ZodTypeDef,
    AppApiPublicV2FunctionCallCallFunctionRequest
  > = z.object({
    name: z.string(),
    instructions: z.nullable(z.string()).optional(),
    inputSchema: z.nullable(z.record(z.any())).optional(),
    outputSchema: z.nullable(z.record(z.any())).optional(),
    input: z.nullable(z.any()).optional(),
    model: TModel$outboundSchema.optional(),
    examples: z.nullable(z.array(Example$outboundSchema)).optional(),
    parentSpanId: z.nullable(z.string()).optional(),
    tags: z.nullable(z.record(z.string())).optional(),
    configuration: z.nullable(FunctionCallConfiguration$outboundSchema)
      .optional(),
  }).transform((v) => {
    return remap$(v, {
      inputSchema: "input_schema",
      outputSchema: "output_schema",
      parentSpanId: "parent_span_id",
    });
  });

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace AppApiPublicV2FunctionCallCallFunctionRequest$ {
  /** @deprecated use `AppApiPublicV2FunctionCallCallFunctionRequest$inboundSchema` instead. */
  export const inboundSchema =
    AppApiPublicV2FunctionCallCallFunctionRequest$inboundSchema;
  /** @deprecated use `AppApiPublicV2FunctionCallCallFunctionRequest$outboundSchema` instead. */
  export const outboundSchema =
    AppApiPublicV2FunctionCallCallFunctionRequest$outboundSchema;
  /** @deprecated use `AppApiPublicV2FunctionCallCallFunctionRequest$Outbound` instead. */
  export type Outbound = AppApiPublicV2FunctionCallCallFunctionRequest$Outbound;
}

export function appApiPublicV2FunctionCallCallFunctionRequestToJSON(
  appApiPublicV2FunctionCallCallFunctionRequest:
    AppApiPublicV2FunctionCallCallFunctionRequest,
): string {
  return JSON.stringify(
    AppApiPublicV2FunctionCallCallFunctionRequest$outboundSchema.parse(
      appApiPublicV2FunctionCallCallFunctionRequest,
    ),
  );
}

export function appApiPublicV2FunctionCallCallFunctionRequestFromJSON(
  jsonString: string,
): SafeParseResult<
  AppApiPublicV2FunctionCallCallFunctionRequest,
  SDKValidationError
> {
  return safeParse(
    jsonString,
    (x) =>
      AppApiPublicV2FunctionCallCallFunctionRequest$inboundSchema.parse(
        JSON.parse(x),
      ),
    `Failed to parse 'AppApiPublicV2FunctionCallCallFunctionRequest' from JSON`,
  );
}
