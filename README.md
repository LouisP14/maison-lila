# 🍽️ Maison Lila - Site Web Restaurant

> **Projet Portfolio** - Site web complet pour restaurant gastronomique avec système de réservation

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://prisma.io/)

## 🎯 À Propos

**Maison Lila** est un site web moderne et élégant conçu pour un restaurant gastronomique fictif. Ce projet démontre mes compétences en développement full-stack avec les technologies les plus récentes.

### ✨ Caractéristiques Principales

- **🎨 Design Premium** - Interface utilisateur élégante avec palette de couleurs raffinée
- **📱 100% Responsive** - Optimisé pour tous les appareils (mobile, tablette, desktop)
- **🚀 Performance Optimale** - Next.js 15 avec App Router pour des performances maximales
- **🔒 Système de Réservation** - API complète avec validation et confirmation par email
- **📊 Base de Données** - Gestion complète avec Prisma ORM et SQLite
- **🎯 UX/UI Optimisée** - Navigation intuitive et expérience utilisateur fluide

## 🛠️ Stack Technique

### Frontend

- **Next.js 15.5.4** - Framework React avec App Router
- **TypeScript** - Typage statique pour un code robuste
- **Tailwind CSS 3.4** - Framework CSS utilitaire
- **React Hooks** - Gestion d'état moderne

### Backend

- **Next.js API Routes** - API REST intégrée
- **Prisma ORM** - Interface de base de données type-safe
- **SQLite** - Base de données légère et performante
- **Zod** - Validation de schémas TypeScript-first

### Fonctionnalités

- **Nodemailer** - Système d'envoi d'emails
- **NextAuth** - Authentification sécurisée
- **Responsive Design** - Compatible tous écrans
- **SEO Optimized** - Métadonnées et structure optimales

## 📋 Fonctionnalités

### 🏠 Page d'Accueil

- Hero section avec call-to-action
- Présentation des plats signature
- Témoignages clients
- Informations pratiques

### 🍽️ Menu Interactif

- Navigation par catégories
- Filtrage des plats
- Affichage des allergènes
- Prix et descriptions détaillées

### 📸 Galerie Photos

- Images haute qualité via Unsplash
- Layout masonry responsive
- Descriptions détaillées
- Expérience immersive

### ⭐ Système d'Avis

- Affichage des notes moyennes
- Répartition par étoiles
- Commentaires clients
- Interface d'administration

### 📅 Réservations

- **Formulaire interactif** avec validation
- **Vérification de disponibilité** en temps réel
- **Confirmation par email** automatique
- **API RESTful** complète

### 📝 Blog & Articles

- Gestion de contenu dynamique
- Catégorisation des articles
- Interface de lecture optimisée
- SEO-friendly

### 📞 Contact

- Formulaire de contact
- Informations pratiques
- Carte interactive
- Horaires d'ouverture

## 🚀 Installation & Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone [url-repo]
cd maison-lila

# Installer les dépendances
npm install

# Configurer la base de données
npx prisma generate
npx prisma db push

# Alimenter la base de données (optionnel)
npx tsx scripts/seed-database.ts
npx tsx scripts/seed-articles.ts

# Variables d'environnement (optionnel pour emails)
cp .env.example .env.local
```

### Démarrage

```bash
# Mode développement
npm run dev

# Build production
npm run build
npm start
```

Le site sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
maison-lila/
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # Routes API
│   ├── reservation/       # Système de réservation
│   ├── menu/             # Page menu
│   ├── galerie/          # Galerie photos
│   └── ...               # Autres pages
├── components/           # Composants React réutilisables
│   ├── ui/              # Composants UI de base
│   ├── layout/          # Layout components
│   └── sections/        # Sections de pages
├── lib/                 # Utilitaires et configurations
│   ├── prisma.ts       # Client Prisma
│   ├── mailer.ts       # Système d'email
│   └── utils/          # Fonctions utilitaires
├── prisma/             # Schéma et migrations
├── public/             # Assets statiques
└── styles/             # Styles globaux
```

## 🎨 Design System

### Palette de Couleurs

- **Primary** : `#8AA6A3` (Sage doux)
- **Background** : `#FAF8F6` (Crème chaleureux)
- **Text** : `#2B2B2B` (Charcoal moderne)
- **Accent** : Dégradés harmonieux

### Typographie

- **Headings** : Poids variables pour hiérarchie claire
- **Body** : Lisibilité optimale sur tous supports
- **Responsive** : Tailles adaptatives

## 🔧 APIs Développées

### `/api/reservations`

- `POST` - Créer une réservation
- Validation des données
- Vérification de disponibilité
- Envoi email automatique

### `/api/avis`

- `GET` - Récupérer les avis
- `POST` - Soumettre un avis
- Système de modération

### `/api/contact`

- `POST` - Traitement des messages
- Validation et sécurité

## 📊 Données & Modèles

### Base de Données (Prisma)

- **Restaurant** - Informations générales
- **Plats** - Menu avec catégories
- **Avis** - Système de notation
- **Réservations** - Gestion complète
- **Articles** - Contenu blog

### Seeding

Base de données pré-remplie avec du contenu réaliste pour démonstration.

## 🌟 Points Forts Techniques

- **Performance** - Optimisations Next.js (SSR, SSG, ISR)
- **Accessibilité** - WCAG 2.1 compliant
- **SEO** - Métadonnées et structure optimales
- **Sécurité** - Validation côté client et serveur
- **Type Safety** - TypeScript end-to-end
- **Architecture** - Code modulaire et maintenable

## 📱 Responsive Design

✅ **Mobile First** - Design pensé mobile d'abord  
✅ **Tablette** - Adaptation parfaite pour iPad  
✅ **Desktop** - Expérience optimale grand écran  
✅ **4K/Ultra-wide** - Support des grands formats

## 🎯 Objectifs Portfolio

Ce projet démontre :

- **🏗️ Architecture Full-Stack** moderne
- **🎨 Compétences UI/UX** avancées
- **⚡ Optimisation Performance** web
- **🔒 Sécurité & Validation** robustes
- **📱 Responsive Design** expert
- **🛠️ Stack Technique** récente
- **📊 Gestion de Données** complète
- **✉️ Intégrations Tierces** (emails)

## 🚀 Déploiement

Le projet est prêt pour déploiement sur :

- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **Railway**
- **Digital Ocean**

---

**Développé avec** ❤️ | **Stack** Next.js 15 + TypeScript + Tailwind CSS + Prisma  
**Type** Projet Portfolio Full-Stack
