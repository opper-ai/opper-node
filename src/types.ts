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
