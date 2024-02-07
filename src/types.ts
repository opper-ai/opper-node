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

export interface FileMetadata {
    fileName: string;
}

export interface ContextData {
    datasetId: number;
    content: string;
    metadata?: FileMetadata | null;
}

// export interface StreamingChunk {
//     delta?: string | null;
//     error?: string | null;
//     context?: ContextData[] | null;
// }

export interface FunctionResponse {
    message?: string | null;
    jsonPayload?: any;
    error?: string | null;
    context?: ContextData[] | null;
}

export interface FunctionDescription {
    id?: number | null;
    path: string;
    description: string;
    inputSchema?: Record<string, any> | null;
    outputSchema?: Record<string, any> | null;
    instructions: string;
    datasetIds?: number[] | null;
}

export interface IndexDescription {
    id?: number | null;
    name: string;
    description: string;
    datasetIds?: number[] | null;
    functionIds?: number[] | null;
}

export interface IndexResponse {
    index: IndexDescription[];
}

