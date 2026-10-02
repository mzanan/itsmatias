import type { NextConfig } from "next";
import { posthogRewrites, trailingSlashRedirect } from "./src/lib/analytics";

const nextConfig: NextConfig = {
  reactCompiler: true,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return posthogRewrites;
  },
  async redirects() {
    return [trailingSlashRedirect];
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
