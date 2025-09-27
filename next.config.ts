import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  compiler: {
    // Remove unused imports to reduce bundle size
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // Optimize for modern browsers
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

const withMDX = createMDX({
  // Simplified configuration for Turbopack compatibility
  // Plugins will be loaded dynamically to avoid serialization issues
});

export default withMDX(nextConfig);
