"use client";
import { useParams } from 'next/navigation';
import React, { ReactElement } from "react";
import useSWR from 'swr';


const fetcher = async (url : string) => {
    const res = await fetch(url)
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        throw error
    }
    return res.json();
}

var base_url: string = "http://localhost:5001";

function Message ({ id } : any) {
    
    const { data, error, isLoading } = useSWR(base_url+"/message/"+id, fetcher);
    if (error) return(<div>Could not find message</div>);
    if (isLoading) return(<div>Loading...</div>);

    return(<div>{data.text}</div>)
}

export const Messages : React.FC = () => {
    const id = useParams().slug;
    console.log(base_url+"/chat/"+id);
    const { data, error, isLoading } = useSWR(base_url+"/chat/"+id, fetcher);
    console.log("err: " + error);
    if (error) return(<div>Could not load chat</div>);
    if (isLoading) return(<div>Loading...</div>);

    let str_data : string = JSON.stringify(data);
    let message_ids : string = JSON.parse(str_data).messages;
    let count : number = message_ids.length;
    var messages : ReactElement[] = [];
    for (let i = 0; i < count; i++) {
        messages.push(<Message id={message_ids[i]}/>)
    }

    return(<div>
    {messages}
    </div>);
};
