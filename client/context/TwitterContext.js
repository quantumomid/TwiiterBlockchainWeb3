import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const TwitterContext = createContext();

export const TwitterProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState("loading");
    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();
    
    useEffect(async() => {
        await checkIfWalletIsConnected();
    }), [];

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
            } else {
                // NOT connected
                setAppStatus("notConnected");
            }
        } catch (error) {
            // console.log(error);
            setAppStatus("error")
        }
    }

    // Initiates MetaMask wallet connection
    const connectToWallet = async() => {
        if(!window.ethereum) return setAppStatus("noMetaMask");

        setAppStatus("loading");
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            if(addressArray.length > 0) {
                //Connected
                setAppStatus("connected");
                setCurrentAccount(addressArray[0]);
            } else {
                // NOT connected
                router.push("/");
                setAppStatus("notConnected");
            }
        } catch (error) {
            setAppStatus("error")
        }
    }

    return (
        <TwitterContext.Provider value={{ appStatus, currentAccount, connectToWallet }}>
        { children }
        </TwitterContext.Provider>
    )
}