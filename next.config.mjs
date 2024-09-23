/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  publicRuntimeConfig: {
    basePath: isProd ? "/mafia-club" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
