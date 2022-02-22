import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

export const TwitterContext = createContext();

export const TwitterProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState("");
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();
    
    useEffect(async() => {
        await checkIfWalletIsConnected();
    }, []);

    const checkIfWalletIsConnected = async () => {
        // First see if ethereum exists on window object
        if(!window.ethereum) return setAppStatus("noMetaMask");
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts"
            });
            if(addressArray.length > 0) {
                //Connected
                setAppStatus("connected");
                setCurrentAccount(addressArray[0]);
                //create user account in Sanity if doesnt already exist for this wallet address
                await createUserAccount(addressArray[0]);
            } else {
                // NOT connected
                router.push("/");
                setAppStatus("notConnected");
            }
        } catch (error) {
            // console.log(error);
            setAppStatus("error");
            router.push("/");
        }
    }

    // Initiates MetaMask wallet connection
    const connectToWallet = async() => {
        if(!window.ethereum) return setAppStatus("noMetaMask");
        try {
            setAppStatus("loading");
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            if(addressArray.length > 0) {
                //Connected
                setAppStatus("connected");
                setCurrentAccount(addressArray[0]);
                //create user account in Sanity if doesnt already exist for this wallet address
                await createUserAccount(addressArray[0]);
            } else {
                // NOT connected
                router.push("/");
                setAppStatus("notConnected");
            }
        } catch (error) {
            setAppStatus("error");
            router.push("/");
        }
    }

/**
   * Creates an account in Sanity DB if the user does not already have one
   * @param {String} userAddress Wallet address of the currently logged in user
   */
  const createUserAccount = async (userAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus("noMetaMask");

    try {
        const userDoc = {
            _type: "users",
            _id: userAddress,
            name: "Unnamed",
            isProfileImageNft: false,
            profileImage:
              "https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg",
            walletAddress: userAddress,
        }

        await client.createIfNotExists(userDoc);
        setAppStatus("connected");
    } catch (error) {
        setAppStatus("error");
        router.push("/");
    }
  }

    return (
        <TwitterContext.Provider value={{ appStatus, currentAccount, connectToWallet }}>
        { children }
        </TwitterContext.Provider>
    )
}