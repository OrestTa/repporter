"use client";
import Image from "next/image";
import { Web3Button } from "@web3modal/react";
import { data } from "autoprefixer";
import { useRef, useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { useSignMessage } from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Web3Button />
      <form
        className="flex flex-col gap-2 bg-white p-4 text-black"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const message = formData.get("message") as string;
          signMessage({
            message: message,
          });
        }}
      >
        <label>Enter a message to sign in the wallet</label>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="peanut is awesome"
        />
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </form>
      <button onClick={() => signOut()}>Sign out</button>
      {status === "authenticated" && <div>{session.user.email}</div>}
      {signMessageData && (
        <div className="bg-white text-black text-xl">
          <label>{signMessageData}</label>
        </div>
      )}
    </main>
  )
}
