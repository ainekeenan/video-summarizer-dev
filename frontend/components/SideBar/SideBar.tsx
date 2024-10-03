import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import Link from 'next/link';
import { Summary } from "./Summary";
// import { useDispatch, useSelector } from 'react-redux';
import { addChatId } from '../../app/redux/chatSlice';
import { useAppDispatch, useAppSelector } from '../../app/redux/store';


type Chat = {
  id: string;
  title: string;
};

const generateChats = (): Chat[] => {
    //Will be mongoDB chats
    const ids = useAppSelector((state) => state.chat.chat_ids);
    return ids.map((id, index) => ({
        id: id,
        title: `Video #${index + 1}`
    }));
};
export const SideBar = () => {
    const [chats, setChats] = useState<Chat[]>(generateChats()); 
    const dispatch = useAppDispatch();
    
    // Will call from mongoDB
    const addChat = () => {
        console.log(chats)
        const newChat: Chat = {
            id: String(Math.floor(Math.random() * 100000)), 
            title: `Video #${chats.length + 1}`
        };
        dispatch(addChatId(newChat.id));
        setChats([...chats, newChat]);
        console.log(chats)
        console.log(newChat)
    };

    return (
        <div className="flex h-[100vh] justify-center bg-[#2B273F] text-white">
            <div className="mx-[5%] my-[15%] flex w-[250px] flex-col">
                <Button
                    className="rounded-[5px] bg-[#7C81FF] text-white"
                    onClick={addChat}
                >
                    New Chat
                </Button>
                <h1 className="mt-6 text-sm sm:text-lg">Recent Summaries:</h1>
                <div className="max-h-[70vh] overflow-y-auto">
                    {chats.map((chat) => (
                        <Link key={chat.id} href={`/chat/${chat.id}`}>
                                <Summary title={chat.title} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
