"use client";
import Image from "next/image";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import { data } from "autoprefixer";
import { useRef, useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { useSignMessage } from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";
import Web3 from "web3";
export default function Home() {
  const { data: session, status } = useSession();
  const { open, close } = useWeb3Modal();
  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
    variables,
  } = useSignMessage();

  useEffect(() => {
    console.log(signMessageData);
  }, [signMessageData]);

  useEffect(() => {
    console.log(session);
  }, [session]);
  const API_BASE = "https://repporter-uij0.onrender.com/";

  const APICallerButton = () => {
    const ADDRESS = "0x71C9E62FA7293D43765692A408483B2fC7c7f0C6";
    const SIGNATURE = "yourSignatureForOAuth2Token";
    const OAUTH2_TOKEN = "yourOAuth2Token";
    const LINK_TYPE = "github";
    const LINK_VALUE = "vbuterin";

  useEffect(()=>{
    console.log(session)
  },[session])
  
  if(typeof window !== "undefined" && typeof window.ethereum !== 'undefined') {
    // Create a Web3 instance using the injected provider
    const web3 = new Web3(window.ethereum);
  
    // Request access to the user's wallet
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: any[]) => {
        const userAddress = accounts[0];
        console.log('User Address:', userAddress);
      })
      .catch((error: any) => {
        console.error(error);
      });
  } else {
    console.error('No web3 provider detected. Please install MetaMask or use a compatible browser.');
  }
  
    

    const addLink = async () => {
      const response = await fetch(`${API_BASE}/api/addlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: ADDRESS,
          signature: SIGNATURE,
          oauth2Token: OAUTH2_TOKEN,
          linkType: LINK_TYPE,
          linkValue: LINK_VALUE,
        }),
      });

      const data = await response.json();
      console.log("Add Link Response:", data);
    };

    const getLink = async () => {
      const response = await fetch(
        `${API_BASE}/api/getlink?address=${ADDRESS}&linkType=${LINK_TYPE}`
      );
      const data = await response.json();
      console.log("Get Link Response:", data);
    };

    const handleButtonClick = async () => {
      console.log("API CALLS EXAMPLE");
      await addLink();
      await getLink();
      console.log("End of API Calls");
    };

    return <button onClick={handleButtonClick}>Call APIs</button>;
  };

  return (
    <main className="p-12">
      <div className="flex justify-between items-center w-full p-4">
        <div className="wrapper">
          <div className="typing-demo text-3xl">Repporter</div>
        </div>

        <div className="flex justify-end items-center space-x-12">
          <a
            href="https://github.com/0xkkonrad/repporter/"
            target="blank"
            className="text-current"
          >
            <p>Repo</p>
          </a>
        </div>
      </div>

      <div className="flex w-full h-1/2 flex-wrap gap-2">
        <button
          className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert"
          onClick={() => signIn("github")}
        >
          Github
        </button>
        <button className="w-1/10 md:w-1/12 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center">
          +
        </button>
        <button
          onClick={() => open()}
          className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert"
        >
          Connect Wallet
        </button>
        <button className="w-1/10 md:w-1/12 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center">
          =
        </button>
        <button
          className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert"
          onClick={() =>
            signMessage({
              message: "DAS",
            })
          }
        >
          Sign
        </button>

        <APICallerButton />
      </div>

      {/* blobs */}
      <div className="blob-cont">
        <div className="yellow blob"></div>
        <div className="red blob"></div>
        <div className="green blob"></div>
      </div>
      {status === "authenticated" && (
        <button onClick={() => signOut()}>Sign out</button>
      )}
      {status === "authenticated" && <div>{session.email as string}</div>}
      {signMessageData && (
        <div className="bg-white text-black text-xl">
          <label>{signMessageData}</label>
        </div>
      )}
    </main>
  );
}
