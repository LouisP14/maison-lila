import { SectionTitle } from "@/components/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog - Actualités et recettes",
  description:
    "Découvrez nos dernières actualités, recettes de saison, conseils culinaires et événements spéciaux chez Maison Lila.",
  keywords: [
    "blog",
    "actualités",
    "recettes",
    "cuisine",
    "événements",
    "conseils",
  ],
};

async function getBlogData() {
  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where: { publie: true },
      orderBy: { createdAt: "desc" },
      take: 12, // Pagination
      select: {
        id: true,
        titre: true,
        extrait: true,
        contenu: true,
        image: true,
        slug: true,
        categorie: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.article.count({ where: { publie: true } }),
  ]);

  return { articles, totalCount };
}

interface ArticleCardProps {
  article: {
    id: string;
    titre: string;
    extrait: string;
    image: string | null;
    slug: string;
    categorie: string;
    tags: string;
    createdAt: Date;
  };
}

function ArticleCard({ article }: ArticleCardProps) {
  const tags = article.tags
    ? article.tags.split(",").filter((tag) => tag.trim())
    : [];

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
      <Link href={`/blog/${article.slug}`}>
        {/* Image */}
        <div className="aspect-video bg-cream-200 overflow-hidden rounded-t-2xl relative">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.titre}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg
                className="w-16 h-16 text-sage-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 1l4 4v9a2 2 0 01-2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 3v4a2 2 0 002 2h4"
                />
              </svg>
            </div>
          )}
          {/* Catégorie badge */}
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="bg-white/90 text-sage-700">
              {article.categorie}
            </Badge>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {/* Date */}
          <p className="text-sm text-charcoal-500 mb-3">
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Titre */}
          <h3 className="text-xl font-serif font-semibold text-charcoal-800 mb-3 group-hover:text-sage-600 transition-colors line-clamp-2">
            {article.titre}
          </h3>

          {/* Extrait */}
          <p className="text-charcoal-600 mb-4 line-clamp-3">
            {article.extrait}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-cream-100 text-charcoal-600 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-1 bg-cream-100 text-charcoal-600 rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Lire la suite */}
          <div className="flex items-center text-sage-600 font-medium group-hover:text-sage-700">
            Lire la suite
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </Card>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-soft"
        >
          <div className="aspect-video bg-cream-200 animate-pulse"></div>
          <div className="p-6 space-y-3">
            <div className="h-4 bg-cream-200 rounded animate-pulse w-24"></div>
            <div className="h-6 bg-cream-200 rounded animate-pulse"></div>
            <div className="h-4 bg-cream-200 rounded animate-pulse w-4/5"></div>
            <div className="h-4 bg-cream-200 rounded animate-pulse w-3/4"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-cream-200 rounded-full animate-pulse w-16"></div>
              <div className="h-6 bg-cream-200 rounded-full animate-pulse w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface BlogSidebarProps {
  totalCount: number;
}

function BlogSidebar({ totalCount }: BlogSidebarProps) {
  const categories = [
    { name: "Actualités", count: Math.floor(totalCount * 0.3) },
    { name: "Recettes", count: Math.floor(totalCount * 0.4) },
    { name: "Événements", count: Math.floor(totalCount * 0.2) },
    { name: "Conseils", count: Math.floor(totalCount * 0.1) },
  ];

  const tagsPopulaires = [
    "Cuisine de saison",
    "Végétarien",
    "Produits locaux",
    "Techniques culinaires",
    "Menu spécial",
    "Chef",
  ];

  return (
    <div className="space-y-8">
      {/* Newsletter */}
      <div className="bg-sage-400 rounded-2xl p-6 text-white text-center">
        <h3 className="font-serif font-semibold text-xl mb-3">Newsletter</h3>
        <p className="text-sage-100 text-sm mb-4">
          Recevez nos dernières recettes et actualités directement dans votre
          boîte mail.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="votre@email.com"
            className="w-full px-4 py-3 rounded-xl text-charcoal-800 border-0 focus:ring-2 focus:ring-white"
          />
          <Button className="w-full bg-white text-sage-600 hover:bg-cream-50">
            S'abonner
          </Button>
        </div>
      </div>

      {/* Catégories */}
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <h3 className="font-serif font-semibold text-lg text-charcoal-800 mb-4">
          Catégories
        </h3>
        <div className="space-y-3">
          {categories.map((categorie) => (
            <div
              key={categorie.name}
              className="flex items-center justify-between py-2 border-b border-cream-200 last:border-b-0"
            >
              <span className="text-charcoal-700 hover:text-sage-600 cursor-pointer transition-colors">
                {categorie.name}
              </span>
              <span className="text-sm text-charcoal-500 bg-cream-100 px-2 py-1 rounded-full">
                {categorie.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tags populaires */}
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <h3 className="font-serif font-semibold text-lg text-charcoal-800 mb-4">
          Tags populaires
        </h3>
        <div className="flex flex-wrap gap-2">
          {tagsPopulaires.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-cream-100 hover:bg-sage-400 hover:text-white text-charcoal-600 rounded-full cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Articles récents */}
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <h3 className="font-serif font-semibold text-lg text-charcoal-800 mb-4">
          Articles récents
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-3 group cursor-pointer">
              <div className="w-16 h-16 bg-cream-200 rounded-xl flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-sage-400 to-sage-500"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-charcoal-800 group-hover:text-sage-600 transition-colors line-clamp-2 mb-1">
                  Les secrets d'une sauce parfaite
                </h4>
                <p className="text-xs text-charcoal-500">Il y a 3 jours</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const { articles, totalCount } = await getBlogData();

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Blog culinaire"
            title="Découvrez l'univers de Maison Lila"
            description="Plongez dans nos coulisses, découvrez nos recettes de saison et suivez nos actualités. Un voyage gustatif qui ne s'arrête jamais."
          />
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Articles */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-semibold text-charcoal-800">
                  Tous les articles ({totalCount})
                </h2>

                {/* Filtres */}
                <div className="hidden md:flex items-center space-x-4">
                  <select className="px-4 py-2 border border-cream-300 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent bg-white text-sm">
                    <option value="recent">Plus récents</option>
                    <option value="popular">Plus populaires</option>
                    <option value="alphabetical">A-Z</option>
                  </select>
                </div>
              </div>

              <Suspense fallback={<BlogSkeleton />}>
                {articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {articles.map((article: any) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
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
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 1l4 4v9a2 2 0 01-2 2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 3v4a2 2 0 002 2h4"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-charcoal-800 mb-2">
                      Aucun article pour le moment
                    </h3>
                    <p className="text-charcoal-600">
                      Nos premiers articles arrivent bientôt ! Revenez nous
                      voir.
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalCount > 12 && (
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" disabled>
                        Précédent
                      </Button>
                      <span className="px-4 py-2 bg-sage-600 text-white rounded-xl font-medium">
                        1
                      </span>
                      <span className="px-4 py-2 text-charcoal-600 hover:bg-cream-200 rounded-xl cursor-pointer">
                        2
                      </span>
                      <span className="px-4 py-2 text-charcoal-600 hover:bg-cream-200 rounded-xl cursor-pointer">
                        3
                      </span>
                      <Button variant="outline">Suivant</Button>
                    </div>
                  </div>
                )}
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar totalCount={totalCount} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal-800 mb-4">
            Inspiré par nos recettes ?
          </h2>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            Venez déguster nos plats signatures préparés avec passion par notre
            chef. Une expérience culinaire unique vous attend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation">
              <Button size="lg" className="min-w-48">
                Réserver une table
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" size="lg" className="min-w-48">
                Découvrir le menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
