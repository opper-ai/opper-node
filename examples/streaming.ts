import { config } from 'dotenv';
import { Message, ChatPayload, SSEStreamCallbacks } from 'opperai/types';
import { SSEClient } from 'opperai/ssestream';

config();
const sseClient = new SSEClient(process.env.OPPER_API_KEY);

const message: Message = {
    role: "user",
    content: "Hello world! This is a test message."
};

const payload: ChatPayload = {
    messages: [message]
};

const callbacks: SSEStreamCallbacks = {
    onMessage: (data: any) => {
        console.log('Received message:', data);
    },
    onComplete: () => {
        console.log('Stream completed.');
    },
    onError: (error: Error) => {
        console.error('Stream error:', error);
    },
    onCancel: () => {
        console.log('Stream cancelled.');
    }
};

sseClient.startStream("example", payload, callbacks)
    .catch(error => console.error('Error starting stream:', error));
