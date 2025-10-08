import { AvisCard } from "@/components/AvisCard";
import { CardPlat } from "@/components/CardPlat";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getHomeData() {
  try {
    // Récupérer les données du restaurant, plats vedettes, et avis
    const [restaurant, platsVedettes, avis] = await Promise.all([
      prisma.restaurant.findFirst(),
      prisma.plat.findMany({
        where: {
          disponible: true,
          tags: {
            contains: "specialite",
          },
        },
        include: {
          categorie: true,
        },
        take: 4,
      }),
      prisma.avis.findMany({
        where: {
          approuve: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      }),
    ]);

    return { restaurant, platsVedettes, avis };
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    // Retourner des données par défaut en cas d'erreur de base de données
    return {
      restaurant: {
        id: "default",
        nom: "Maison Lila",
        description: "Restaurant gastronomique français situé au cœur de Paris",
        adresse: "15 Rue de la Paix, 75001 Paris",
        telephone: "+33 1 42 60 30 30",
        email: "contact@maison-lila.fr",
        horaires: {
          mardi: { midi: "12h-14h30", soir: "19h30-22h30" },
          mercredi: { midi: "12h-14h30", soir: "19h30-22h30" },
          jeudi: { midi: "12h-14h30", soir: "19h30-22h30" },
          vendredi: { midi: "12h-14h30", soir: "19h30-22h30" },
          samedi: { midi: "12h-14h30", soir: "19h30-22h30" },
        },
        capacite: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      platsVedettes: [
        {
          id: "foie-gras-1",
          nom: "Foie gras mi-cuit au Sauternes",
          description:
            "Foie gras de canard du Périgord, gelée de Sauternes, brioche toastée",
          prix: 45.0,
          image: null,
          tags: "signature,specialite",
          allergenes: "",
          disponible: true,
          categorieId: "signature",
          createdAt: new Date(),
          updatedAt: new Date(),
          categorie: {
            id: "signature",
            nom: "Signature",
            ordre: 0,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
      avis: [
        {
          id: "default-avis-1",
          auteur: "Marie Dubois",
          email: null,
          note: 5,
          commentaire:
            "Une expérience culinaire exceptionnelle ! Le foie gras était divin.",
          approuve: true,
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15"),
        },
      ],
    };
  }
}

export default async function Home() {
  const { restaurant, platsVedettes, avis } = await getHomeData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-cream-50 to-cream-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-repeat opacity-5"></div>

        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <p className="text-sage-400 font-medium text-sm uppercase tracking-wide mb-4">
              Restaurant gastronomique
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-charcoal-800 mb-6">
              Maison Lila
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Une expérience culinaire unique au cœur de Paris, où la tradition
              française rencontre la créativité contemporaine.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/reservation">
              <Button size="lg" className="px-8 py-4">
                Réserver une table
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="secondary" size="lg" className="px-8 py-4">
                Découvrir le menu
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce-subtle">
            <svg
              className="w-6 h-6 text-sage-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <SectionTitle
                subtitle="Notre histoire"
                title="L'excellence culinaire depuis 2018"
                align="left"
              />
              <div className="space-y-4 text-charcoal-600 leading-relaxed">
                <p>
                  {restaurant?.description ||
                    "Maison Lila est née de la passion de notre chef pour la gastronomie française traditionnelle et son désir d'innovation culinaire."}
                </p>
                <p>
                  Situés au cœur de Paris, nous privilégions les produits de
                  saison et les producteurs locaux pour créer une cuisine
                  authentique et raffinée qui éveille les sens et crée des
                  souvenirs inoubliables.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-600">50</div>
                  <div className="text-sm text-charcoal-600">Couverts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-600">2018</div>
                  <div className="text-sm text-charcoal-600">Ouverture</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sage-600">4.8</div>
                  <div className="text-sm text-charcoal-600">Note moyenne</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-cream-100 rounded-2xl overflow-hidden shadow-soft-lg">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=600&fit=crop&crop=center"
                  alt="Intérieur élégant du restaurant Maison Lila"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage-400 rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="font-serif text-2xl font-bold">ML</div>
                  <div className="text-xs">Est. 2018</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plats vedettes */}
      {platsVedettes.length > 0 && (
        <section className="py-16 md:py-24 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              subtitle="Nos spécialités"
              title="Plats signature"
              description="Découvrez nos créations les plus appréciées, préparées avec passion et savoir-faire."
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {platsVedettes.map((plat: any) => (
                <CardPlat key={plat.id} plat={plat} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/menu">
                <Button variant="outline" size="lg">
                  Voir le menu complet
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Avis clients */}
      {avis.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              subtitle="Témoignages"
              title="Ce que disent nos clients"
              description="L'expérience Maison Lila à travers les yeux de ceux qui nous font confiance."
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avis.map((avisItem: any) => (
                <AvisCard key={avisItem.id} avis={avisItem} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/avis">
                <Button variant="ghost">Lire tous les avis</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Informations pratiques */}
      <section className="py-16 md:py-24 bg-charcoal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Adresse */}
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-sage-400 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Adresse</h3>
              <p className="text-gray-300">
                {restaurant?.adresse || "123 Rue de la Paix, 75001 Paris"}
              </p>
            </div>

            {/* Téléphone */}
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-sage-400 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Réservations</h3>
              <p className="text-gray-300">
                <a
                  href={`tel:${restaurant?.telephone || "0142000000"}`}
                  className="hover:text-sage-300 transition-colors"
                >
                  {restaurant?.telephone || "01 42 00 00 00"}
                </a>
              </p>
            </div>

            {/* Horaires */}
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-sage-400 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Horaires</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mar - Jeu : 12h-14h30 • 19h-22h30</p>
                <p>Ven - Sam : 12h-14h30 • 19h-23h</p>
                <p>Dim : 12h-15h • 19h-22h</p>
                <p className="text-red-400 font-medium">Lun : Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-sage-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
            Prêt pour une expérience inoubliable ?
          </h2>
          <p className="text-lg text-sage-100 mb-8 max-w-2xl mx-auto">
            Réservez dès maintenant votre table et laissez-vous emporter par
            notre univers culinaire unique.
          </p>
          <Link href="/reservation">
            <Button
              size="lg"
              className="bg-white text-sage-600 hover:bg-cream-50 px-8 py-4"
            >
              Réserver maintenant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
