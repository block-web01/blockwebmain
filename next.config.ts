import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Faster builds
  swcMinify: true,

  reactStrictMode: false,

  // ✅ Optimize heavy libraries
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // ✅ Image optimization (keep but restrict wildcard)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // ✅ Remove unnecessary tracing (not needed for your project)
  // outputFileTracingRoot: ❌ removed

  // ❌ REMOVE THESE (they slow build + hide real issues)
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

};

export default nextConfig;