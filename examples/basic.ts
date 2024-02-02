import { config } from 'dotenv';
import { types } from 'opperai';
import Client from 'opperai';

config();
const client = new Client(process.env.OPPER_API_KEY);

const message: types.Message = {
    role: "user",
    content: "Hello world! This is a test message."
};

const payload: types.ChatPayload = {
    messages: [message]
};

client.chat("example", payload)
    .then(response => console.log(response))
    .catch(error => console.error(error));
