"use client"
import { FormEvent, useEffect, useState } from "react";
import Script from 'next/script'
import { useRef } from 'react'
import { jwtDecode } from "jwt-decode";

export default function User() {

  const handleSubmit = async() => {
    console.log("handle submit")
  }
  useEffect(() => {
    
    function handleCredentialResponse(response : any) {
      /* global google */
      // google loaded by script below
          console.log("Encoded JWT ID token: " + response.credential);
          var userObject = jwtDecode(response.credential)
          console.log(userObject)
          console.log("hi bae")
          console.log(userObject.email)
          console.log(userObject.email_verified)
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

  return (
    <main>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div id="buttonDiv" className = "w-[50px] h-[50px]"></div>
    </main>
  );
};
