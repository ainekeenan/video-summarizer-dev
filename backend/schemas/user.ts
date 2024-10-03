import { Schema, model } from "mongoose";

interface User {
    name: string;
    email: string;
    password: string;
    google: boolean;
    chats: Schema.Types.ObjectId[];
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    google:{
        type: Boolean,
        required: true
    },
    chats: [{
        type: Schema.Types.ObjectId
    }]
},
    { timestamps: true }
);


const User = model<User>('User', userSchema);
export default User;