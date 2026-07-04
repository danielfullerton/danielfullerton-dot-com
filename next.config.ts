import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  // Allow the dev server to serve /_next/* assets to other devices on the LAN
  // (e.g. an iPhone at 192.168.x.x). Without this, Next 15 blocks the
  // cross-origin dev requests and the phone gets an unstyled/blank page.
  allowedDevOrigins: ["192.168.1.21", "192.168.1.1", "localhost"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "https://danielfullerton.com",
  },
};

export default nextConfig;
