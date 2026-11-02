import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ready for accounts / shop later: API routes, server actions, auth middleware.
  reactStrictMode: true,
  poweredByHeader: false,
  // Smaller Docker image for EasyPanel (copies .next/standalone)
  output: "standalone",
};

export default nextConfig;
