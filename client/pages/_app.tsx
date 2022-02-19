import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import "../styles/hexStyles.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Twitter Web3 Clone</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
