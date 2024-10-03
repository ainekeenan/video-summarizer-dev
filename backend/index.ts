import express, { Express, Request, Response } from "express";
import mongoose, {ConnectOptions}  from 'mongoose';
import message_router from './routes/message';
import chat_router from './routes/chat';
import user_router from './routes/user'
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();

const app: Express = express();
app.use(express.json())
app.use(cors());
const port = process.env.PORT || 5001; // default port is 5001
const uri = process.env.ATLAS_URI || "";

//database connection 
mongoose.connect(uri, {
    autoIndex: true
} as ConnectOptions);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("[database]: Mongoose database connection is established");
});

app.get("/", (_req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

//routes
app.use("/message", message_router);
app.use("/chat", chat_router);
app.use("/user", user_router);

app.listen(port, () => {
    console.log(`⚡[server]: Server is running at http://localhost:${port}`);
});
