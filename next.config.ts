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
    // Enable modern compilation for better performance (production only for Turbopack compatibility)
    ...(process.env.NODE_ENV === "production" && { forceSwcTransforms: true }),
  },
  // Enable compression
  compress: true,
  transpilePackages: [],
  // Optimize webpack for better chunking
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

const withMDX = createMDX({
  // Simplified configuration for Turbopack compatibility
  // Plugins will be loaded dynamically to avoid serialization issues
});

export default withMDX(nextConfig);
