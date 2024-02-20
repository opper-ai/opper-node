export type OpperAiChatConversation = {
  role: string;
  content: string;
};

export interface OpperAiChat {
  path: string;
  message: string | OpperAiChatConversation[];
}

export interface OpperAiSSEStreamCallbacks {
  controller?: AbortController | null;
  onMessage: (json: unknown) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
}

export interface OpperAiStream {
  path: string;
  message: string | OpperAiChatConversation[];
  callbacks: OpperAiSSEStreamCallbacks;
}

export interface OpperAiChatResponse {
  message: string;
  context: unknown;
}
