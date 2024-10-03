"use client";
import React, { useEffect, useRef, useState } from "react";

export const SearchBar = () => {
    const [clicked, setClick] = useState<boolean>(false);

    /* Sets a referemce to div */
    const searchRef = useRef<HTMLDivElement>(null);

    /* Creates an event everytime there is an event mouseclick */
    useEffect(() => {
        document.addEventListener("mousedown", handleClickFalse);
        return () => {
            document.removeEventListener("mousedown", handleClickFalse);
        };
    }, []);

    /* If click is true setClick to true so dropdown shows */
    const handleClickTrue = () => {
        setClick(true);
    };

    /* Listens for click events if click is not on the search bar set the click to false */
    const handleClickFalse = (e: MouseEvent) => {
        if (
            searchRef.current &&
            !searchRef.current.contains(e.target as Node)
        ) {
            setClick(false);
        }
    };

    /* Adds ref to the div so it knows what we talking about */
    return (
        <div className="flex-row items-center" ref={searchRef}>
            <div className="relative w-[757px] min-w-[200px]">
                <input
                    onClick={handleClickTrue}
                    className="disabled:bg-blue-gray-50
                               peer
                               h-auto w-full rounded-[20px] border bg-transparent
                               px-3
                               py-3 text-sm font-normal
                               text-white placeholder-white shadow-md"
                    placeholder="Input YouTube link"
                />
            </div>
        </div>
    );
};
