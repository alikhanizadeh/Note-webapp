import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

module.exports = {
  allowedDevOrigins: ["192.168.100.18"],
};

export default nextConfig;
