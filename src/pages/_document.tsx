import { Html, Head, Main, NextScript } from "next/document";

// Fonts are self-hosted through `next/font/google` (see `_app.tsx`), so no
// render-blocking Google Fonts stylesheet or font-host preconnects live here.
export default function Document() {
  return (
    <Html lang="uk">
      <Head>
        {/* First thing in <head>: paint the dark canvas before any external
            CSS has arrived, so a hard reload / first visit never flashes
            white. globals.css sets the same html colour and the body
            gradient (it comes later, so it wins for body). */}
        <style
          dangerouslySetInnerHTML={{
            __html: "html,body{background-color:#000}",
          }}
        />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon-v2.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon-v2.ico" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="overlay-root"></div>
      </body>
    </Html>
  );
}
