import React, { useContext, useState } from "react";
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { FiBell, FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { FaRegListAlt, FaHashtag, FaBell } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { VscTwitter } from "react-icons/vsc";
import SidebarOption from "./SidebarOption";
import {
    BsBookmark,
    BsBookmarkFill,
    BsPerson,
    BsPersonFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { TwitterContext } from "../context/TwitterContext";
import Image from "next/image";
import Modal from "react-modal";
import ProfileImageMinter from "./profile/mintingModal/ProfileImageMinter";
import { customStyles } from "../lib/constants";

const style = {
    wrapper: "flex-[0.7] px-8 flex flex-col",
    twitterIconContainer: "text-3xl m-4",
    tweetButton: "bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] px-8 mt-[20px] cursor-pointer",
    navContainer: "flex-1",
    profileButton: "flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2",
    profileLeft: "flex items-center justify-center mr-4",
    profileImage: "height-12 w-12 rounded-full",
    profileRight: "flex-1 flex",
    details: "flex-1",
    name: "text-lg",
    handle: "text-[#8899a6]",
    moreContainer: "flex items-center mr-2",
}

interface SidebarProps {
    initialSelectedIcon: string
}

const Sidebar: React.FC<SidebarProps> = ({ initialSelectedIcon }) => {

    const [selected, setSelected] = useState<String>(initialSelectedIcon);
    const { currentAccount, currentUser } = useContext(TwitterContext);
    const router = useRouter();
    console.log(router.pathname)
    return (
        <header className={style.wrapper}>
            <div className={style.twitterIconContainer}>
                <VscTwitter />
            </div>
            <nav className={style.navContainer}>
                <ul>
                    <SidebarOption 
                        Icon={selected === "Home" ? RiHome7Fill : RiHome7Line}
                        text="Home"
                        isActive={Boolean(selected === "Home")}
                        setSelected={setSelected}
                        redirect={"/"}
                    />
                    <SidebarOption
                        Icon={selected === 'Explore' ? FaHashtag : BiHash}
                        text='Explore'
                        isActive={Boolean(selected === 'Explore')}
                        setSelected={setSelected}
                    />
                    <SidebarOption
                        Icon={selected === "Notifications" ? FaBell : FiBell}
                        text="Notifications"
                        isActive={Boolean(selected === "Notifications")}
                        setSelected={setSelected}
                    />

                    <SidebarOption
                        Icon={selected === 'Messages' ? HiMail : HiOutlineMail}
                        text='Messages'
                        isActive={Boolean(selected === 'Messages')}
                        setSelected={setSelected}
                    />
                    <SidebarOption
                        Icon={selected === 'Bookmarks' ? BsBookmarkFill : BsBookmark}
                        text='Bookmarks'
                        isActive={Boolean(selected === 'Bookmarks')}
                        setSelected={setSelected}
                    />
                    <SidebarOption
                        Icon={selected === 'Lists' ? RiFileList2Fill : FaRegListAlt}
                        text='Lists'
                        isActive={Boolean(selected === 'Lists')}
                        setSelected={setSelected}
                    />
                    <SidebarOption
                        Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
                        text='Profile'
                        isActive={Boolean(selected === 'Profile')}
                        setSelected={setSelected}
                        redirect={'/profile'}
                    />

                    <SidebarOption Icon={CgMoreO} text='More' />            
                </ul>
                <button 
                    className={style.tweetButton}
                    onClick={() => router.push(`${router.pathname}/?mint=${currentAccount}`)}
                >
                    Mint
                </button>
            </nav>
            {
                currentUser &&
                    <article className={style.profileButton}>
                        <section className={style.profileLeft}>
                            {
                                currentUser.profileImage
                                &&
                                <Image
                                    src={currentUser.profileImage}
                                    alt="profile"
                                    height={40}
                                    width={40}
                                    className={
                                        currentUser.isProfileImageNft
                                            ? `${style.profileImage} smallHex`
                                            : style.profileImage
                                    }
                                />
                            }
                        </section>
                        <section className={style.profileRight}>
                            <div className={style.details}>
                                <h2 className={style.name}>{currentUser.name}</h2>
                                <p className={style.handle}>
                                @{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                                </p>
                            </div>
                            <div className={style.moreContainer}>
                                <FiMoreHorizontal />
                            </div>
                        </section>
                    </article>
            }
            <Modal
                isOpen={Boolean(router.query.mint)} // If mint objects exists in the query property - this is only when we click in the mint button above
                onRequestClose={() => router.back()} // Go back i.e. to homepage or profile - wherever user was before clicking the Mint button
                style={customStyles}
            >
                <ProfileImageMinter />
            </Modal>
        </header>
    );
}

export default Sidebar;