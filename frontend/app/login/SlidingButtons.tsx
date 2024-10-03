"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Button } from "@nextui-org/react";
import { FormEvent, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// import { useDispatch, useSelector } from 'react-redux';
import { setChatIds } from '../redux/chatSlice';
import { useAppDispatch } from '../redux/store';

import { useRouter } from 'next/navigation'




interface HeadingProps {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const SELECTED_STYLES =
    "text-white font-medium rounded-lg py-2 w-[129px] relative";
const DESELECTED_STYLES =
    "font-medium rounded-lg py-2 w-[129px] transition-colors relative";

export const SlidingButtons: React.FC = () => {
    const [selected, setSelected] = useState<string>("login");

    return (
        <section className="mt-10">
            <Heading selected={selected} setSelected={setSelected} />
        </section>
    );
};

const Heading: React.FC<HeadingProps> = ({ selected, setSelected }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [use_google, setGoogle] = useState(false)
    const [user_data, setData] = useState("")
    
    const isLogin = selected === "login";
    const headingText = isLogin ? "Welcome back!" : "Create account!";
    const googleButtonText = isLogin
        ? "Sign in with Google"
        : "Sign up with Google";

        const handleSubmit = async() => {
            
            if(selected == "signup"){
                var submitData = {}
                if(use_google == true){
                    submitData = {name: name, email: email, google: use_google}
                }else{
                    submitData = {name: name, email: email, password: password, google: use_google};
                }
                try {
                    const response = await fetch('http://localhost:5001/user', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(submitData)
                    })
                    const data = await response.json();
                    console.log(data)
                    setData(data);
                    dispatch(setChatIds([]))
                    router.push('/')
                }
                catch(error){
                    console.error('Error fetching data:', error);
                }
            }
            else{
                var url = "";
                if(use_google == true){
                    url = `http://localhost:5001/user?email=${email}&google=${true}`;
                } else{
                    url = `http://localhost:5001/user?email=${email}&google=${use_google}&password=${password}`;
                }

                try{
                    const response = await fetch (url,{
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    const data = await response.json();
                    setData(data);
                    dispatch(setChatIds(data.chats? data.chats : []))
                    router.push('/')
                }
                catch(error){
                    console.error('Error getting data:', error);    
                }
                
            }
            // const chatIds = useSelector((state: RootState) => state.chat.chat_ids);
            // console.log(chatIds)
       }

       useEffect(() => {
    
        function handleCredentialResponse(response : any) {
          /* global google */
          // google loaded by script below
              console.log("Encoded JWT ID token: " + response.credential);
              var userObject = jwtDecode(response.credential)
              console.log(userObject)
              setEmail(email => userObject.email)
              setGoogle(use_google => userObject.email_verified)
              console.log("bookie")
              console.log(userObject.email)
              console.log(use_google)
              console.log(userObject.email_verified)
              console.log(email)
            }
            window.onload = function () {
              google.accounts.id.initialize({
                client_id: "28339494540-lc9gouc3fmun8a7e39b440hs3g3jae5a.apps.googleusercontent.com",
                callback: handleCredentialResponse
              });
              google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
              );
              google.accounts.id.prompt(); // also display the One Tap dialog
            }
         }, [])

         useEffect(() => {
            if(email != "" && use_google != false)
            handleSubmit()
         }, [email, use_google]);




    return (
        <div>
            <div className="relative z-10 w-[260px] rounded-[10px] bg-[#646464] px-2 py-2">
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={() => setSelected("login")}
                        className={
                            selected === "login"
                                ? SELECTED_STYLES
                                : DESELECTED_STYLES
                        }
                    >
                        Login
                        {selected === "login" && <BackgroundShift />}
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setSelected("signup")}
                            className={
                                selected === "signup"
                                    ? SELECTED_STYLES
                                    : DESELECTED_STYLES
                            }
                        >
                            Sign Up
                            {selected === "signup" && <BackgroundShift />}
                        </button>
                    </div>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.h1
                    key={headingText}
                    initial={
                        isLogin
                            ? { opacity: 0, x: "50%" }
                            : { opacity: 0, x: "-50%" }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                        isLogin
                            ? { opacity: 0, x: "-50%" }
                            : { opacity: 0, x: "50%" }
                    }
                    transition={{ type: "tween", duration: 0.4 }}
                    className="my-6 text-center text-3xl"
                >
                    {headingText}
                </motion.h1>
            </AnimatePresence>

            <div className="flex flex-col text-center">
                {selected === "signup" && (
                    <Input
                        isClearable
                        type="text"
                        placeholder="Name"
                        className="mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <Input
                    isClearable
                    type="email"
                    placeholder="Email"
                    className="mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    isClearable
                    type="password"
                    placeholder="Password"
                    className="mb-7"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-[5px] bg-[#7C81FF] text-white" onClick={() => handleSubmit()}>
                    Continue

                </Button>
                <div className="flex items-center py-3">
                    <div className="flex-1 border-t-2 border-gray-500"></div>
                    <span className="px-3 text-gray-500">Or</span>
                    <div className="flex-1 border-t-2 border-gray-500"></div>
                </div>
                <script src="https://accounts.google.com/gsi/client" async></script>
                <div id="buttonDiv" className = "w-[50px] h-[50px]" onClick={()=>handleSubmit()}></div>
            </div>
        </div>
        
    );
};

const BackgroundShift: React.FC = () => (
    <motion.span
        layoutId="bg-shift"
        className="absolute inset-0 -z-10 rounded-[7px] bg-[#00BB8E]"
    />
);