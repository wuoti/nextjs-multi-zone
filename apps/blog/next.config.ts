import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/blog",
  transpilePackages: ["@repo/shared"],
};

export default nextConfig;
