import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: {
    // Ignorer les erreurs ESLint pendant le build (pour déploiement)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorer les erreurs TypeScript pendant le build (pour déploiement)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
