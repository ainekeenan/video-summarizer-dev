import { Schema, model} from "mongoose";

interface Message{
    text: string;
    type: string;
}
const message_schema = new Schema <Message>({
    text:{ type: String, requried: true},
    type: {type: String, required: true}
},
{timestamps: true}
);

const Message = model<Message>('Message', message_schema);

export default Message;

