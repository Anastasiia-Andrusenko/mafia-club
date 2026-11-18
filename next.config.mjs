import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

// Long-lived caching for the media in /public (Vercel serves public/ with
// max-age=0 by default). Filenames are not content-hashed, so keep the TTL
// moderate and let stale-while-revalidate hide re-fetches.
const mediaCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=604800",
  },
];

// ---------------------------------------------------------------------------
// Security headers (production only: `next dev` needs eval + a websocket for
// HMR, which a strict CSP would break).
//
// The site is statically generated, so a per-request nonce is not possible and
// inline scripts (the gtag bootstrap in _app.tsx, Next's own bootstrap) need
// 'unsafe-inline'. Everything else is pinned to the origins the site really
// talks to:
//   - Google Ads / gtag: gtag.js + its conversion / remarketing beacons
//     (googletagmanager, googleadservices, doubleclick, google.com[.ua])
//   - EmailJS: api.emailjs.com (lead delivery)
//   - YouTube: click-to-load facade embeds youtube-nocookie.com
// Trusted Types is intentionally not enabled: gtag.js and Next 14 write to
// innerHTML / script.src without a policy.
// ---------------------------------------------------------------------------
const googleHosts = [
  "https://*.google.com",
  "https://*.google.com.ua",
  "https://*.googleadservices.com",
  "https://*.doubleclick.net",
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
];

// Preview deployments get the Vercel toolbar (comments / feedback widget);
// allow it there only, so production stays as tight as possible.
const isPreview = process.env.VERCEL_ENV === "preview";
const vercelLive = isPreview ? " https://vercel.live" : "";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${googleHosts.join(" ")}${vercelLive}`,
  `style-src 'self' 'unsafe-inline'${vercelLive}`,
  // Tracking pixels come from several Google country domains, and gallery /
  // shop images are all same-origin, so images are allowed over https.
  "img-src 'self' data: blob: https:",
  `font-src 'self' data:${isPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self' https://api.emailjs.com ${googleHosts.join(" ")}${isPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src https://www.youtube-nocookie.com https://www.youtube.com https://td.doubleclick.net https://www.googletagmanager.com${vercelLive}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Legacy clickjacking guard for browsers without CSP frame-ancestors.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // `same-origin-allow-popups` isolates the browsing context group but keeps
  // window.open() popups working (Google Tag Assistant / ads previews).
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // 2 years, no includeSubDomains/preload so no other subdomain is committed.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Canonical URLs, sitemap.xml and internal links all use a trailing slash.
  trailingSlash: true,
  experimental: {
    // Make sure the reviews backup is bundled with the serverless function.
    outputFileTracingIncludes: {
      "/api/reviews": ["./public/reviews.json"],
    },
  },
  images: {
    // Thumbnails are pre-generated as static files (scripts/optimize-media.mjs),
    // so the Vercel runtime image optimizer (and its quota) is never involved.
    unoptimized: true,
  },
  webpack(config) {
    // `import data from "@/lotties/load.json?dotlottie"` unpacks the dotLottie
    // archive at build time into plain Lottie JSON (see the loader for why).
    config.module.rules.push({
      test: /\.json$/,
      resourceQuery: /dotlottie/,
      type: "javascript/auto",
      use: [{ loader: path.join(rootDir, "scripts/dotlottie-loader.cjs") }],
    });
    return config;
  },
  async headers() {
    return [
      ...(isProd ? [{ source: "/:path*", headers: securityHeaders }] : []),
      { source: "/images/:path*", headers: mediaCacheHeaders },
      { source: "/img/:path*", headers: mediaCacheHeaders },
    ];
  },
};

export default nextConfig;
