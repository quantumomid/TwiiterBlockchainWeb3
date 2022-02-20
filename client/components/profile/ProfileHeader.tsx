import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";

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
 
const ProfileHeader: React.FC = () => {
    const router = useRouter();

    const isProfileImageNft = false;
    const currentAccount = "0xe22711bCa99ff337977792122910172CE08943Ad";

    return (
        <header className={style.wrapper}>
            <section className={style.intro}>
                <div className={style.backIcon}>
                    <BsArrowLeftShort />                
                </div>
                <div className={style.details}>
                    <h1 className={style.primary}>Omid</h1>
                    <p className={style.secondary}>4 Tweets</p>
                </div>
            </section>
            <div className={style.coverPhotoContainer}>
                <Image
                    src="/cover.jpg"
                    alt='cover'
                    width={1500}
                    height={1500}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center bottom"
                />
            </div>
            <div className={`${style.profileImageContainer} ${isProfileImageNft && "rounded-none"}`}>
                <Image
                    src="/dummyProfileImage.jpg"
                    alt="profile photo"
                    width={60}
                    height={60}
                    objectFit="cover"
                    className={ isProfileImageNft ? "hex" : "" }
                />
            </div>
            <section className={style.details}>
                <h2 className={style.primary}>Omid Wakili</h2>
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