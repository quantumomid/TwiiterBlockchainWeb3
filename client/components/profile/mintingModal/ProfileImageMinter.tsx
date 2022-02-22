import React, { useContext, useState } from "react";
import { TwitterContext } from "../../../context/TwitterContext";
import InitialState from "./InitialState";

const ProfileImageMinter:React.FC = () => {
    const { currentAccount, setAppStatus } = useContext(TwitterContext);
    
    const [status, setStatus] = useState("initial");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState<File>();

    const mint = async () => {
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
            default:
                break;
        }
    }

    return <>{modalChildren()}</>
}

export default ProfileImageMinter;