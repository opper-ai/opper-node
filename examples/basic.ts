import { config } from 'dotenv';
import { Message, ChatPayload } from 'opperai/types';
import Client from 'opperai';

config();
const client = new Client(process.env.OPPER_API_KEY);

const message: Message = {
    role: "user",
    content: "Hello world! This is a test message."
};

const payload: ChatPayload = {
    messages: [message]
};

client.chat("example", payload)
    .then(response => console.log(response))
    .catch(error => console.error(error));
