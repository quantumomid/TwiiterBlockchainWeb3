import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { TwitterContext } from "../../../context/TwitterContext";

const style = {
    wrapper: `h-[20rem] w-[35rem] text-white bg-[#15202b] rounded-3xl p-10 flex flex-col items-center justify-center`,
    title: `font-semibold text-xl mb-6`,
    closeButton: `mt-6 bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
}

const FinishedState:React.FC = () => {
    const router = useRouter();
    const { getCurrentUserDetails } = useContext(TwitterContext);
  
    useEffect(() => {
      getCurrentUserDetails()
    }, []);
  
    return (
      <main className={style.wrapper}>
        <h1 className={style.title}>Minting Successful!</h1>
        <Image src="/check.png" alt='checkmark' height={100} width={100} />
        <button onClick={() => router.push('/')} className={style.closeButton}>
          Close
        </button>
      </main>
    )
}
  
export default FinishedState;