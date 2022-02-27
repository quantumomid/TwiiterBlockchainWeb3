import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { TwitterContext } from "../../context/TwitterContext";

const style = {
    wrapper: "border-[#38444d] border-b",
    intro: "flex items-center py-1 px-3 mt-2",
    backIcon: "text-3xl mr-2 p-1 cursor-pointer rounded-full hover:bg-[#313b44]",
    primary: "font-bold bg-transparent outline-none",
    details: "px-3",
    secondary: "text-[#8899a6] text-xs",
    coverPhotoContainer: "h-[200px] w-full overflow-hidden",
    profileImageContainer: "w-[60px] h-[60px] rounded-full overflow-hidden mt-[-2rem] ml-2 mb-4",
    nav: "py-2",
    navOptions: "flex items-center justify-around text-xs font-semibold text-[#8899a6]",
    activeNav: "text-white",
}
 
interface Tweets {
    tweet: string
    timestamp: string
}
  
interface UserData {
    name: string
    profileImage: string
    coverImage: string
    walletAddress: string
    tweets: Array<Tweets>
    isProfileImageNft: Boolean | undefined
}

const ProfileHeader: React.FC = () => {
    const { currentUser, currentAccount } = useContext(TwitterContext);
    const [userData, setUserData] = useState<UserData>({
        name: "",
        profileImage: "",
        coverImage: "",
        walletAddress: "",
        tweets: [],
        isProfileImageNft: undefined,
    });
    const router = useRouter();
    
    useEffect(() => {
        if (!currentUser) return
        setUserData({
            name: currentUser.name,
            profileImage: currentUser.profileImage,
            walletAddress: currentUser.walletAddress,
            coverImage: currentUser.coverImage,
            tweets: currentUser.tweets,
            isProfileImageNft: currentUser.isProfileImageNft,
        });
    }, [currentUser]);

    console.log({currentUser})
    return (
        <header className={style.wrapper}>
            <section className={style.intro}>
                <button className={style.backIcon} onClick={() => router.push("/")}>
                    <BsArrowLeftShort />                
                </button>
                <article className={style.details}>
                    <h1 className={style.primary}>{userData.name}</h1>
                    <p className={style.secondary}>
                        {userData?.tweets?.length} 
                        {userData?.tweets?.length === 1 ? " Tweet" : " Tweets"} 
                    </p>
                </article>
            </section>
            <div className={style.coverPhotoContainer}>
                {
                    userData.coverImage 
                        &&
                    <Image
                        src={userData.coverImage}
                        alt="cover"
                        width={1500}
                        height={1500}
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center bottom"
                    />
                }

            </div>
            <div className={`${style.profileImageContainer} ${userData.isProfileImageNft && "rounded-none"}`}>
                {
                    userData.profileImage
                        &&
                    <Image
                        src={userData.profileImage}
                        alt={userData.walletAddress}
                        width={60}
                        height={60}
                        objectFit="cover"
                        className={ userData.isProfileImageNft ? "hex" : "" }
                    />
                }
            </div>
            <section className={style.details}>
                <h2 className={style.primary}>{userData.name}</h2>
                {
                    currentAccount && (
                        <p className={style.secondary}>
                            @{currentAccount.slice(0,8)}...{currentAccount.slice(37)}
                        </p>
                    )
                }
            </section>
            <nav className={style.nav}>
                <ul className={style.navOptions}>
                    <li className={style.activeNav}>Tweets</li>
                    <li>Tweets & Replies</li>
                    <li>Media</li>
                    <li>Likes</li>
                </ul>
            </nav>
        </header>
    )
}

export default ProfileHeader;