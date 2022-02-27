import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { news, whoToFollow } from "../lib/static";

const style = {
  wrapper: "flex-[1] p-4 overflow-y-scroll",
  searchBar: "flex items-center bg-[#243340] p-2 rounded-3xl",
  searchIcon: "text-[#8899a6] mr-2",
  inputBox: "bg-transparent outline-none",
  section: "bg-[#192734] my-6 rounded-xl overflow-hidden",
  title: "p-2 font-bold text-lg",
  showMore: "w-full p-2 text-[#1d9bf0] text-sm cursor-pointer hover:bg-[#22303c]",
  item: "flex items-center p-3 my-2 hover:bg-[#22303c] cursor-pointer",
  newsItemLeft: "flex-1",
  newsItemCategory: "text-[#8899a6] text-xs font-semibold",
  newsItemTitle: "text-sm font-bold",
  newsItemRight: "w-1/5 ml-3",
  newsItemImage: "rounded-xl h-14 w-14 overflow-hidden",
  followAvatarContainer: "w-1/6 overflow-hidden mr-1",
  followAvatar: "rounded-full h-[40px] w-[40px]",
  profileDetails: "flex-1",
  name: "font-bold",
  handle: "text-[#8899a6]",
  followButton: "bg-white text-black px-3 py-1 rounded-full text-xs font-bold",
}

const Widgets: React.FC = () => {
    return (
        <aside className={`${style.wrapper} scrollbar-hide`}>
            <form className={style.searchBar}>
                <BiSearch className={style.searchIcon} />
                <input
                    placeholder='Search Twitter'
                    type='text'
                    className={style.inputBox}
                />
            </form>
            <section className={style.section}>
                <h2 className={style.title}>What's happening?</h2>
                {
                    news.map((item) => (
                        <article key={item.title} className={style.item}>
                            <div className={style.newsItemLeft}>
                                <h3 className={style.newsItemCategory}>{item.category}</h3>
                                <p className={style.newsItemTitle}>{item.title}</p>
                            </div>
                            <div className={`${style.newsItemRight} ${style.newsItemImage}`}>
                                <Image
                                    src={item.image}
                                    alt={item.category}
                                    height={70}
                                    width={70}
                                    objectFit="cover"
                                />
                            </div>
                        </article>
                    ))
                }
                <button className={style.showMore}>Show more</button>
            </section>
            <section className={style.section}>
                <h2 className={style.title}>Who to follow</h2>
                {
                    whoToFollow.map(item => (
                        <article key={item.name} className={style.item}>
                            <div className={`${style.followAvatarContainer} ${style.followAvatar}`}>
                                <Image
                                    src={item.avatar}
                                    alt={item.handle}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <section className={style.profileDetails}>
                                <h3 className={style.name}>{item.name}</h3>
                                <p className={style.handle}>{item.handle}</p>
                            </section>
                            <button className={style.followButton}>Follow</button>
                        </article>
                    ))
                }
                <button className={style.showMore}>Show more</button>
            </section>
        </aside>
    )
}

export default Widgets;