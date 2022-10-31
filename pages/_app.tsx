import "../styles/globals.css";
import type { AppProps } from "next/app";
import AllStateProviders from "../presentation/contexts/all_state_providers";
import { useEffect } from "react";
import ReactGA from "react-ga";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  const TRACKING_ID = "G-6TLKYYQC55"; // YOUR_OWN_TRACKING_ID
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  return (
    <AllStateProviders>
      <NextNProgress
        color="#800081"
        options={{ speed: 200, showSpinner: false, easing: "ease" }}
        startPosition={0.2}
        stopDelayMs={0}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </AllStateProviders>
  );
}

export default MyApp;
