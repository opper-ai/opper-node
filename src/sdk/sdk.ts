/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { call } from "../funcs/call.js";
import { stream } from "../funcs/stream.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import * as models from "../models/index.js";
import * as operations from "../models/operations/index.js";
import { unwrapAsync } from "../types/fp.js";
import { Analytics } from "./analytics.js";
import { Datasets } from "./datasets.js";
import { Embeddings } from "./embeddings.js";
import { Functions } from "./functions.js";
import { Knowledge } from "./knowledge.js";
import { LanguageModels } from "./languagemodels.js";
import { Openai } from "./openai.js";
import { SpanMetrics } from "./spanmetrics.js";
import { Spans } from "./spans.js";
import { Traces } from "./traces.js";

export class Opper extends ClientSDK {
  private _knowledge?: Knowledge;
  get knowledge(): Knowledge {
    return (this._knowledge ??= new Knowledge(this._options));
  }

  private _traces?: Traces;
  get traces(): Traces {
    return (this._traces ??= new Traces(this._options));
  }

  private _spans?: Spans;
  get spans(): Spans {
    return (this._spans ??= new Spans(this._options));
  }

  private _spanMetrics?: SpanMetrics;
  get spanMetrics(): SpanMetrics {
    return (this._spanMetrics ??= new SpanMetrics(this._options));
  }

  private _datasets?: Datasets;
  get datasets(): Datasets {
    return (this._datasets ??= new Datasets(this._options));
  }

  private _functions?: Functions;
  get functions(): Functions {
    return (this._functions ??= new Functions(this._options));
  }

  private _embeddings?: Embeddings;
  get embeddings(): Embeddings {
    return (this._embeddings ??= new Embeddings(this._options));
  }

  private _languageModels?: LanguageModels;
  get languageModels(): LanguageModels {
    return (this._languageModels ??= new LanguageModels(this._options));
  }

  private _openai?: Openai;
  get openai(): Openai {
    return (this._openai ??= new Openai(this._options));
  }

  private _analytics?: Analytics;
  get analytics(): Analytics {
    return (this._analytics ??= new Analytics(this._options));
  }

  /**
   * Function Call
   *
   * @remarks
   * The Call endpoint is a simple interface to issue a task to an LLM.
   * It is a declarative interface with input and output schemas that supports text, image, audio inputs and outputs and is highly model agnostic.
   */
  async call(
    request: models.AppApiPublicV2FunctionCallCallFunctionRequest,
    options?: RequestOptions,
  ): Promise<models.AppApiPublicV2FunctionCallCallFunctionResponse> {
    return unwrapAsync(call(
      this,
      request,
      options,
    ));
  }

  /**
   * Function Stream
   *
   * @remarks
   * Stream a function call execution in real-time using Server-Sent Events (SSE).
   *
   * This endpoint returns a continuous stream of ServerSentEvent objects as the function executes,
   * allowing for real-time streaming of responses. The response follows the Server-Sent Events
   * specification with proper event structure for SDK compatibility.
   *
   * Each ServerSentEvent contains:
   * - `id`: Optional event identifier
   * - `event`: Optional event type
   * - `data`: StreamingChunk with actual content
   * - `retry`: Optional retry interval
   *
   * The StreamingChunk data payload includes:
   * - `delta`: Incremental text content (if any)
   * - `span_id`: Unique identifier for the execution span (when available)
   *
   * Note: When streaming is enabled, any output_schema will be ignored as structured output
   * cannot be streamed. The response will be unstructured text content.
   */
  async stream(
    request: models.AppApiPublicV2FunctionCallCallFunctionRequest,
    options?: RequestOptions,
  ): Promise<operations.FunctionStreamCallStreamPostResponse> {
    return unwrapAsync(stream(
      this,
      request,
      options,
    ));
  }
}
