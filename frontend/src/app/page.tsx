"use client";
import { useWeb3Modal } from "@web3modal/react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useSignMessage } from "wagmi"
import Web3 from "web3"

export default function Home() {
  const [addressInput, setAddressInput] = useState("");

  const { data: session, status } = useSession();
  const { open, close } = useWeb3Modal();
  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
    variables,
  } = useSignMessage();


  const [getLinkData, setGetLinkData] = useState<any>(undefined)
  
const [loadingLookUp, setLoadingLookUp] = useState(false)
  async function getLink() {
    // 0x71C9E62FA7293D43765692A408483B2fC7c7f0C6
    setLoadingLookUp(true)
    console.log("sending");
    // document.getElementById("lookupbtn").addS
    const response = await fetch(
      `https://repporter-uij0.onrender.com/api/getlink?address=${addressInput}&linkType=github`
      // `https://repporter-uij0.onrender.com/api/getlink?address=0x71C9E62FA7293D43765692A408483B2fC7c7f0C6&linkType=github`
    );
    const data = await response.json();
    setGetLinkData(data);
    setLoadingLookUp(false)
  }

  useEffect(() => {
    console.log(signMessageData);
  }, [signMessageData]);

  const API_BASE = "https://repporter-uij0.onrender.com/";

  const APICallerButton = () => {
    const { data: session, status } = useSession();

    const [accessToken, setAccessToken] = useState(undefined);
    const [name, setName] = useState(undefined);

    useEffect(() => {
      console.log("Session access token", session?.accessToken);
      setAccessToken(session?.accessToken);
      setName(session?.name);
    }, [session]);

    const [userAddress, setUserAddres] = useState("");

    useEffect(() => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        // Create a Web3 instance using the injected provider
        // const web3 = new Web3(window.ethereum);
        // Request access to the user's wallet
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts: any[]) => {
            const userAddressPreChecksumFormat = accounts[0];
            const userAddress = Web3.utils.toChecksumAddress(
              userAddressPreChecksumFormat
            );
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
    }, []);

    useEffect(() => {
      if (signMessageData !== undefined && userAddress !== undefined) {
        addLink();
      }
    }, [signMessageData, userAddress]);

    const addLink = async () => {
      const ADDRESS = userAddress;
      const SIGNATURE = signMessageData;
      const OAUTH2_TOKEN = session?.accessToken;
      const LINK_TYPE = "github";
      const LINK_VALUE = session?.user.name;
      console.log(
        JSON.stringify({
          address: ADDRESS,
          signature: SIGNATURE,
          oauth2Token: OAUTH2_TOKEN,
          linkType: LINK_TYPE,
          linkValue: LINK_VALUE,
        })
      );
      // const response = await fetch(`${API_BASE}/api/addlink`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     address: ADDRESS,
      //     signature: SIGNATURE,
      //     oauth2Token: OAUTH2_TOKEN,
      //     linkType: LINK_TYPE,
      //     linkValue: LINK_VALUE,
      //   }),
      // });

      const body = JSON.stringify({
        address: ADDRESS,
        signature: SIGNATURE,
        oauth2Token: OAUTH2_TOKEN,
        linkType: LINK_TYPE,
        linkValue: LINK_VALUE,
      });

      console.log("running...");
      console.warn(body);

      const response = await fetch(`${API_BASE}/api/addlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();
      console.log("Add Link Response:", data);
    };

    const handleButtonClick = async () => {
      console.log("API CALLS EXAMPLE");
      signMessage({
        message:
          "Sign mapping your wallet address to Github, " + session?.user.name,
      });

      console.log("End of API Calls");
    };

    return (
      <button
        className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-lg md:text-2xl  flex items-center justify-center hover:invert"
        onClick={handleButtonClick}
      >
        3. Sign
      </button>
    );
  };

  useEffect(() => {
    console.log("GET LINK DATA:", getLinkData);
    if (getLinkData !== undefined) {
      if(getLinkData.link !== undefined){
      console.log(getLinkData.link[44787]);
      console.log(getLinkData.link[5001]);
      }
    }
  }, [getLinkData]);

  return (
    <main className="p-12">
      {/* blobs */}
      <div className="blob-cont">
        <div className="yellow blob"></div>
        <div className="red blob"></div>
        <div className="green blob"></div>
      </div>

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
            Repo v.0.1
          </a>
        </div>
      </div>

      <div className="flex w-full h-1/2 flex-wrap gap-2 p-4 md:p-8 text-black items-center justify-center py-6 my-12 text-3xl md:text-7xl text-center">
        Prove and verify onchain that you control a Github handle.
      </div>

      <div className="flex w-full h-1/2 flex-wrap gap-2">
        {status !== "authenticated" && (
          <div
            className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-lg md:text-2xl flex items-center justify-center hover:invert cursor-pointer"
            onClick={() => signIn("github")}
          >
            1. Github
          </div>
        )}

        {status === "authenticated" && (
          <button
            className="w-1/3 md:w-1/4 flex-grow bg-[#1e6536] p-4 md:p-8 text-white text-lg md:text-2xl flex items-center justify-center hover:invert"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        )}

        <button
          onClick={() => open()}
          className="w-1/3 md:w-1/4 flex-grow bg-[#151515] p-4 md:p-8 text-white text-lg md:text-2xl flex items-center justify-center hover:invert"
        >
          2. Connect Wallet
        </button>

        <APICallerButton />
      </div>

      <div>
        {signMessageData && (
          <label className="flex w-full h-1/2 flex-wrap gap-2 bg-[#151515] p-4 md:p-8 text-white text-lg items-center justify-center hover:invert py-6 my-6">
            {signMessageData}
          </label>
        )}
      </div>

      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label
          htmlFor="inputField"
          className="flex w-full flex-row gap-2 p-4 md:p-8 text-white text-xl items-center justify-center my-6"
        >
          <input
            id="inputField"
            type="text"
            className="flex-grow bg-[#151515] p-4 md:p-8 text-white text-xl items-center justify-center py-2 md:text-2xl"
            placeholder="Enter a wallet to check"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          />



    <button
            type="submit"
            onClick={getLink}
            className="bg-[#151515] p-4 md:p-8 text-xl items-center justify-center py-2 md:text-2xl hover:invert "
            id="lookupbtn"
          >
      
      {loadingLookUp ?
        (    <svg aria-hidden="true" className=" w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            
    </svg>) : (<>Look up</>)

      }
      
  
          </button>

     
        </label>
      </form>

      <div className="flex justify-center mx-auto p-5 divide-x-8">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between text-white gap-32">
            <div className="text-lg bg-[#151515] p-10 text-clip	">
              Mantle
              <p className="text-3xl text-clip	 break-all">
                {getLinkData!==undefined  && getLinkData.link && "Github: " + getLinkData.link[5001]}
              </p>
            </div>
            <div className="text-lg bg-[#151515] p-10 text-clip	 break-all">
              Celo
              <p className="text-3xl text-clip	">
                {getLinkData!==undefined && getLinkData.link && "Github: " + getLinkData.link[44787]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
