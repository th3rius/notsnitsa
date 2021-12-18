import "../styles/globals.css";
import "../styles/dracula-prism.css";
import "prismjs/prism";
import {useEffect} from "react";
import Script from "next/script";
import {useRouter} from "next/router";
import * as gtag from "../lib/gtag";
import {AppProps} from "next/app";

function App({Component, pageProps}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    function handleRouteChange(url: string) {
      gtag.pageview(url);
    }
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script id="gtag-init">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname
        });
      `}</Script>
      <Component {...pageProps} />
    </>
  );
}

export default App;
