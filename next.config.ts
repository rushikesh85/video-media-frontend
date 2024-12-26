import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set the body size limit to 10 MB or whatever limit you require
    },
  },
};

export default nextConfig;
