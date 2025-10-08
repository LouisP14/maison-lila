import { CardPlat } from "@/components/CardPlat";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Menu - Carte des plats",
  description:
    "Découvrez notre carte gastronomique avec des plats raffinés préparés avec des produits de saison. Filtrez par catégorie, allergènes et régimes alimentaires.",
  keywords: [
    "menu",
    "carte",
    "plats",
    "gastronomique",
    "cuisine française",
    "allergènes",
  ],
};

async function getMenuData() {
  const [categories, plats] = await Promise.all([
    prisma.categorie.findMany({
      where: { active: true },
      orderBy: { ordre: "asc" },
      include: {
        plats: {
          where: { disponible: true },
          orderBy: { nom: "asc" },
        },
      },
    }),
    prisma.plat.findMany({
      where: { disponible: true },
      include: { categorie: true },
      orderBy: [{ categorie: { ordre: "asc" } }, { nom: "asc" }],
    }),
  ]);

  return { categories, plats };
}

interface MenuFiltersProps {
  categories: Array<{ id: string; nom: string }>;
}

function MenuFilters({ categories }: MenuFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
      <h3 className="font-semibold text-lg mb-4 text-charcoal-800">Filtres</h3>

      {/* Filtres par catégorie */}
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-3 text-charcoal-700">
            Catégories
          </h4>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-xl bg-sage-400 text-white text-sm font-medium">
              Tous
            </button>
            {categories.map((categorie) => (
              <button
                key={categorie.id}
                className="px-4 py-2 rounded-xl bg-cream-100 text-charcoal-700 hover:bg-cream-200 transition-colors text-sm font-medium"
              >
                {categorie.nom}
              </button>
            ))}
          </div>
        </div>

        {/* Filtres par régime */}
        <div>
          <h4 className="font-medium text-sm mb-3 text-charcoal-700">
            Régimes alimentaires
          </h4>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-xl bg-cream-100 text-charcoal-700 hover:bg-cream-200 transition-colors text-sm">
              🌱 Végétarien
            </button>
            <button className="px-4 py-2 rounded-xl bg-cream-100 text-charcoal-700 hover:bg-cream-200 transition-colors text-sm">
              🌿 Vegan
            </button>
            <button className="px-4 py-2 rounded-xl bg-cream-100 text-charcoal-700 hover:bg-cream-200 transition-colors text-sm">
              🌾 Sans gluten
            </button>
            <button className="px-4 py-2 rounded-xl bg-cream-100 text-charcoal-700 hover:bg-cream-200 transition-colors text-sm">
              🥛 Sans lactose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuSectionProps {
  categorie: {
    id: string;
    nom: string;
    plats: Array<{
      id: string;
      nom: string;
      description: string;
      prix: number;
      tags: string;
      allergenes: string;
      image?: string;
      disponible: boolean;
    }>;
  };
}

function MenuSection({ categorie }: MenuSectionProps) {
  if (categorie.plats.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal-800 mb-2">
          {categorie.nom}
        </h2>
        <div className="w-16 h-1 bg-sage-400 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categorie.plats.map((plat) => (
          <CardPlat key={plat.id} plat={plat} />
        ))}
      </div>
    </section>
  );
}

function MenuSkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-6">
          <div className="h-8 bg-cream-200 rounded w-48 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="bg-white rounded-2xl p-6 space-y-4">
                <div className="h-6 bg-cream-200 rounded w-3/4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-cream-100 rounded animate-pulse"></div>
                  <div className="h-4 bg-cream-100 rounded w-5/6 animate-pulse"></div>
                </div>
                <div className="h-6 bg-cream-200 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function MenuPage() {
  const { categories, plats } = await getMenuData();

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Notre carte"
            title="Menu gastronomique"
            description="Une sélection raffinée de plats préparés avec passion et des produits d'exception. Chaque création raconte une histoire, chaque saveur éveille les sens."
          />
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 mb-8 lg:mb-0">
              <div className="sticky top-24">
                <MenuFilters categories={categories} />

                {/* CTA Réservation */}
                <div className="bg-sage-400 rounded-2xl p-6 text-center">
                  <h3 className="font-serif font-semibold text-white text-xl mb-3">
                    Envie de déguster ?
                  </h3>
                  <p className="text-sage-100 text-sm mb-4">
                    Réservez votre table et laissez-vous surprendre par nos
                    créations culinaires.
                  </p>
                  <Link href="/reservation">
                    <Button className="bg-white text-sage-600 hover:bg-cream-50 w-full">
                      Réserver maintenant
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="lg:col-span-3">
              <Suspense fallback={<MenuSkeleton />}>
                {categories.map((categorie: any) => (
                  <MenuSection key={categorie.id} categorie={categorie} />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Informations allergènes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-3 text-amber-800">
              Information allergènes
            </h3>
            <p className="text-amber-700 text-sm leading-relaxed mb-4">
              Nos plats peuvent contenir des allergènes. Les informations sont
              indiquées sur chaque plat, mais n'hésitez pas à nous signaler
              toute allergie ou intolérance lors de votre réservation.
            </p>
            <p className="text-xs text-amber-600">
              Notre équipe se fera un plaisir d'adapter nos préparations selon
              vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-16 bg-charcoal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Une question sur notre carte ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour vous renseigner sur nos
            plats, les allergènes ou pour des demandes particulières.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Nous contacter
              </Button>
            </Link>
            <a href="tel:0142000000">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-charcoal-800"
              >
                01 42 00 00 00
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
