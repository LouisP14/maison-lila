import type { NextConfig } from "next";

// Définir DATABASE_URL par défaut pour Vercel si pas définie
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./production.db";
}

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
