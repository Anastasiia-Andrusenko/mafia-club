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

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setInitialLoadDone(true);

      // Після завершення анімації сховати Loader з DOM
      setTimeout(() => {
        setShowLoader(false);
      }, 1000); // час повинен бути таким же, як transition: opacity 1s
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!initialLoadDone) return;

    const handleStart = () => {
      setLoading(true);
      setShowLoader(true); // показати Loader на початку переходу
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
    <LanguageProvider>
      <CartProvider>
        <Header />
        {showLoader && <Loader hide={!loading} />}

        <Component {...pageProps} />
        <ToastContainer theme="dark" newestOnTop autoClose={3000} />
        <Footer />
      </CartProvider>
    </LanguageProvider>
  );
}
