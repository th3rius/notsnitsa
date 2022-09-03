import Layout from "components/Layout";
import * as gtag from "lib/gtag";

import "@fontsource/lora";
import "@fontsource/open-sans";
import "@fontsource/source-code-pro";
import {AppProps} from "next/app";
import {useRouter} from "next/router";
import Script from "next/script";
import Prism from "prismjs";
import {useEffect} from "react";

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

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script id="gtag-init">{
        /* language=js */ `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname
        });
      `
      }</Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
