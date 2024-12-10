import Header from "@/components/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/Footer/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <CartProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
      </CartProvider>
    </LanguageProvider>
  );
}
