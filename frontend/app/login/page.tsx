"use client";
import { NavBar } from "@/components/NavBar";
import { NextUIProvider } from "@nextui-org/react";
import { SlidingButtons } from "./SlidingButtons";
import logo from "/components/Images/logo_white.svg";
import { Provider } from 'react-redux';
import store from '../redux/store';
import { persistStore } from "redux-persist";
persistStore(store);

export default function Login() {
    return (
        <Provider store = {store}>
        <NextUIProvider>
            <NavBar user="" email="" page={false}/>
            <main className="flex min-h-screen items-center justify-center bg-[#2B273F] text-white">
                <div className="flex flex-col items-center">
                    <img className="w-full" src={logo.src} />
                    <SlidingButtons />
                </div>
            </main>
        </NextUIProvider>
        </Provider>
    );
}
