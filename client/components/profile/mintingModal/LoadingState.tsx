import React from "react";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";

const style = {
    wrapper: "h-[20rem] w-[35rem] text-white bg-[#15202b] rounded-3xl p-10 flex flex-col items-center justify-center",
    title: "font-semibold text-xl mb-6",
}

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const LoadingState:React.FC = () => {
    return (
      <main className={style.wrapper}>
        <h1 className={style.title}>Minting in progress...</h1>
        <GridLoader color={"#fff"} loading={true} css={cssOverride} size={30} />
      </main>
    )
}
  
export default LoadingState;