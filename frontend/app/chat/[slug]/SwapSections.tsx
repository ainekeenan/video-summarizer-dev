// MOST IMPORTANT !!! Calls functions from Frontend calls to be displayed using the buttons
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatResponse } from "./FrontendCalls";
import { TranscriptResponse } from "./FrontendCalls";
import { ChatDataProvider } from "./ChatContext";

// Define styles for selected and deselected tabs
const SELECTED_STYLES =
    "text-white font-medium rounded-lg py-2 relative w-[540px]";
const DESELECTED_STYLES =
    "text-white font-medium rounded-lg py-2 transition-colors relative w-[540px]";

// Main component to manage the swapping between sections
export const SwapSections: React.FC = () => {
    // State to track which section is currently selected
    const [selected, setSelected] = useState<string>("chat");
    return (
        <section className="mt-10">
            <Heading selected={selected} setSelected={setSelected} />
            <ContentDisplay selected={selected} />
        </section>
    );
};

// Props interface to ensure type safety for Heading component
interface HeadingProps {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

// Component for rendering the tab headings
const Heading: React.FC<HeadingProps> = ({ selected, setSelected }) => {
    return (
        <div className="relative z-10  mb-5 rounded-[5px] bg-[#2B273F] px-2 py-2">
            <div className="flex items-center justify-center gap-3">
                {/* Buttons to select between Chat and Transcript */}
                <button
                    onClick={() => setSelected("chat")}
                    className={
                        selected === "chat"
                            ? SELECTED_STYLES
                            : DESELECTED_STYLES
                    }
                >
                    Chat
                    {selected === "chat" && <BackgroundShift />}
                </button>
                <button
                    onClick={() => setSelected("transcript")}
                    className={
                        selected === "transcript"
                            ? SELECTED_STYLES
                            : DESELECTED_STYLES
                    }
                >
                    Transcript
                    {selected === "transcript" && <BackgroundShift />}
                </button>
            </div>
        </div>
    );
};

// Component to render the background shift animation for the active tab
const BackgroundShift: React.FC = () => (
    <motion.span
        layoutId="bg-shift"
        className="absolute inset-0 -z-10 rounded-[4px] bg-[#463090]"
    />
);

// Component to display content based on the selected section with fade transitions
const ContentDisplay: React.FC<{ selected: string }> = ({ selected }) => {
    return (
        <ChatDataProvider>
            <AnimatePresence mode="wait">
                <motion.div
                    key={selected}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Conditional rendering based on selected section */}
                    {selected === "chat" ? (
                        <div className="text-white">
                            <ChatResponse />
                        </div>
                    ) : (
                        <div className="text-white">
                            <TranscriptResponse />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </ChatDataProvider>
    );
};
