import React, { useState } from "react";
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import { FiBell, FiMoreHorizontal } from "react-icons/fi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { FaRegListAlt, FaHashtag, FaBell } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import { VscTwitter } from "react-icons/vsc";
import SidebarOption from "./SidebarOption";

const style = {
    wrapper: "flex-[0.7] px-8 flex flex-col",
    twitterIconContainer: "text-3xl m-4",
    tweetButton: "bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] px-[40px] mt-[20px] cursor-pointer",
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
    const [selected, setSelected] = useState<String>(initialSelectedIcon)
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
                <li>Explore</li>
                <li>Notifications</li>
                <li>Messages</li>
                <li>Bookmarks</li>
                <li>Lists</li>
                <li>Profile</li>
                <li>More</li>
            </ul>
            <button className={style.tweetButton}>Mint</button>
        </nav>
        <div className={style.profileButton}>
            <div className={style.profileLeft}></div>
            <div className={style.profileRight}>
                <div className={style.details}>
                    <div className={style.name}>Omid</div>
                    <div className={style.handle}>@0sadid0</div>
                </div>
                <div className={style.moreContainer}>
                    <FiMoreHorizontal />
                </div>
            </div>
        </div>
    </header>
    )
}

export default Sidebar;