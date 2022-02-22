import Image from "next/image";
import React, { useContext, useState } from "react";
import { BsCardImage, BsEmojiSmile } from "react-icons/bs";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import { IoMdCalendar } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { TwitterContext } from "../../context/TwitterContext";
import { client } from "../../lib/client";

const style = {
    wrapper: "px-4 flex flex-row border-b border-[#38444d] pb-4",
    tweetBoxLeft: "mr-4",
    tweetBoxRight: "flex-1",
    profileImage: "rounded-full",
    inputField: "w-full h-full outline-none bg-transparent text-lg",
    formLowerContainer: "flex",
    iconsContainer: "text-[#1d9bf0] flex flex-1 items-center",
    icon: "mr-2",
    submitGeneral: "px-6 py-2 rounded-3xl font-bold",
    inactiveSubmit: "bg-[#196195] text-[#95999e]",
    activeSubmit: "bg-[#1d9bf0] text-white",
}

const TweetBox:React.FC = () => {
    const [tweetMessage, setTweetMessage] = useState("");
    const { currentAccount } = useContext(TwitterContext);
    
    const submitTweet = async (event: any) => {
        event.preventDefault();

        if(!tweetMessage) return;

        const tweetId = `${currentAccount}_${Date.now()}`;

        const tweetDoc = {
            _type: "tweets",
            _id: tweetId,
            tweet: tweetMessage,
            timestamp: new Date(Date.now()).toISOString(),
            author: {
              _key: tweetId,
              _ref: currentAccount,
              _type: "reference",
            },
        };

        await client.createIfNotExists(tweetDoc);

        await client
            .patch(currentAccount)
            .setIfMissing({ tweets: [] })
            .insert("after", "tweets[-1]", [
                {
                    _key: tweetId,
                    _type: "reference",
                    _ref: tweetId
                }
            ])
            .commit()

        setTweetMessage("");
    }

    return (
        <section className={style.wrapper}>
            <div className={style.tweetBoxLeft}>
                <Image
                    src="/dummyProfileImage.jpg"
                    alt="Profile picture"
                    className={style.profileImage}
                    height={40}
                    width={40}
                    // src={currentUser.profileImage}
                    // className={
                    //     currentUser.isProfileImageNft
                    //     ? `${style.profileImage} smallHex`
                    //     : style.profileImage
                    // }
                />
            </div>
            <div className={style.tweetBoxRight}>
                <form>
                <textarea
                    onChange={(e) => setTweetMessage(e.target.value)}
                    value={tweetMessage}
                    placeholder="What's happening?"
                    className={style.inputField}
                />                    
                </form>
                <div className={style.formLowerContainer}>
                    <div className={style.iconsContainer}>
                        <BsCardImage className={style.icon} />
                        <RiFileGifLine className={style.icon} />
                        <RiBarChartHorizontalFill className={style.icon} />
                        <BsEmojiSmile className={style.icon} />
                        <IoMdCalendar className={style.icon} />
                        <MdOutlineLocationOn className={style.icon} />
                    </div>
                    <button
                        type="submit"
                        onClick={event => submitTweet(event)}
                        disabled={!tweetMessage}
                        className={`${style.submitGeneral} ${
                            tweetMessage ? style.activeSubmit : style.inactiveSubmit
                        }`}
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </section>
    )
}

export default TweetBox;