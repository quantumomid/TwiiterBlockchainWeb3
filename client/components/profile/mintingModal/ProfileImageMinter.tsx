import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { TwitterContext } from "../../../context/TwitterContext";
import FinishedState from "./FinishedState";
import InitialState from "./InitialState";
import LoadingState from "./LoadingState";
import { pinFileToIPFS, pinJSONToIPFS } from "../../../lib/pinata";
import { client } from "../../../lib/client";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../../lib/constants";

declare let window: any

let metamask: any

if (typeof window !== "undefined") {
    metamask = window.ethereum;
}

interface Metadata {
    name: string
    description: string
    image: string
}

const getEthereumContract = async() => {
    const provider = new ethers.providers.Web3Provider(metamask);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

const ProfileImageMinter:React.FC = () => {
    const { currentAccount, setAppStatus } = useContext(TwitterContext);
    const router = useRouter();

    const [status, setStatus] = useState("initial");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState<File>();

    const mint = async () => {
        if (!name || !description || !profileImage) return;
        setStatus("loading");

        const pinataMetaData = {
            name: `${name} - ${description}`,
        };

        // Mint image
        const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData);

        // Update Sanity
        await client 
            .patch(currentAccount)
            .set({ profileImage: ipfsImageHash })
            .set({ isProfileImageNft: true })
            .commit()
        
        const imageMetaData: Metadata = {
            name: name,
            description: description,
            image: `ipfs://${ipfsImageHash}`,
        }

        const ipfsJsonHash = await pinJSONToIPFS(imageMetaData);

        const contract = await getEthereumContract();

        const transactionParameters = {
            to: contractAddress,
            from: currentAccount,
            data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
        }

        try {
            await metamask.request({
                method: "eth_sendTransaction",
                params: [transactionParameters]
            });
            setStatus("finished");
        } catch (error) {
            console.log(error);
            setStatus("finished"); 
        }

    }

    const modalChildren = (modalStatus = status) => {
        switch (modalStatus) {
            case "initial":
                return (
                    <InitialState 
                        profileImage={profileImage!}
                        setProfileImage={setProfileImage}
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        mint={mint}
                    />
                );
            case "loading":
                return <LoadingState />;
            case 'finished':
                return <FinishedState />;
            default:
                router.push("/");
                setAppStatus("error");
                break;
        }
    }

    return <>{modalChildren()}</>;
}

export default ProfileImageMinter;