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
  // Target modern browsers to avoid legacy polyfills
  swcMinify: true,
  experimental: {
    // Optimize for modern browsers
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dropdown-menu",
      "@vercel/analytics",
    ],
    // Enable modern compilation for better performance (production only for Turbopack compatibility)
    ...(process.env.NODE_ENV === "production" && { forceSwcTransforms: true }),
  },
  // Enable source maps for better debugging and Lighthouse insights
  productionBrowserSourceMaps: true,
  // Enable compression
  compress: true,
  transpilePackages: [],
  // Optimize webpack for better chunking and CSS handling
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize CSS extraction and loading
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            // CSS chunk optimization to reduce critical path
            styles: {
              name: "styles",
              test: /\.(css|scss|sass)$/,
              chunks: "all",
              enforce: true,
              priority: 20,
            },
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
        },
        // Optimize module concatenation for smaller bundles
        concatenateModules: true,
        // Minimize unused exports
        usedExports: true,
        // Enable tree shaking
        sideEffects: false,
      };

      // Optimize analytics and external scripts
      config.module.rules.push({
        test: /node_modules\/@vercel\/analytics/,
        sideEffects: false,
      });

      // Exclude Next.js dev tools from production
      if (process.env.NODE_ENV === "production") {
        config.resolve.alias = {
          ...config.resolve.alias,
          "next/dist/compiled/next-devtools": false,
        };
      }

      // Further split vendor chunks for better caching
      if (config.optimization?.splitChunks?.cacheGroups) {
        config.optimization.splitChunks.cacheGroups.react = {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          chunks: "all",
          priority: 15,
        };
        config.optimization.splitChunks.cacheGroups.framer = {
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          name: "framer-motion",
          chunks: "all",
          priority: 12,
        };
      }
    }
    return config;
  },
  // Add headers for better caching and performance
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
    {
      source: "/fonts/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

const withMDX = createMDX({
  // Simplified configuration for Turbopack compatibility
  // Plugins will be loaded dynamically to avoid serialization issues
});

export default withMDX(nextConfig);
