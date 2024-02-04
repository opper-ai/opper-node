import { config } from 'dotenv';
import { types, ssestream } from 'opperai';

config();
const sseClient = new ssestream.SSEClient(process.env.OPPER_API_KEY);

const message: types.Message = {
    role: "user",
    content: "Hello world! This is a test message."
};

const payload: types.ChatPayload = {
    messages: [message]
};

const callbacks: types.SSEStreamCallbacks = {
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
