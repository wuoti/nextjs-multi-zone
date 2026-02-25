import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/dashboard",
  transpilePackages: ["@repo/shared"],
};

export default nextConfig;
