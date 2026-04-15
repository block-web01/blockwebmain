import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactStrictMode: false,

  // ✅ Optimize heavy libraries
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts", "date-fns", "@radix-ui/react-icons", "@radix-ui/react-avatar", "@radix-ui/react-select"],
  },

  // ✅ Image optimization (keep but restrict wildcard)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Aggressive compiling speed improvements
  generateEtags: false,
  poweredByHeader: false,
  
  // Keep pages in memory longer to prevent re-compilations
  onDemandEntries: {
    // Keep pages in the buffer for 1 hour
    maxInactiveAge: 60 * 60 * 1000,
    // Keep 10 pages in the buffer max
    pagesBufferLength: 10,
  },

  productionBrowserSourceMaps: false,

};

export default nextConfig;