import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seeding...");

  // Création du restaurant
  const restaurant = await prisma.restaurant.upsert({
    where: { id: "restaurant-main" },
    update: {},
    create: {
      id: "restaurant-main",
      nom: "Maison Lila",
      description:
        "Un écrin de saveurs au cœur de Paris, où la cuisine française traditionnelle rencontre la créativité contemporaine. Maison Lila vous invite à découvrir une expérience gastronomique unique dans un cadre chaleureux et élégant.",
      adresse: "123 Rue de la Paix, 75001 Paris",
      telephone: "01 42 00 00 00",
      email: "contact@maison-lila.fr",
      capacite: 60,
      horaires: {
        lundi: { ferme: true },
        mardi: { midi: "12h00-14h30", soir: "19h00-22h30" },
        mercredi: { midi: "12h00-14h30", soir: "19h00-22h30" },
        jeudi: { midi: "12h00-14h30", soir: "19h00-22h30" },
        vendredi: { midi: "12h00-14h30", soir: "19h00-23h00" },
        samedi: { midi: "12h00-15h00", soir: "19h00-23h00" },
        dimanche: { midi: "12h00-15h00", soir: "19h00-22h00" },
      },
    },
  });

  // Création des catégories
  const categories = await Promise.all([
    prisma.categorie.upsert({
      where: { nom: "Entrées" },
      update: {},
      create: { nom: "Entrées", ordre: 1 },
    }),
    prisma.categorie.upsert({
      where: { nom: "Plats principaux" },
      update: {},
      create: { nom: "Plats principaux", ordre: 2 },
    }),
    prisma.categorie.upsert({
      where: { nom: "Desserts" },
      update: {},
      create: { nom: "Desserts", ordre: 3 },
    }),
    prisma.categorie.upsert({
      where: { nom: "Boissons" },
      update: {},
      create: { nom: "Boissons", ordre: 4 },
    }),
  ]);

  // Création des plats
  const plats = [
    // Entrées
    {
      nom: "Velouté de potimarron aux châtaignes",
      description:
        "Un velouté onctueux préparé avec des potimarrons de saison et relevé par des éclats de châtaignes grillées. Servi avec des croûtons à l'huile de truffe.",
      prix: 14.5,
      tags: "vegetarien,sans_gluten,fait_maison",
      allergenes: "fruits_a_coque",
      categorieId: categories[0].id,
    },
    {
      nom: "Tartare de saumon à l'avocat",
      description:
        "Saumon frais de Norvège coupé au couteau, avocat crémeux, échalotes, câpres et aneth. Accompagné de pain de seigle grillé.",
      prix: 18,
      tags: "sans_gluten,fait_maison",
      allergenes: "poissons,gluten",
      categorieId: categories[0].id,
    },
    {
      nom: "Foie gras mi-cuit aux figues",
      description:
        "Foie gras de canard mi-cuit maison, compotée de figues au porto et pain d'épices artisanal. Un grand classique revisité.",
      prix: 26,
      tags: "specialite,fait_maison",
      allergenes: "gluten",
      categorieId: categories[0].id,
    },
    {
      nom: "Burrata aux tomates anciennes",
      description:
        "Burrata crémeuse d'Italie accompagnée de tomates anciennes colorées, basilic frais et huile d'olive vierge extra.",
      prix: 16,
      tags: "vegetarien,local,bio",
      allergenes: "lait",
      categorieId: categories[0].id,
    },

    // Plats principaux
    {
      nom: "Filet de bœuf Wellington",
      description:
        "Filet de bœuf français enrobé de duxelles de champignons et pâte feuilletée, sauce au vin rouge et purée de pommes de terre à la truffe.",
      prix: 42,
      tags: "specialite,fait_maison",
      allergenes: "gluten,lait",
      categorieId: categories[1].id,
    },
    {
      nom: "Bar en croûte de sel aux herbes",
      description:
        "Bar de ligne cuit en croûte de sel parfumée aux herbes de Provence. Servi avec légumes de saison et beurre blanc.",
      prix: 36,
      tags: "specialite,sans_gluten,fait_maison",
      allergenes: "poissons,lait",
      categorieId: categories[1].id,
    },
    {
      nom: "Risotto aux cèpes et parmesan",
      description:
        "Riz Arborio crémeux aux cèpes de Bordeaux, parmesan 24 mois d'affinage et huile de truffe blanche. Un délice automnal.",
      prix: 28,
      tags: "vegetarien,sans_gluten",
      allergenes: "lait",
      categorieId: categories[1].id,
    },
    {
      nom: "Suprême de volaille aux morilles",
      description:
        "Suprême de volaille fermière française, sauce crémeuse aux morilles fraîches et gratin dauphinois maison.",
      prix: 32,
      tags: "fait_maison,local",
      allergenes: "lait",
      categorieId: categories[1].id,
    },
    {
      nom: "Pavé de saumon confit à l'unilatéral",
      description:
        "Pavé de saumon cuit à basse température, écrasée de pommes de terre nouvelles à l'huile d'olive et légumes verts croquants.",
      prix: 34,
      tags: "sans_gluten,fait_maison",
      allergenes: "poissons",
      categorieId: categories[1].id,
    },
    {
      nom: "Carré d'agneau en croûte d'herbes",
      description:
        "Carré d'agneau de Sisteron, croûte aux herbes de Provence, ratatouille confite et jus corsé aux olives.",
      prix: 38,
      tags: "specialite,local,fait_maison",
      allergenes: "gluten",
      categorieId: categories[1].id,
    },

    // Desserts
    {
      nom: "Tarte fine aux pommes",
      description:
        "Pâte sablée croustillante, pommes de Normandie caramélisées et glace vanille Bourbon. Un classique intemporel.",
      prix: 12,
      tags: "vegetarien,fait_maison",
      allergenes: "gluten,lait,oeufs",
      categorieId: categories[2].id,
    },
    {
      nom: "Moelleux au chocolat Valrhona",
      description:
        "Cœur coulant au chocolat Guanaja 70%, glace pistache maison et coulis de fruits rouges.",
      prix: 14,
      tags: "vegetarien,fait_maison",
      allergenes: "gluten,lait,oeufs,fruits_a_coque",
      categorieId: categories[2].id,
    },
    {
      nom: "Tiramisu revisité aux fruits de saison",
      description:
        "Notre version du tiramisu italien avec mascarpone onctueux, biscuits imbibés au café et fruits de saison.",
      prix: 13,
      tags: "vegetarien",
      allergenes: "gluten,lait,oeufs",
      categorieId: categories[2].id,
    },
    {
      nom: "Crème brûlée à la vanille de Madagascar",
      description:
        "Crème brûlée traditionnelle parfumée à la vanille de Madagascar, caramélisée minute devant vous.",
      prix: 11,
      tags: "vegetarien,sans_gluten,fait_maison",
      allergenes: "lait,oeufs",
      categorieId: categories[2].id,
    },

    // Boissons
    {
      nom: "Sélection de vins au verre",
      description:
        "Nos sommeliers vous proposent une sélection de vins français au verre, rouge, blanc ou rosé.",
      prix: 8,
      tags: "local",
      allergenes: "anhydride_sulfureux",
      categorieId: categories[3].id,
    },
    {
      nom: "Café des grands crus",
      description:
        "Café arabica torréfié artisanalement, espresso, américano ou cappuccino.",
      prix: 4.5,
      tags: "bio,fait_maison",
      allergenes: "",
      categorieId: categories[3].id,
    },
  ];

  // Création des plats - ignore les erreurs si ils existent déjà
  try {
    for (const plat of plats) {
      await prisma.plat.create({ data: plat });
    }
    console.log(`✅ ${plats.length} plats créés`);
  } catch (error) {
    console.log("ℹ️ Plats déjà existants dans la base");
  }

  // Création des créneaux horaires
  const creneauxData = [];

  // Mardi à jeudi
  for (let jour = 2; jour <= 4; jour++) {
    // Service midi
    creneauxData.push({
      jour,
      heureDebut: "12:00",
      heureFin: "14:30",
      capaciteMax: 25,
    });
    // Service soir
    creneauxData.push({
      jour,
      heureDebut: "19:00",
      heureFin: "22:30",
      capaciteMax: 35,
    });
  }

  // Vendredi et samedi (capacité plus élevée)
  for (let jour = 5; jour <= 6; jour++) {
    creneauxData.push({
      jour,
      heureDebut: "12:00",
      heureFin: jour === 6 ? "15:00" : "14:30",
      capaciteMax: 30,
    });
    creneauxData.push({
      jour,
      heureDebut: "19:00",
      heureFin: "23:00",
      capaciteMax: 40,
    });
  }

  // Dimanche
  creneauxData.push(
    {
      jour: 0,
      heureDebut: "12:00",
      heureFin: "15:00",
      capaciteMax: 25,
    },
    {
      jour: 0,
      heureDebut: "19:00",
      heureFin: "22:00",
      capaciteMax: 30,
    }
  );

  for (const creneau of creneauxData) {
    await prisma.creneau.create({ data: creneau });
  }

  // Création des avis
  const avisData = [
    {
      auteur: "Marie Dubois",
      email: "marie.dubois@email.com",
      note: 5,
      commentaire:
        "Une expérience culinaire exceptionnelle ! Le service est impeccable et chaque plat est une œuvre d'art. Le filet de bœuf Wellington était absolument divin. Je recommande vivement !",
      approuve: true,
    },
    {
      auteur: "Jean-Pierre Martin",
      email: "jp.martin@email.com",
      note: 5,
      commentaire:
        "Maison Lila mérite largement sa réputation. L'ambiance est chaleureuse, le personnel aux petits soins et la cuisine raffinée. Le bar en croûte de sel était parfaitement cuit.",
      approuve: true,
    },
    {
      auteur: "Sophie Laurent",
      email: "sophie.laurent@email.com",
      note: 4,
      commentaire:
        "Très bon restaurant avec une belle sélection de plats. Le risotto aux cèpes était délicieux. Seul bémol : l'attente un peu longue entre les plats, mais cela valait le coup !",
      approuve: true,
    },
    {
      auteur: "Thomas Rousseau",
      email: "thomas.rousseau@email.com",
      note: 5,
      commentaire:
        "Un cadre magnifique pour un dîner en amoureux. La carte des vins est excellente et s'accorde parfaitement avec les plats. Le dessert au chocolat était un pur bonheur.",
      approuve: true,
    },
    {
      auteur: "Amélie Petit",
      email: "amelie.petit@email.com",
      note: 4,
      commentaire:
        "Restaurant de qualité avec des produits frais et de saison. J'ai particulièrement apprécié la burrata aux tomates anciennes. Service professionnel et attentionné.",
      approuve: true,
    },
    {
      auteur: "Pierre Moreau",
      email: "pierre.moreau@email.com",
      note: 5,
      commentaire:
        "Une adresse à retenir absolument ! La créativité du chef se ressent dans chaque assiette. Excellent rapport qualité-prix pour ce niveau de prestation.",
      approuve: true,
    },
    {
      auteur: "Isabelle Durand",
      email: "isabelle.durand@email.com",
      note: 4,
      commentaire:
        "Très belle découverte ! L'ambiance est parfaite pour un déjeuner d'affaires ou un dîner entre amis. Le tartare de saumon était frais et parfaitement assaisonné.",
      approuve: true,
    },
    {
      auteur: "Michel Leclerc",
      email: "michel.leclerc@email.com",
      note: 5,
      commentaire:
        "Un sans-faute ! De l'accueil au dessert, tout était parfait. La carte change selon les saisons, ce qui garantit la fraîcheur des produits. Bravo à toute l'équipe !",
      approuve: true,
    },
  ];

  for (const avis of avisData) {
    await prisma.avis.create({ data: avis });
  }

  // Création de quelques articles de blog
  const articlesData = [
    {
      titre: "L'art de la cuisine de saison chez Maison Lila",
      slug: "art-cuisine-de-saison-maison-lila",
      extrait:
        "Découvrez comment notre chef privilégie les produits de saison pour créer des plats d'exception qui évoluent au rythme de la nature.",
      contenu: `# L'art de la cuisine de saison

Chez Maison Lila, nous croyons fermement que la qualité d'un plat commence par le choix de ses ingrédients. C'est pourquoi notre chef travaille exclusivement avec des produits de saison, source d'inspiration constante pour renouveler notre carte.

## Une philosophie du goût authentique

Chaque saison apporte ses trésors culinaires. Au printemps, nous célébrons les premiers légumes verts et les herbes fraîches. L'été nous offre la générosité des tomates anciennes et des fruits gorgés de soleil. L'automne révèle la richesse des champignons et des courges, tandis que l'hiver nous permet de sublimer les agrumes et les légumes racines.

## Partenariats avec les producteurs locaux

Notre engagement pour la qualité nous a naturellement menés vers des partenariats durables avec des producteurs locaux passionnés. Ces collaborations nous permettent de garantir la fraîcheur et la traçabilité de nos ingrédients, tout en soutenant l'agriculture française.

*Venez découvrir nos nouvelles créations saisonnières !*`,
      tags: "cuisine,saison,local,qualite",
      publie: true,
    },
    {
      titre: "Les secrets de notre carte des vins",
      slug: "secrets-carte-des-vins",
      extrait:
        "Notre sommelier vous révèle les secrets d'une carte des vins équilibrée, entre grands crus classiques et découvertes de vignerons passionnés.",
      contenu: `# Les secrets de notre carte des vins

La constitution d'une carte des vins est un art délicat qui demande expertise, passion et une connaissance approfondie des accords mets-vins.

## Une sélection rigoureuse

Notre sommelier parcourt les vignobles français à la recherche de vins d'exception. Grands crus classiques côtoient découvertes de jeunes vignerons audacieux, pour offrir une expérience gustative complète.

## L'importance des accords

Chaque vin de notre carte a été choisi pour s'harmoniser parfaitement avec nos plats. Des accords classiques aux mariages plus audacieux, nous privilégions toujours l'équilibre et la complémentarité des saveurs.`,
      tags: "vin,sommelier,accord,selection",
      publie: true,
    },
  ];

  for (const article of articlesData) {
    await prisma.article.create({ data: article });
  }

  console.log("✅ Seeding terminé avec succès !");
  console.log(`• Restaurant créé : ${restaurant.nom}`);
  console.log(`• ${categories.length} catégories créées`);
  console.log(`• ${plats.length} plats créés`);
  console.log(`• ${creneauxData.length} créneaux créés`);
  console.log(`• ${avisData.length} avis créés`);
  console.log(`• ${articlesData.length} articles créés`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Erreur lors du seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
