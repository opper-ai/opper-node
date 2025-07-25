/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { OpperCore } from "../core.js";
import { encodeFormQuery } from "../lib/encodings.js";
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
 * List Knowledge Bases
 *
 * @remarks
 * List all knowledge bases for the current project
 */
export function knowledgeList(
  client: OpperCore,
  offset?: number | undefined,
  limit?: number | undefined,
  options?: RequestOptions,
): APIPromise<
  Result<
    models.PaginatedResponseListKnowledgeBasesResponse,
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
    offset,
    limit,
    options,
  ));
}

async function $do(
  client: OpperCore,
  offset?: number | undefined,
  limit?: number | undefined,
  options?: RequestOptions,
): Promise<
  [
    Result<
      models.PaginatedResponseListKnowledgeBasesResponse,
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
  const input: operations.ListKnowledgeBasesKnowledgeGetRequest = {
    offset: offset,
    limit: limit,
  };

  const parsed = safeParse(
    input,
    (value) =>
      operations.ListKnowledgeBasesKnowledgeGetRequest$outboundSchema.parse(
        value,
      ),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;

  const path = pathToFunc("/knowledge")();

  const query = encodeFormQuery({
    "limit": payload.limit,
    "offset": payload.offset,
  });

  const headers = new Headers(compactMap({
    Accept: "application/json",
  }));

  const secConfig = await extractSecurity(client._options.httpBearer);
  const securityInput = secConfig == null ? {} : { httpBearer: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    options: client._options,
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "list_knowledge_bases_knowledge_get",
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
    method: "GET",
    baseURL: options?.serverURL,
    path: path,
    headers: headers,
    query: query,
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
    models.PaginatedResponseListKnowledgeBasesResponse,
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
    M.json(
      200,
      models.PaginatedResponseListKnowledgeBasesResponse$inboundSchema,
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
