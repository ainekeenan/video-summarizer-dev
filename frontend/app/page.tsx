"use client";
import React from "react";
import { NavBar } from "@/components/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { SideBar } from "@/components/SideBar/SideBar";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from "redux-persist";
persistStore(store);

export default function Home() {
    const userName = "AK";

    return (
        <Provider store = {store}>
        <NextUIProvider>
            <main className="bg-[#181818]">
                <NavBar user={userName} email="user@ucdavis.edu" page={true} />
                <div className="flex h-screen items-center border-solid ">
                    <SideBar />
                    <div className="container flex flex-col items-center justify-center text-center">
                        <h1 className="from-39.2% via-102% to-102% background-animate bg-gradient-to-r from-[#00BB8E] via-[#1B209C] to-[#7C81FF] bg-clip-text py-4 text-6xl font-normal text-transparent">
                            Hi,
                        </h1>
                        <h1 className="pb-5 text-xl text-white ">
                            Create a chat, or click an existing one to begin
                        </h1>
                        {/* <SearchBar /> */}
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </main>
        </NextUIProvider>
        </Provider>
    );
}
