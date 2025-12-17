import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // <-- THIS STOPS ALL VERCEL IMAGE OPTIMIZATION
  },
};

// Enable bundle analyzer only when ANALYZE=true
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
