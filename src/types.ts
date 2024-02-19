export type OpperAiChatConversation = {
  role: string;
  content: string;
};

export interface OpperAiChat {
  path: string;
  message: string | OpperAiChatConversation[];
}

export interface OpperAiChatResponse {
  message: string;
  context: unknown;
}
