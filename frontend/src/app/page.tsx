"use client";
import Image from "next/image";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import { data } from "autoprefixer";
import { useRef, useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { useSignMessage } from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";

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

  return (
    <main className="p-12">
      <div className="flex justify-between items-center w-full p-4">
        <h1 className="text-3xl">Repporter</h1>

        <div className="flex justify-end items-center space-x-12">
          <a href="/about-us" className="text-current">
            <p>About us</p>
          </a>
          <a href="/our-mission" className="text-current">
            <p>Our Mission</p>
          </a>
          <a href="/contact-us" className="text-current">
            <p>Contact us</p>
          </a>
        </div>

        
      </div> 

      <div className="flex w-full h-1/2 flex-wrap gap-2">
        <button className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert" onClick={() => signIn("github")}>
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
        <button className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert">
          <form
            className=""
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target as HTMLFormElement);
              const message = formData.get("message") as string;
              signMessage({
                message: message,
              });
            }}
          >
            <button>Sign</button>
          </form>
        </button>
      </div>

      {/* blobs */}
      <div className="blob-cont">
        <div className="yellow blob"></div>
        <div className="red blob"></div>
        <div className="green blob"></div>
      </div>
{status === "authenticated" &&
      <button onClick={() => signOut()}>Sign out</button>

}
      {status === "authenticated" && <div>{session.user.email}</div>}
      {signMessageData && (
        <div className="bg-white text-black text-xl">
          <label>{signMessageData}</label>
        </div>
      )}
    </main>
  );
}
