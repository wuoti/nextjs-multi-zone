import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/shared"],
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "http://localhost:3001/blog",
      },
      {
        source: "/blog/:path*",
        destination: "http://localhost:3001/blog/:path*",
      },
      {
        source: "/dashboard",
        destination: "http://localhost:3002/dashboard",
      },
      {
        source: "/dashboard/:path*",
        destination: "http://localhost:3002/dashboard/:path*",
      },
    ];
  },
};

export default nextConfig;
