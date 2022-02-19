import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";

const style = {
  wrapper: "flex justify-center h-screen w-screen select-none bg-[#15202b] text-white",
  content: "max-w-[1400px] w-2/3 flex justify-between"
}

const Home: NextPage = () => {
  return (
    <main className={style.wrapper}>
      <div className={style.content}>
        <Sidebar initialSelectedIcon={'Home'}/>
        <h2>Feed</h2>
        <h2>Widgets</h2>
      </div>
    </main>
  )
}

export default Home
