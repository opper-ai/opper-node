export interface Message {
    role: string;
    content: string;
}

export interface ChatPayload {
    messages: Message[];
}

export interface OpperResponse {
    message: string;
}