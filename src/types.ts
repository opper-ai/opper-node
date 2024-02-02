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

export interface SSEStreamCallbacks {
    onMessage: (data: any) => void;
    onComplete: () => void;
    onError: (error: Error) => void;
    onCancel?: () => void;
}