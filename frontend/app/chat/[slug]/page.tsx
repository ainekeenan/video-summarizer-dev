"use client";
import React, { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Input } from "@nextui-org/react";
import { SideBar } from "@/components/SideBar/SideBar";
import { NextUIProvider } from "@nextui-org/react";
import { TypeAnimation } from "react-type-animation";
import { SwapSections } from "./SwapSections"; // Import the SwapSections component
import Image from "next/image";
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { persistStore } from "redux-persist";

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
    persistStore(store);
    const userName = "User Name";
    return (
        <Provider store = {store}>
        <NextUIProvider>
            <main className="bg-[#181818]">
                <NavBar user={userName} email="user@ucdavis.edu" page={true} />
                <div className="flex justify-between">
                    <SideBar />
                    <div className="mx-5 flex content-center">
                        <div className="w-[75vw]">
                            <SwapSections />
                        </div>
                    </div>
                    <div className="DONT REMOVE LOL TO CENTER "></div>
                </div>
            </main>
        </NextUIProvider>
        </Provider>
    );
};

export default Chat;