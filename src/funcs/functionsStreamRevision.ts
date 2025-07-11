/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { OpperCore } from "../core.js";
import { encodeJSON, encodeSimple } from "../lib/encodings.js";
import * as M from "../lib/matchers.js";
import { compactMap } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import * as errors from "../models/errors/index.js";
import { OpperError } from "../models/errors/oppererror.js";
import { ResponseValidationError } from "../models/errors/responsevalidationerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

/**
 * Stream Function Revision
 *
 * @remarks
 * Stream a function revision call execution in real-time using Server-Sent Events (SSE).
 *
 * This endpoint returns a continuous stream of Server-Sent Event objects as the function executes,
 * allowing for real-time streaming of responses. The response follows the Server-Sent Events
 * specification with proper event structure for SDK compatibility.
 *
 * Each Server-Sent Event contains:
 * - `id`: Optional event identifier
 * - `event`: Optional event type
 * - `data`: JSON payload with streaming chunk information
 * - `retry`: Optional retry interval
 *
 * The data payload includes:
 * - `delta`: Incremental text content (if any)
 * - `span_id`: Unique identifier for the execution span (when available)
 */
export function functionsStreamRevision(
  client: OpperCore,
  functionId: string,
  revisionId: string,
  appApiPublicV2FunctionsCallFunctionRequest:
    models.AppApiPublicV2FunctionsCallFunctionRequest,
  options?: RequestOptions,
): APIPromise<
  Result<
    operations.StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostResponse,
    | errors.BadRequestError
    | errors.UnauthorizedError
    | errors.NotFoundError
    | errors.RequestValidationError
    | OpperError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >
> {
  return new APIPromise($do(
    client,
    functionId,
    revisionId,
    appApiPublicV2FunctionsCallFunctionRequest,
    options,
  ));
}

async function $do(
  client: OpperCore,
  functionId: string,
  revisionId: string,
  appApiPublicV2FunctionsCallFunctionRequest:
    models.AppApiPublicV2FunctionsCallFunctionRequest,
  options?: RequestOptions,
): Promise<
  [
    Result<
      operations.StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostResponse,
      | errors.BadRequestError
      | errors.UnauthorizedError
      | errors.NotFoundError
      | errors.RequestValidationError
      | OpperError
      | ResponseValidationError
      | ConnectionError
      | RequestAbortedError
      | RequestTimeoutError
      | InvalidRequestError
      | UnexpectedClientError
      | SDKValidationError
    >,
    APICall,
  ]
> {
  const input:
    operations.StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostRequest =
      {
        functionId: functionId,
        revisionId: revisionId,
        appApiPublicV2FunctionsCallFunctionRequest:
          appApiPublicV2FunctionsCallFunctionRequest,
      };

  const parsed = safeParse(
    input,
    (value) =>
      operations
        .StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostRequest$outboundSchema
        .parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = encodeJSON(
    "body",
    payload.app__api__public__v2__functions__CallFunctionRequest,
    { explode: true },
  );

  const pathParams = {
    function_id: encodeSimple("function_id", payload.function_id, {
      explode: false,
      charEncoding: "percent",
    }),
    revision_id: encodeSimple("revision_id", payload.revision_id, {
      explode: false,
      charEncoding: "percent",
    }),
  };

  const path = pathToFunc("/functions/{function_id}/call/stream/{revision_id}")(
    pathParams,
  );

  const headers = new Headers(compactMap({
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  }));

  const secConfig = await extractSecurity(client._options.httpBearer);
  const securityInput = secConfig == null ? {} : { httpBearer: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID:
      "stream_function_revision_functions__function_id__call_stream__revision_id__post",
    oAuth2Scopes: [],

    resolvedSecurity: requestSecurity,

    securitySource: client._options.httpBearer,
    retryConfig: options?.retries
      || client._options.retryConfig
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    baseURL: options?.serverURL,
    path: path,
    headers: headers,
    body: body,
    userAgent: client._options.userAgent,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "404", "422", "4XX", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;

  const responseFields = {
    HttpMeta: { Response: response, Request: req },
  };

  const [result] = await M.match<
    operations.StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostResponse,
    | errors.BadRequestError
    | errors.UnauthorizedError
    | errors.NotFoundError
    | errors.RequestValidationError
    | OpperError
    | ResponseValidationError
    | ConnectionError
    | RequestAbortedError
    | RequestTimeoutError
    | InvalidRequestError
    | UnexpectedClientError
    | SDKValidationError
  >(
    M.sse(
      200,
      operations
        .StreamFunctionRevisionFunctionsFunctionIdCallStreamRevisionIdPostResponse$inboundSchema,
      { hdrs: true, key: "Result" },
    ),
    M.jsonErr(400, errors.BadRequestError$inboundSchema),
    M.jsonErr(401, errors.UnauthorizedError$inboundSchema),
    M.jsonErr(404, errors.NotFoundError$inboundSchema),
    M.jsonErr(422, errors.RequestValidationError$inboundSchema),
    M.fail("4XX"),
    M.fail("5XX"),
  )(response, req, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  return [result, { status: "complete", request: req, response }];
}
