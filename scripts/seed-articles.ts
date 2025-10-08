import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const articles = [
  {
    titre: "Les secrets de notre risotto aux champignons de saison",
    slug: "risotto-champignons-saison",
    extrait:
      "Découvrez la recette signature de notre chef et les techniques qui rendent ce plat inoubliable.",
    contenu: `
      <h2>Un plat emblématique de l'automne</h2>
      <p>Notre risotto aux champignons de saison est devenu l'une des spécialités les plus appréciées de Maison Lila. Chaque automne, nous sélectionnons les meilleurs champignons de nos producteurs locaux pour créer ce plat réconfortant et raffiné.</p>
      
      <h3>Le secret : la sélection des champignons</h3>
      <p>Nous utilisons un mélange de cèpes, girolles et pleurotes fraîchement cueillis. Chaque variété apporte sa propre texture et ses arômes uniques au plat.</p>
      
      <blockquote>
        <p>"La qualité d'un risotto se mesure à la patience qu'on lui accorde et à la qualité des ingrédients choisis."</p>
        <cite>— Chef Antoine, Maison Lila</cite>
      </blockquote>
      
      <h3>La technique du risotto parfait</h3>
      <ul>
        <li>Utiliser du riz Arborio de première qualité</li>
        <li>Maintenir le bouillon à température constante</li>
        <li>Remuer constamment pour libérer l'amidon</li>
        <li>Ajouter le parmesan hors du feu</li>
      </ul>
      
      <p>Ce plat est disponible sur notre carte d'automne, accompagné d'une sélection de vins de la vallée du Rhône.</p>
    `,
    image: null,
    categorie: "Recettes",
    tags: "risotto,champignons,automne,recette,chef",
    publie: true,
  },
  {
    titre: "Nouvelle carte d'hiver : focus sur les produits de saison",
    slug: "carte-hiver-produits-saison",
    extrait:
      "Découvrez notre nouvelle carte d'hiver qui met à l'honneur les produits locaux et de saison.",
    contenu: `
      <h2>L'hiver s'installe à Maison Lila</h2>
      <p>Avec l'arrivée de l'hiver, nous avons le plaisir de vous présenter notre nouvelle carte saisonnière, conçue autour des produits qui font la richesse de cette période de l'année.</p>
      
      <h3>Les nouveautés de la carte</h3>
      <p>Cette saison, nous avons développé plusieurs nouveaux plats qui célèbrent les saveurs hivernales :</p>
      
      <ul>
        <li><strong>Velouté de potimarron</strong> aux châtaignes et huile de noisette</li>
        <li><strong>Cuissot d'agneau confit</strong> aux herbes de Provence et gratin dauphinois</li>
        <li><strong>Tarte fine aux poires</strong> et chocolat, glace vanille bourbon</li>
      </ul>
      
      <h3>Nos partenaires producteurs</h3>
      <p>Nous travaillons étroitement avec nos producteurs locaux pour vous offrir des ingrédients d'exception :</p>
      
      <ul>
        <li>Ferme des Collines pour nos légumes de saison</li>
        <li>Fromagerie Dubois pour nos fromages affinés</li>
        <li>Boucherie Martin pour nos viandes Label Rouge</li>
      </ul>
      
      <p>Cette carte sera disponible jusqu'au 20 mars. Réservez dès maintenant pour découvrir ces nouvelles créations !</p>
    `,
    image: null,
    categorie: "Actualités",
    tags: "carte,hiver,saison,nouveauté,producteurs",
    publie: true,
  },
  {
    titre: "Atelier cuisine : apprenez à faire des pâtes fraîches",
    slug: "atelier-pates-fraiches",
    extrait:
      "Rejoignez-nous pour un atelier exceptionnel où vous apprendrez l'art de faire des pâtes fraîches comme en Italie.",
    contenu: `
      <h2>Un voyage culinaire en Italie</h2>
      <p>Le samedi 15 février, Maison Lila vous propose un atelier cuisine exceptionnel dédié à l'art des pâtes fraîches. Notre chef Antoine partagera avec vous les techniques traditionnelles italiennes.</p>
      
      <h3>Au programme</h3>
      <ul>
        <li>Préparation de la pâte à partir de farine de blé dur</li>
        <li>Techniques de laminage et découpe</li>
        <li>Réalisation de tagliatelles, raviolis et gnocchis</li>
        <li>Préparation de sauces d'accompagnement</li>
        <li>Dégustation avec accord mets-vins</li>
      </ul>
      
      <h3>Informations pratiques</h3>
      <p><strong>Date :</strong> Samedi 15 février 2025<br>
      <strong>Horaires :</strong> 14h00 - 17h00<br>
      <strong>Tarif :</strong> 75€ par personne<br>
      <strong>Nombre de places :</strong> Limité à 12 participants</p>
      
      <p>L'atelier comprend tous les ingrédients, le matériel, les recettes à emporter et la dégustation avec vins.</p>
      
      <p><em>Réservations au 01 42 34 56 78 ou par email à contact@maison-lila.fr</em></p>
    `,
    image: null,
    categorie: "Événements",
    tags: "atelier,cuisine,pâtes,italie,formation",
    publie: true,
  },
  {
    titre: "L'art de dresser une assiette : conseils de notre chef",
    slug: "art-dresser-assiette",
    extrait:
      "Notre chef partage ses secrets pour transformer vos plats en véritables œuvres d'art culinaire.",
    contenu: `
      <h2>La cuisine, c'est aussi l'art visuel</h2>
      <p>Le dressage d'une assiette est un art qui demande technique, créativité et patience. Aujourd'hui, je partage avec vous quelques-uns de mes secrets pour sublimer vos créations culinaires.</p>
      
      <h3>Les règles de base</h3>
      <p>Avant toute chose, il faut respecter quelques principes fondamentaux :</p>
      
      <ul>
        <li><strong>L'assiette doit être parfaitement propre</strong> - Aucune trace, aucune goutte parasite</li>
        <li><strong>Respecter les proportions</strong> - Ne pas surcharger l'assiette</li>
        <li><strong>Jouer avec les hauteurs</strong> - Créer du relief et de la dynamique</li>
        <li><strong>Harmonie des couleurs</strong> - Équilibrer les teintes chaudes et froides</li>
      </ul>
      
      <h3>Les techniques avancées</h3>
      <p>Une fois ces bases maîtrisées, vous pouvez explorer des techniques plus sophistiquées :</p>
      
      <h4>Le dressage en trois points</h4>
      <p>Cette technique consiste à disposer les éléments selon un triangle imaginaire, créant un équilibre visuel naturel.</p>
      
      <h4>L'utilisation des sauces</h4>
      <p>Les sauces ne sont pas qu'un accompagnement gustatif, elles sont aussi un élément décoratif. Utilisez une cuillère ou un pinceau pour créer des traits élégants.</p>
      
      <blockquote>
        <p>"On mange d'abord avec les yeux. Un plat bien dressé réveille tous les sens avant même la première bouchée."</p>
      </blockquote>
      
      <p>N'hésitez pas à vous entraîner chez vous et à venir nous montrer vos créations lors de votre prochaine visite !</p>
    `,
    image: null,
    categorie: "Conseils",
    tags: "dressage,technique,chef,art,cuisine",
    publie: true,
  },
  {
    titre: "Maison Lila fête ses 3 ans !",
    slug: "maison-lila-3-ans",
    extrait:
      "Trois années d'aventure culinaire, de rencontres et de partage. Retour sur nos plus beaux moments.",
    contenu: `
      <h2>Trois années d'émotions</h2>
      <p>Il y a trois ans jour pour jour, Maison Lila ouvrait ses portes dans ce quartier que nous aimons tant. Aujourd'hui, nous souhaitons partager avec vous quelques moments marquants de cette belle aventure.</p>
      
      <h3>Les moments forts</h3>
      <ul>
        <li><strong>2022 :</strong> Ouverture et première étoile au guide local</li>
        <li><strong>2023 :</strong> Prix du "Meilleur restaurant de quartier"</li>
        <li><strong>2024 :</strong> Lancement de nos ateliers cuisine</li>
        <li><strong>2025 :</strong> Nouvelle équipe et carte renouvelée</li>
      </ul>
      
      <h3>Merci à vous</h3>
      <p>Cette aventure, c'est avant tout grâce à vous, nos fidèles clients, que nous la vivons avec tant de bonheur. Vos sourires, vos retours, vos suggestions nous nourrissent chaque jour.</p>
      
      <h3>Les projets à venir</h3>
      <p>Pour cette nouvelle année, nous préparons de belles surprises :</p>
      <ul>
        <li>Extension de notre terrasse au printemps</li>
        <li>Nouveaux ateliers de pâtisserie</li>
        <li>Collaboration avec de nouveaux producteurs</li>
        <li>Événements privés sur mesure</li>
      </ul>
      
      <p>Rendez-vous très bientôt pour célébrer ensemble cette nouvelle étape !</p>
    `,
    image: null,
    categorie: "Actualités",
    tags: "anniversaire,3ans,histoire,équipe,projets",
    publie: true,
  },
];

async function seedArticles() {
  console.log("🌱 Ajout des articles de blog...");

  for (const article of articles) {
    await prisma.article.create({
      data: article,
    });
    console.log(`✅ Article créé : ${article.titre}`);
  }

  console.log("✨ Articles ajoutés avec succès !");
}

seedArticles()
  .catch((e) => {
    console.error("❌ Erreur lors de l'ajout des articles :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
