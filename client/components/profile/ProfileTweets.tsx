import React from "react";
import Post from "../Post";

const style = {
    wrapper: "scrollbar-hide"
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

const ProfileTweets: React.FC = () => {
    return (
        <section className={style.wrapper}>
            {
                tweets.map(tweet => (
                    <Post 
                        key={tweet.text} 
                        avatar={tweet.avatar}
                        displayName={tweet.displayName}
                        userName={`${tweet.username.slice(0, 4)}...${tweet.username.slice(-4)}`}
                        timestamp={tweet.timestamp}
                        text={tweet.text}
                        isProfileImageNft={tweet.isProfileImageNft}
                    />
                ))
            }
        </section>
    )
}

export default ProfileTweets;