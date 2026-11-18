import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "@/styles/animations.css";
import Script from "next/script";
import { GOOGLE_ADS_TAG } from "@/constants/analytics";
import Seo from "@/components/Seo/Seo";

export default function App({ Component, pageProps }: AppProps) {
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
          <Seo />
          <Header />

          <Component {...pageProps} />
          <ToastContainer theme="dark" newestOnTop autoClose={3000} />
          <Footer />
        </CartProvider>
      </LanguageProvider>
    </>
  );
}
