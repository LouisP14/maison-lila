// Script d'initialisation de la base de données pour la production
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Initialisation de la base de données...')
  
  try {
    // Données de base du restaurant
    const restaurant = await prisma.restaurant.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        nom: 'Maison Lila',
        description: 'Restaurant gastronomique français situé au cœur de Paris',
        adresse: '15 Rue de la Paix, 75001 Paris',
        telephone: '+33 1 42 60 30 30',
        email: 'contact@maison-lila.fr',
        horaires: {
          mardi: { midi: "12h-14h30", soir: "19h30-22h30" },
          mercredi: { midi: "12h-14h30", soir: "19h30-22h30" },
          jeudi: { midi: "12h-14h30", soir: "19h30-22h30" },
          vendredi: { midi: "12h-14h30", soir: "19h30-22h30" },
          samedi: { midi: "12h-14h30", soir: "19h30-22h30" }
        },
        capacite: 60
      }
    })

    // Catégories
    const categories = [
      { nom: 'Entrées', ordre: 1 },
      { nom: 'Plats Principaux', ordre: 2 },
      { nom: 'Desserts', ordre: 3 },
      { nom: 'Signature', ordre: 0 }
    ]

    for (const cat of categories) {
      await prisma.categorie.upsert({
        where: { nom: cat.nom },
        update: {},
        create: cat
      })
    }

    // Quelques plats essentiels
    const signatureCategory = await prisma.categorie.findFirst({ where: { nom: 'Signature' } })
    const entreesCategory = await prisma.categorie.findFirst({ where: { nom: 'Entrées' } })

    if (signatureCategory) {
      await prisma.plat.upsert({
        where: { id: 'foie-gras-1' },
        update: {},
        create: {
          id: 'foie-gras-1',
          nom: 'Foie gras mi-cuit au Sauternes',
          description: 'Foie gras de canard du Périgord, gelée de Sauternes, brioche toastée',
          prix: 45.00,
          disponible: true,
          tags: 'signature',
          allergenes: '',
          categorieId: signatureCategory.id
        }
      })
    }

    console.log('✅ Base de données initialisée avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })