import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import "../styles/hexStyles.css";
import { TwitterProvider } from "../context/TwitterContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Twitter Web3 Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TwitterProvider>
        <Component {...pageProps} />
      </TwitterProvider>
    </Fragment>
  )
}

export default MyApp
