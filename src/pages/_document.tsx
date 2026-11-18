import { Html, Head, Main, NextScript } from "next/document";

// Fonts are self-hosted through `next/font/google` (see `_app.tsx`), so no
// render-blocking Google Fonts stylesheet or font-host preconnects live here.
export default function Document() {
  return (
    <Html lang="uk">
      <Head>
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
