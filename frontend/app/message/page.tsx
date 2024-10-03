"use client"
import { FormEvent, useEffect, useState } from "react";


export default function Message(){

    const [data, setData] = useState(null);


    const [chat_id, setChat] = useState(null);

   const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const type = formData.get("type") as string;
        const text = formData.get("text") as string;

        const submitdata = {
            type: type,
            text: text
        };

        try {
            const response = await fetch('http://localhost:5001/message', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitdata)
        })
        const responseData = await response.json();
        setData(responseData); }
        catch(error){
            console.error('Error fetching data:', error);
        }

        try{

        const message_id = data._id;
        console.log(message_id);
        const options = {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message_id : message_id, id : chat_id})
        }
        fetch("http://localhost:5001/chat/u",options).then(response => response.json()).then(json => console.log(json));
        }
        catch(error){
            console.error('Error fetching data:', error);
        } 
   }

    return(
        <main>
            <div>
                <h1>Message</h1>
                <p>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="text" id="text"/>
                    <input type="text" name="type" id="type"/>
                    <button type = "submit">Submit</button>
                </form>
            </div>
        </main>
    );
};
