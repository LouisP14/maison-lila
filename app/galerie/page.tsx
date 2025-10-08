import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Galerie - Découvrez notre univers",
  description:
    "Plongez dans l'univers de Maison Lila à travers notre galerie photos. Découvrez notre cuisine, notre cadre élégant et l'ambiance unique de notre restaurant parisien.",
  keywords: ["galerie", "photos", "restaurant", "ambiance", "cuisine", "décor"],
};

// Images de démo - en production, ces URLs viendraient de la base de données
const galerieImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Restaurant avec tables dressées et serveurs",
    category: "ambiance",
    title: "Service et ambiance",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Salle de restaurant avec tables et chaises",
    category: "ambiance",
    title: "Notre salle de restaurant",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Bar du restaurant avec étagères de bouteilles",
    category: "ambiance",
    title: "Notre bar",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Plat gastronomique élégamment présenté",
    category: "cuisine",
    title: "Notre cuisine",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Chef en cuisine travaillant sur un plat",
    category: "equipe",
    title: "Notre chef en action",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Café, croissants et petit-déjeuner",
    category: "cuisine",
    title: "Nos petits-déjeuners",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Burger gourmet avec frites",
    category: "cuisine",
    title: "Nos burgers",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Salle de restaurant moderne avec tables",
    category: "ambiance",
    title: "Espace principal",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Serveur professionnel avec plateau",
    category: "equipe",
    title: "Notre service",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Cuisine moderne avec ustensiles",
    category: "ambiance",
    title: "Notre cuisine ouverte",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Façade de restaurant avec terrasse",
    category: "ambiance",
    title: "Notre terrasse",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop&crop=center&auto=format&q=75",
    alt: "Plats gastronomiques sur passe",
    category: "cuisine",
    title: "Service en cuisine",
  },
];

const categories = [
  { id: "tous", label: "Tout voir", count: 12 },
  {
    id: "cuisine",
    label: "Cuisine",
    count: 4,
  },
  {
    id: "ambiance",
    label: "Ambiance",
    count: 6,
  },
  {
    id: "equipe",
    label: "Équipe",
    count: 2,
  },
];

interface GalleryFilterProps {
  categories: typeof categories;
}

function GalleryFilter({ categories }: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          className="px-6 py-3 rounded-xl bg-white text-charcoal-700 border border-sage-400/20 hover:bg-sage-400 hover:text-white transition-all duration-200 shadow-sm"
        >
          {category.label}
          <span className="ml-2 text-sm opacity-70">({category.count})</span>
        </button>
      ))}
    </div>
  );
}

interface ImageModalProps {
  image: (typeof galerieImages)[0] | null;
  onClose: () => void;
}

function ImageModal({ image, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-sage-300 transition-colors"
          aria-label="Fermer"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-contain rounded-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-2xl">
          <h3 className="text-white font-semibold text-lg">{image.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default function GaleriePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Découvrez notre univers"
            title="Galerie photo"
            description="Plongez dans l'ambiance unique de Maison Lila. Découvrez notre cuisine d'exception, notre cadre élégant et l'équipe passionnée qui fait vivre ce lieu d'exception."
          />
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtres */}
          <GalleryFilter categories={categories} />

          {/* Grid d'images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galerieImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {image.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sage-300 text-xs capitalize">
                        {image.category}
                      </span>
                      <button className="text-white hover:text-sage-300 transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si pas d'images avec les filtres */}
          <div className="text-center py-16 hidden">
            <div className="w-16 h-16 bg-sage-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-sage-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-charcoal-800 mb-2">
              Aucune image trouvée
            </h3>
            <p className="text-charcoal-600">
              Essayez de modifier vos filtres pour voir plus de photos.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-sage-600 mb-2">2018</div>
              <div className="text-sm text-charcoal-600">Année d'ouverture</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sage-600 mb-2">50</div>
              <div className="text-sm text-charcoal-600">Couverts maximum</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sage-600 mb-2">4.8/5</div>
              <div className="text-sm text-charcoal-600">Note moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sage-600 mb-2">1000+</div>
              <div className="text-sm text-charcoal-600">
                Clients satisfaits
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sage-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-6">
            Envie de vivre l'expérience ?
          </h2>
          <p className="text-lg text-sage-100 mb-8 max-w-2xl mx-auto">
            Réservez votre table et découvrez par vous-même l'ambiance unique et
            la cuisine d'exception de Maison Lila.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation">
              <Button
                size="lg"
                className="bg-white text-sage-600 hover:bg-cream-50 px-8 py-4"
              >
                Réserver maintenant
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-sage-600 px-8 py-4"
              >
                Voir le menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
