import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Oswald, Spectral_SC } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "@/styles/animations.css";
import Script from "next/script";
import { GOOGLE_ADS_TAG } from "@/constants/analytics";
import Seo from "@/components/Seo/Seo";
import SlowLoadIndicator from "@/components/SlowLoadIndicator/SlowLoadIndicator";

// Self-hosted at build time (no render-blocking Google Fonts stylesheet, no
// third-party connections). `latin` + `cyrillic` cover every glyph used by the
// uk/ru copy; next/font also generates a size-adjusted fallback face, so the
// swap does not shift layout.
// Oswald is a variable font: one file per subset covers weights 200-700.
const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Spectral SC is static: ship only the weights the site actually renders
// (400/600/700/800; the CSS asks for 900, which resolves to 800). It is used
// for headings and nav, so it is not preloaded ahead of the hero.
const spectralSC = Spectral_SC({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Font families as global custom properties on :root, so they also
          reach the #overlay-root portal that lives outside #__next. (A plain
          <style> in <Head> instead of styled-jsx keeps the runtime out of
          the bundle.) */}
      <Head>
        <style
          key="font-families"
          dangerouslySetInnerHTML={{
            __html: `:root{--font-family-primary:${oswald.style.fontFamily},sans-serif;--font-family-secondary:${spectralSC.style.fontFamily},serif}`,
          }}
        />
      </Head>

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

          <main id="main">
            <Component {...pageProps} />
          </main>
          <ToastContainer theme="dark" newestOnTop autoClose={3000} />
          <Footer />
          <SlowLoadIndicator />
        </CartProvider>
      </LanguageProvider>
    </>
  );
}
