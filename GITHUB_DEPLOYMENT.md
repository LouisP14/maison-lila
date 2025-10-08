# 🚀 Guide de Déploiement GitHub - Maison Lila

## 📋 **Étapes pour publier sur GitHub**

### 1. **Initialisation Git**

```bash
cd "c:\Users\poula\Desktop\Projet DEV\maison-lila"
git init
git branch -M main
```

### 2. **Préparer les fichiers**

```bash
# Ajouter tous les fichiers (sauf ceux dans .gitignore)
git add .

# Créer le commit initial
git commit -m "🎉 Initial commit: Maison Lila - Restaurant website"
```

### 3. **Créer le repository sur GitHub**

- Aller sur GitHub.com
- Cliquer sur "New repository"
- Nom: `maison-lila` ou `restaurant-website`
- Description: `🍽️ Site web moderne pour restaurant gastronomique - Next.js 15 + TypeScript + Prisma`
- ✅ Public (pour portfolio)
- ❌ Ne pas initialiser avec README (on a déjà le nôtre)

### 4. **Lier au repository distant**

```bash
# Remplacer YOUR_USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/YOUR_USERNAME/maison-lila.git

# Pousser sur GitHub
git push -u origin main
```

## 🌟 **Après le push - Optimisations GitHub**

### **1. Topics/Tags à ajouter**

```
nextjs, typescript, tailwindcss, prisma, restaurant, portfolio, fullstack, react, sqlite, responsive-design
```

### **2. Description Repository**

```
🍽️ Site web moderne pour restaurant gastronomique - Next.js 15 + TypeScript + Tailwind CSS + Prisma ORM
```

### **3. GitHub Pages (optionnel)**

- Settings > Pages > Deploy from branch: `main`
- Ou encore mieux : déployer sur **Vercel** directement depuis GitHub

## 🚀 **Déploiement Automatique avec Vercel**

### **Option 1: Via GitHub (recommandé)**

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Importer le repository `maison-lila`
4. Vercel détecte automatiquement Next.js
5. Déploiement automatique ! 🎉

### **Option 2: Variables d'environnement** (pour emails)

```env
# Dans Vercel Dashboard > Settings > Environment Variables
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app

# Optionnel pour les emails
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM=noreply@your-domain.com
```

## 📱 **URLs de Demo**

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/maison-lila`
- **Live Demo** (Vercel): `https://maison-lila-your-username.vercel.app`

## 🎯 **Checklist Finale**

- ✅ Code 100% clean (0 erreur)
- ✅ README professionnel
- ✅ .gitignore configuré
- ✅ Base de données seeded
- ✅ 4 plats signature fonctionnels
- ✅ Système de réservation opérationnel
- ✅ Design responsive parfait
- ✅ Prêt pour portfolio !

---

**🎊 Félicitations !** Votre projet **Maison Lila** est maintenant live sur GitHub et prêt à impressionner dans votre portfolio !

**Next steps**: Partager le lien dans votre portfolio, LinkedIn, CV... 🚀
