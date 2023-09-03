"use client";
import { useWeb3Modal } from "@web3modal/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
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
  async function getLink(){
   // 0x71C9E62FA7293D43765692A408483B2fC7c7f0C6
   console.log("sending")
   const response = await fetch(
     // `https://repporter-uij0.onrender.com/api/getlink?address=${addr}&linkType=github`
     `https://repporter-uij0.onrender.com/api/getlink?address=0x71C9E62FA7293D43765692A408483B2fC7c7f0C6&linkType=github`

   );
   const data = await response.json();
   console.log("Get Link Response:", data);
  }  
  useEffect(() => {
    console.log(signMessageData);
  }, [signMessageData]);

  const API_BASE = "https://repporter-uij0.onrender.com/";

  const APICallerButton = () => {
    const { data: session, status } = useSession();

    const [jit, setJit] = useState(undefined);
    const [name, setName] = useState(undefined);

    useEffect(() => {
      setJit(session?.accessToken);
      setName(session?.name);
    }, [session]);

    const [userAddress, setUserAddres] = useState(null);
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      // Create a Web3 instance using the injected provider
      const web3 = new Web3(window.ethereum);
      // Request access to the user's wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: any[]) => {
          const userAddress = accounts[0];
          setUserAddres(userAddress);
          console.log("User Address:", userAddress);
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      console.error(
        "No web3 provider detected. Please install MetaMask or use a compatible browser."
      );
    }

    const ADDRESS = userAddress;
    const SIGNATURE = signMessageData;
    const OAUTH2_TOKEN = jit;
    const LINK_TYPE = "github";
    const LINK_VALUE = name;

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

    const handleButtonClick = async () => {
      console.log("API CALLS EXAMPLE");
      signMessage({
        message: "Sign Github @ " + session?.name,
      });
      setTimeout(async () => {
        await addLink();
      }, 5000);
      console.log("End of API Calls");
    };

    return (
      <button
        className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert"
        onClick={handleButtonClick}
      >
        Sign
      </button>
    );
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
            <p>Repo v.0.1</p>
          </a>
        </div>
      </div>

      <div className="flex w-full h-1/2 flex-wrap gap-2">
        {status !== "authenticated" && (
          <div
            className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert"
            onClick={() => signIn("github")}
          >
            Github
          </div>
        )}

        {status === "authenticated" && (
          <button className="w-1/3 md:w-1/4 flex-grow bg-[#1e6536] p-4 md:p-8 text-white text-7xl flex items-center justify-center hover:invert" onClick={() => signOut()}>Sign out</button>
        )}

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
        <APICallerButton />
      </div>

      {/* blobs */}
      <div className="blob-cont">
        <div className="yellow blob"></div>
        <div className="red blob"></div>
        <div className="green blob"></div>
      </div>

      <div>
        {signMessageData && (
          <label className="flex w-full h-1/2 flex-wrap gap-2 bg-[#151515] p-4 md:p-8 text-white text-lg items-center justify-center hover:invert py-6 my-6">
            {signMessageData}
          </label>
        )}
      </div>
      {signMessageData && (
          <div className="bg-white text-black text-xl">
            <label>{signMessageData}</label>
          </div>
        )}
        <button onClick={getLink}>CHECK</button>
    </main>
  );
}
