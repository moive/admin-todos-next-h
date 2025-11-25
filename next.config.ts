import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo.tailadmin.com",
      },
    ],
  },
};

export default nextConfig;
