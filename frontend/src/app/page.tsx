"use client";
import Image from "next/image";
import { Web3Button, useWeb3Modal} from "@web3modal/react";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="nav">
        <div className="menu">
          <a href="/about">
            <p>Why?</p>
          </a>
          <a href="https://github.com/0xkkonrad/repporter/">
            <p>Repo</p>
          </a>
        </div>
      </div>

      <div className="hero">
        <div className="hero-text">
          <h1>Repporter</h1>
          <p>Rep your port repo port lorem ipsum.</p>
          <div className="buttons">
            <a className="button primary" href="/verify" target="_blank">
              Verify
            </a>
            {/* <Web3Button className="button invert"/> */}

            <button className="primary button text-7xl" onClick={() => open()}>
              Connect
            </button>

            <Web3Button />


          </div>
        </div>

        <form
          className="flex flex-col gap-2"
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

        {/* blobs */}
        <div className="blob-cont">
          <div className="yellow blob"></div>
          <div className="red blob"></div>
          <div className="green blob"></div>
        </div>
      </div>

      <button onClick={() => signOut()}>Sign out</button>
      {status === "authenticated" && <div>{session.user.email}</div>}
      {signMessageData && (
        <div className="bg-white text-black text-xl">
          <label>{signMessageData}</label>
        </div>
      )}
    </main>
  );
}
