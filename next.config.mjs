/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  publicRuntimeConfig: {
    basePath: isProd ? "/my-mood-playlist" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
