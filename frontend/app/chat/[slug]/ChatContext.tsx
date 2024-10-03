import React, {
    createContext,
    useContext,
    useCallback,
    ReactNode,
} from "react";

import useState from 'react-usestateref'

interface ChatData {
    summary: string;
    summaries: string[];
    transcript: string;
    userMessage: string[];
}

interface ChatContextType {
    data: ChatData;
    fetchData: (youtubeLink: string) => Promise<void>;
    loading: boolean;
}

const ChatDataContext = createContext<ChatContextType | undefined>(undefined);

export const useChatData = () => {
    const context = useContext(ChatDataContext);
    if (!context) {
        throw new Error("useChatData must be used within a ChatDataProvider");
    }
    return context;
};

interface ChatDataProviderProps {
    children: ReactNode;
}

export const ChatDataProvider: React.FC<ChatDataProviderProps> = ({
    children,
}) => {
    const [data, setData, latestData] = useState<ChatData>({
        summary: "Enter Youtube link in chat box.", // Initial placeholder summary
        summaries: [],
        transcript: "Go back and enter a link.", // Initially empty
        userMessage: [], // Initially empty
    });
    const [loading, setLoading] = useState(false);
    let transcript: string = data.transcript;

    const fetchData = useCallback(async (youtubeLink: string) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    "youtubeLink": youtubeLink,
                    "usermsg": latestData.current.userMessage,
                    "modelmsg": latestData.current.summaries,
                }),
            });

            if (response.ok) {
                const json = await response.json()
                setData((prevData) => {
                    const newSummaries = [
                        ...prevData.summaries,
                        json.summary || "No summary available.",
                    ];

                    return {
                        ...prevData,
                        summary: json.summary || "No summary available.",
                        summaries: newSummaries,
                        transcript:
                            prevData.transcript === "Go back and enter a link."
                                ? json.transcript || "No transcript available."
                                : json.transcript,
                        userMessage: [...prevData.userMessage, youtubeLink],
                    };
                });
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <ChatDataContext.Provider
            value={{ data: { ...data, transcript }, fetchData, loading }}
        >
            {children}
        </ChatDataContext.Provider>
    );
};

export default ChatDataProvider;
