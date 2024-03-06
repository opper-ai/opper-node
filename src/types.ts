export type Options = {
  /**
   * OpperAI [API key](https://docs.opper.ai/api-keys)
   */
  apiKey: string;

  /**
   * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
   */
  dangerouslyAllowBrowser?: boolean;

  /**
   * Override the base url if needed
   * Defaults to https://api.opper.ai
   */
  baseURL?: string;

  isUsingAuthorization?: boolean;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export interface Chat {
  path: string;
  message: string | Message[];
}

export interface SSEStreamCallbacks {
  controller?: AbortController | null;
  onMessage: (json: unknown) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

export interface OpperAIStream {
  path: string;
  message: string | Message[];
  callbacks: SSEStreamCallbacks;
}

export interface OpperAIChatResponse {
  message: string;
  context: unknown;
}

export type IndexFileData = {
  id: number;
  original_filename: string;
  size: number;
  index_status:
  | 'init'
  | 'pending'
  | 'uploading'
  | 'indexing'
  | 'success'
  | 'indexed'
  | 'error'
  | 'failed'
  | 'invalid';
  n_vectors: number;
};

export type Index = {
  id: number;
  name: string;
  created_at: Date;
  files: IndexFileData[];
};

export type Document = {
  id?: string;
  key?: string; // a unique key that one can use if you want to update the document
  content: string;
  metadata: Record<string, unknown>;
}
export type Function = {
  id?: number;
  path: string;
  description: string;
  instructions: string;
  model: string;
  index_ids: number[];
}

export type Event = {
  uuid?: string;
  project?: string;
  name?: string;
  input?: string;
  output?: string;
  start_time?: Date;
  parent_uuid?: string;
  end_time?: Date;
  error?: string;
  meta?: Record<string, unknown>;
  evaluations?: Record<string, unknown>;
  score?: number;
};
