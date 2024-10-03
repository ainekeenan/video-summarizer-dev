import React, { useState, useEffect } from "react";
import { useChatData } from "./ChatContext";
import { Input, Avatar } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";
import { Messages } from "./ChatRetrive"
import Image from "next/image";

export const ChatResponse: React.FC = () => {
    const { data, fetchData, loading } = useChatData();
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await fetchData(inputValue);
        setInputValue("");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="chat-container flex h-full flex-col">
            <div className="px-4 py-2">
                <div className="mb-4 h-[65vh] overflow-y-auto">
                {/*Right now I've replaced Ben's <ChatDialogue/>  with the Messages component
                this will load the messages, but not sure how to combine the two*/}
                {/* <Messages /> */}
                <ChatDialogue />
                </div>
            </div>
            <div className="bg-[#181818] px-4 py-2">
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        radius="sm"
                        className="mb-4 w-full"
                        placeholder="Enter YouTube Link or question..."
                    />
                    <button type="submit" style={{ display: "none" }} />
                </form>
            </div>
        </div>
    );
};

// Combines the user and AI chat logs
const ChatDialogue: React.FC = () => {
    const { data } = useChatData();
    // Combine user messages into a single array of chat logs
    const chatLogs = data.userMessage.flatMap((userMsg, index) => [
        { type: "user", message: userMsg },
        { type: "ai", message: data.summaries[index] },
    ]);

    console.log(chatLogs);
    return (
        <div>
            {chatLogs.map((chat, index) => (
                <div key={index} className="mb-4">
                    {chat.type === "user" ? (
                        <div>
                            <div className="ml-2 mt-2 flex flex-row space-x-5">
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    name={"User Name"}
                                    size="md"
                                />
                                <h1 className="text-2xl">User Name</h1>
                            </div>
                            <h1 className="rounded-lg p-3 text-lg">
                                {chat.message}
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-row space-x-5">
                            <Image
                                alt="logo"
                                src="/logo.svg"
                                width={50}
                                height={50}
                            />
                            <h1 className="text-2xl">SummarizIT</h1>
                        </div>
                    )}
                    {chat.type === "ai" && index === chatLogs.length - 1 ? (
                        // If last AI message use animated
                        <h1 className="rounded-lg p-3 text-lg">
                            <TypeAnimation
                                splitter={(str) => str.split(/(?= )/)}
                                sequence={[chat.message, 2000]}
                                wrapper="div"
                                cursor={false}
                                speed={{
                                    type: "keyStrokeDelayInMs",
                                    value: 50,
                                }}
                                repeat={0}
                            />
                        </h1>
                    ) : (
                        // For all others display normally
                        chat.type === "ai" && (
                            <h1 className="rounded-lg p-3 text-lg">
                                {chat.message}
                            </h1>
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export const TranscriptResponse: React.FC = () => {
    const { data } = useChatData();
    return (
        <div className="mt-4 max-h-[70vh] w-full overflow-y-auto rounded-[10px] bg-white">
            <h1 className="p-5 text-xl text-black">
                <TypeAnimation
                    splitter={(str) => str.split(/(?= )/)}
                    sequence={[data.transcript]}
                    speed={{ type: "keyStrokeDelayInMs", value: 10 }}
                    cursor={false}
                />
            </h1>
        </div>
    );
};
