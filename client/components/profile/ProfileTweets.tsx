import React, { useContext, useEffect, useState } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import Post from "../Post";

const style = {
    wrapper: "scrollbar-hide"
}

interface Tweet {
    timestamp: string
    tweet: string
}
  
interface Tweets extends Array<Tweet> {}
  
interface Author {
    name: string
    profileImage: string
    walletAddress: string
    isProfileImageNft: Boolean | undefined
}
  

const ProfileTweets: React.FC = () => {
    const { currentUser } = useContext(TwitterContext)
    const [tweets, setTweets] = useState<Tweets>([
      {
        timestamp: "",
        tweet: "",
      },
    ]);
    const [author, setAuthor] = useState<Author>({
        name: '',
        profileImage: '',
        walletAddress: '',
        isProfileImageNft: undefined,
    })

    useEffect(() => {
        if (!currentUser) return

        setTweets(currentUser.tweets)
        setAuthor({
          name: currentUser.name,
          profileImage: currentUser.profileImage,
          walletAddress: currentUser.walletAddress,
          isProfileImageNft: currentUser.isProfileImageNft,
        })
    }, [currentUser]);

    return (
        <section className={style.wrapper}>
            {
                tweets?.map((tweet: Tweet) => (
                    <Post 
                        key={tweet.tweet + tweet.timestamp} 
                        avatar={author.profileImage}
                        displayName={
                            author.name === 'Unnamed'
                              ? `${author.walletAddress.slice(
                                  0,
                                  4,
                                )}...${author.walletAddress.slice(41)}`
                              : author.name
                        }
                        userName={`${author.walletAddress.slice(0, 4)}...${author.walletAddress.slice(41)}`}
                        timestamp={tweet.timestamp}
                        text={tweet.tweet}
                        isProfileImageNft={author.isProfileImageNft}
                    />
                ))
            }
        </section>
    )
}

export default ProfileTweets;