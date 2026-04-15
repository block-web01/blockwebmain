import type { NextConfig } from "next";

// ✅ Validate required environment variables at build time
const validateEnvVars = () => {
  const requiredEnvs = [
    "NEXTAUTH_URL",
    "NEXTAUTH_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "MONGODB_URI",
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
  ];

  const missing: string[] = [];
  requiredEnvs.forEach((envVar) => {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  });

  if (missing.length > 0) {
    console.warn(
      `⚠️  Missing environment variables: ${missing.join(", ")}\n` +
      `   Please set these in:\n` +
      `   1. .env.local (for local development)\n` +
      `   2. Vercel Dashboard → Settings → Environment Variables (for deployment)\n`
    );
  }
};

// Run validation at build time
if (process.env.NODE_ENV === "production") {
  validateEnvVars();
}

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
      {
        protocol: "https",
        hostname: "www.google.com",
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