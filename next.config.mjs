/** @type {import('next').NextConfig} */

// Long-lived caching for the media in /public (Vercel serves public/ with
// max-age=0 by default). Filenames are not content-hashed, so keep the TTL
// moderate and let stale-while-revalidate hide re-fetches.
const mediaCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=86400, stale-while-revalidate=604800",
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
    // Media pipeline is refactored separately; keep as-is for now.
    unoptimized: true,
  },
  async headers() {
    return [
      { source: "/images/:path*", headers: mediaCacheHeaders },
      { source: "/img/:path*", headers: mediaCacheHeaders },
    ];
  },
};

export default nextConfig;
