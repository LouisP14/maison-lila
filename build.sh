#!/bin/bash
# Script de build pour Vercel

# Créer la base de données si elle n'existe pas
npx prisma db push --force-reset

# Générer le client Prisma
npx prisma generate

# Seed la base de données avec les données initiales
npx tsx scripts/seed.ts || echo "Seed script not found, continuing..."

# Build Next.js
next build