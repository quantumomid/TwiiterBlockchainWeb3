import type { NextPage } from "next";
import { useContext } from "react";
import { TwitterContext } from "../context/TwitterContext";
import Feed from "../components/home/Feed";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Image from "next/image";

const style = {
  wrapper: "flex justify-center h-screen w-screen select-none bg-[#15202b] text-white",
  content: "max-w-[1400px] w-8/9 flex justify-between",
  loginContainer: "w-full h-full flex flex-col justify-center items-center pb-48",
  walletConnectButton: "text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]",
  loginContent: "text-3xl font-bold text-center mt-24",
}

const Home: NextPage = () => {
  const { appStatus, connectToWallet } = useContext(TwitterContext);

  // This will determine what to show depending on app status
  const app = (status=appStatus) => {
    switch(status) {
      case "connected":
        return userLoggedIn;
      case "notConnected":
        return noUserFound;
      case "noMetaMask":
        return noMetaMaskFound;
      case "error":
        return error;
      default:
        return loading;
    }
  }

  // What to show if user is logged in
  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar initialSelectedIcon={'Home'}/>
      <Feed />
      <Widgets />
    </div>
  )

    // If no user is logged in metamask
    const noUserFound = (
      <main className={style.loginContainer}>
        <Image
          src="/metamask.png"
          alt="Orange animated front view of head of a fox representing the MetaMask logo"
          height={200}
          width={200}
        />
        <button
          className={style.walletConnectButton}
          onClick={() => connectToWallet()}
        >
          Connect Wallet
        </button>
        <h1 className={style.loginContent}>Connect to Metamask.</h1>
      </main>
    )

  // If no metamask is found
  const noMetaMaskFound = (
    <main className={style.loginContainer}>
      <Image
        src="/metamask.png"
        alt="Orange animated front view of head of a fox representing the MetaMask logo"
        height={200}
        width={200}
      />
      <section className={style.loginContent}>
        <h1>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://metamask.io/download.html"
          >
            You must install MetaMask, a virtual Ethereum wallet, in your browser.
          </a>
        </h1>
      </section>
    </main>
  )

  const error = (
    <main className={style.loginContainer}>
      <Image
        src="/error.png"
        alt="Red Triangle against a white background with a white exclamation mark inside the triangle."
        height={250}
        width={250}
      />
      <h1 className={style.loginContent}>An error occurred. Please try again later or use another browser!</h1>
    </main>
  )

  const loading = (
    <main className={style.loginContainer}>
      <h1 className={style.loginContent}>Loading...</h1>
    </main>
  )

  // Default return - this is actual return
  return <div className={style.wrapper}>{app(appStatus)}</div>
}

export default Home
