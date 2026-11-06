import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "@/styles/animations.css";
import Script from "next/script";
import { GOOGLE_ADS_TAG } from "@/constants/analytics";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setInitialLoadDone(true);

      //After the animation is finished, hide the Loader from the DOM
      setTimeout(() => {
        setShowLoader(false);
      }, 1000); // time should be the same as transition: opacity 1s
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoadDone) return;

    const handleStart = () => {
      setLoading(true);
      setShowLoader(true); // show Loader at start of transition
    };
    const handleComplete = () => {
      setLoading(false);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, initialLoadDone]);

  useEffect(() => {
    if (initialLoadDone) {
      document.body.classList.add("pageLoaded");
    } else {
      document.body.classList.remove("pageLoaded");
    }
  }, [initialLoadDone]);

  return (
    <>
      {/* Google Tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG}`}
      />

      {/* DataLayer and Google Ads initialization */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_TAG}');
          `,
        }}
      />

      <LanguageProvider>
        <CartProvider>
          <Header />
          {showLoader && <Loader hide={!loading} />}

          <Component {...pageProps} />
          <ToastContainer theme="dark" newestOnTop autoClose={3000} />
          <Footer />
        </CartProvider>
      </LanguageProvider>
    </>
  );
}
