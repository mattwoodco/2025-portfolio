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
};

const withMDX = createMDX({
  // Simplified configuration for Turbopack compatibility
  // Plugins will be loaded dynamically to avoid serialization issues
});

export default withMDX(nextConfig);
