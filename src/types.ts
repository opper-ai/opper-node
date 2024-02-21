export type OpperAIOptions = {
  apiKey: string;
  isUsingAuthorization?: boolean;
};

export type OpperAIChatConversation = {
  role: string;
  content: string;
};

export interface OpperAIChat {
  path: string;
  message: string | OpperAIChatConversation[];
}

export interface OpperAISSEStreamCallbacks {
  controller?: AbortController | null;
  onMessage: (json: unknown) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

export interface OpperAIStream {
  path: string;
  message: string | OpperAIChatConversation[];
  callbacks: OpperAISSEStreamCallbacks;
}

export interface OpperAIChatResponse {
  message: string;
  context: unknown;
}

export type OpperAIIndexFileData = {
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

export type OpperAIIndex = {
  id: number;
  name: string;
  created_at: Date;
  files: OpperAIIndexFileData[];
};
