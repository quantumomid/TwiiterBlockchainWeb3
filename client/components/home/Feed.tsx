import React, { useContext } from "react";
import { BsStars } from "react-icons/bs";
import { TwitterContext } from "../../context/TwitterContext";
import Post from "../Post";
import TweetBox from "./TweetBox";

const style = {
    wrapper: "flex-[2] border-r border-l border-[#38444d] overflow-y-scroll",
    header: "sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center",
    headerTitle: "text-xl font-bold",
}

interface Tweet {
    author: TweetAuthor;
    tweet: string;
    timestamp: string;
}
  
interface TweetAuthor {
    name: string;
    walletAddress: string;
    profileImage: string;
    isProfileImageNft: boolean;
}

const Feed: React.FC = () => {
    const { tweets } = useContext(TwitterContext);
    return (
        <main className={`${style.wrapper} scrollbar-hide`}>
            <header className={style.header}>
                <h1 className={style.headerTitle}>Home</h1>
                <BsStars />
            </header>
            <TweetBox />
            {
                tweets.map((tweet: Tweet) => (
                    <Post 
                        key={tweet.tweet + tweet.timestamp.toString()}
                        displayName={
                            tweet.author.name === 'Unnamed'
                              ? `${tweet.author.walletAddress.slice(
                                  0,
                                  4,
                                )}...${tweet.author.walletAddress.slice(41)}`
                              : tweet.author.name
                          }
                          userName={`${tweet.author.walletAddress.slice(
                            0,
                            4,
                          )}...${tweet.author.walletAddress.slice(41)}`}
                          text={tweet.tweet}
                          avatar={tweet.author.profileImage}
                          isProfileImageNft={tweet.author.isProfileImageNft}
                          timestamp={tweet.timestamp}
                    />
                ))
            }
        </main>
    )
}

export default Feed;