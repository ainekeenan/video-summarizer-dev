import { Schema, model } from "mongoose";

interface Chat{
    title: String,
    link: String,
    messages : Array<Schema.Types.ObjectId>;
}

const chat_schema = new Schema <Chat>({
    title:{ type: String, requried: true},
    link: {type: String, required: true},
    messages: [{
        type: Schema.Types.ObjectId
    }]
},
{timestamps: true}
);

const Chat = model<Chat>('Chat', chat_schema);

export default Chat;
