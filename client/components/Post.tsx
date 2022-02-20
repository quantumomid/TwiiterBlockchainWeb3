import Image from "next/image";
import React, { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { format } from "timeago.js";

const style = {
    wrapper: "flex p-3 border-b border-[#38444d]",
    profileImage: "h-[40px] w-[40px] min-w-fit rounded-full overflow-hidden",
    postMain: "flex-1 px-4",
    headerDetails: "flex flex-col items-start",
    name: "font-bold mr-1",
    verified: "text-[0.8rem]",
    handleAndTimeAgo: "text-[#8899a6] ml-1",
    tweet: "my-2",
    footer: "flex justify-between mr-28 mt-4 text-[#8899a6]",
    footerIcon: "rounded-full text-lg p-2",
}

interface PostProps {
    displayName: string
    userName: string
    text: string
    avatar: string
    timestamp: string
    isProfileImageNft: Boolean | undefined
}

const Post:React.FC<PostProps> = ({ displayName, userName, text, avatar, timestamp, isProfileImageNft }) => {
    const [profileImageLink] = useState(avatar)

    return (
        <article className={style.wrapper}>
            <div
                className={
                    isProfileImageNft
                    ? `${style.profileImage} smallHex`
                    : style.profileImage
                }
            >
                <Image
                    src={profileImageLink}
                    alt={userName}
                    height={40}
                    width={40}
                    objectFit="cover"
                />
            </div>
            <div className={style.postMain}>
                <section>
                    <span className={style.headerDetails}>
                        <h2 className={style.name}>{displayName}</h2>
                        {
                            isProfileImageNft && (
                                <span className={style.verified}>
                                    <BsFillPatchCheckFill />
                                </span>
                            )
                        }
                        <span className={style.handleAndTimeAgo}>
                            @{userName} • {format(new Date(timestamp).getTime())}
                        </span>
                    </span>
                    <p className={style.tweet}>{text}</p>
                </section>
                <footer className={style.footer}>
                    <div
                        className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}
                    >
                        <FaRegComment />
                    </div>
                    <div
                        className={`${style.footerIcon} hover:text-[#03ba7c] hover:bg-[#1b393b]`}
                    >
                        <FaRetweet />
                    </div>
                    <div
                        className={`${style.footerIcon} hover:text-[#f91c80] hover:bg-[#39243c]`}
                    >
                        <AiOutlineHeart />
                    </div>
                    <div
                        className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}
                    >
                        <FiShare />
                    </div>
                </footer>
            </div>
        </article>
    )
}

export default Post;