import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  
};

// Enable bundle analyzer only when ANALYZE=true
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
