import React from "react";
import { BsStars } from "react-icons/bs";
import Post from "../Post";
import TweetBox from "./TweetBox";

const style = {
    wrapper: "flex-[2] border-r border-l border-[#38444d]",
    header: "sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center",
    headerTitle: "text-xl font-bold",
}

const tweets = [
    {
        displayName: "Omid",
        username: "0xe22711bCa99ff337977792122910172CE08943Ad",
        avatar: "/dummyProfileImage.jpg",
        text: "Salaaaaaaam matteee!",
        isProfileImageNft: false,
        timestamp: "2022-02-19T12:00:00.000Z",

    },
    {
        displayName: "Omid",
        username: "0xe22711bCa99ff337977792122910172CE08943Ad",
        avatar: "/dummyProfileImage.jpg",
        text: "Salaaaaaaam matteee!",
        isProfileImageNft: false,
        timestamp: "2022-01-01T12:00:00.000Z",

    },
    {
        displayName: "Omid",
        username: "0xe22711bCa99ff337977792122910172CE08943Ad",
        avatar: "/dummyProfileImage.jpg",
        text: "Salaaaaaaam matteee!",
        isProfileImageNft: false,
        timestamp: "2021-12-01T12:00:00.000Z",

    },
    {
        displayName: "Omid",
        username: "0xe22711bCa99ff337977792122910172CE08943Ad",
        avatar: "/dummyProfileImage.jpg",
        text: "Salaaaaaaam matteee!",
        isProfileImageNft: false,
        timestamp: "2020-06-01T12:00:00.000Z",

    },
]

const Feed: React.FC = () => {
    return (
        <main className={style.wrapper}>
            <header className={style.header}>
                <h1 className={style.headerTitle}>Home</h1>
                <BsStars />
            </header>
            <TweetBox />
            {
                tweets.map((tweet) => (
                    <Post 
                        key={tweet.text}
                        displayName={tweet.displayName}
                        userName={`${tweet.username.slice(0, 4)}...${tweet.username.slice(-4)}`}
                        text={tweet.text}
                        avatar={tweet.avatar}
                        isProfileImageNft={tweet.isProfileImageNft}
                        timestamp={tweet.timestamp}
                    />
                ))
            }
        </main>
    )
}

export default Feed;