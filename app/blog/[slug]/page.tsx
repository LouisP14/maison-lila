import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string) {
  const article = await prisma.article.findFirst({
    where: {
      slug: slug,
      publie: true,
    },
  });

  if (!article) {
    notFound();
  }

  return article;
}

async function getRelatedArticles(currentArticleId: string, categorie: string) {
  return prisma.article.findMany({
    where: {
      publie: true,
      id: { not: currentArticleId },
      OR: [{ categorie: categorie }, { tags: { contains: categorie } }],
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  return {
    title: `${article.titre} - Blog Maison Lila`,
    description: article.extrait,
    keywords: article.tags.split(",").map((tag: string) => tag.trim()),
    openGraph: {
      title: article.titre,
      description: article.extrait,
      images: article.image ? [article.image] : [],
      type: "article",
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);
  const relatedArticles = await getRelatedArticles(
    article.id,
    article.categorie
  );

  const tags = article.tags
    ? article.tags.split(",").filter((tag: string) => tag.trim())
    : [];
  const publishedDate = new Date(article.createdAt);
  const updatedDate = new Date(article.updatedAt);
  const readingTime = Math.ceil(article.contenu.length / 1000); // Estimation 1000 caractères/minute

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-charcoal-600 mb-8">
            <Link href="/" className="hover:text-sage-600 transition-colors">
              Accueil
            </Link>
            <svg
              className="w-4 h-4"
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
            <Link
              href="/blog"
              className="hover:text-sage-600 transition-colors"
            >
              Blog
            </Link>
            <svg
              className="w-4 h-4"
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
            <span className="text-charcoal-400">{article.titre}</span>
          </nav>

          {/* Métadonnées */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="default">{article.categorie}</Badge>
            <span className="text-sm text-charcoal-600">
              {publishedDate.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="text-sm text-charcoal-600">
              {readingTime} min de lecture
            </span>
            {updatedDate > publishedDate && (
              <span className="text-sm text-charcoal-500">
                Mis à jour le {updatedDate.toLocaleDateString("fr-FR")}
              </span>
            )}
          </div>

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal-800 mb-6">
            {article.titre}
          </h1>

          {/* Extrait */}
          {article.extrait && (
            <p className="text-xl text-charcoal-600 leading-relaxed mb-8">
              {article.extrait}
            </p>
          )}
        </div>
      </section>

      {/* Image principale */}
      {article.image && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={article.image}
                alt={article.titre}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Contenu de l'article */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft">
            {/* Contenu markdown/HTML */}
            <div
              className="prose prose-lg max-w-none
                         prose-headings:font-serif prose-headings:text-charcoal-800
                         prose-p:text-charcoal-700 prose-p:leading-relaxed
                         prose-a:text-sage-600 prose-a:no-underline hover:prose-a:text-sage-700
                         prose-strong:text-charcoal-800 prose-strong:font-semibold
                         prose-ul:text-charcoal-700 prose-ol:text-charcoal-700
                         prose-blockquote:border-sage-400 prose-blockquote:bg-sage-50 prose-blockquote:rounded-xl prose-blockquote:p-6
                         prose-code:text-sage-700 prose-code:bg-cream-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                         prose-pre:bg-charcoal-800 prose-pre:rounded-xl"
              dangerouslySetInnerHTML={{ __html: article.contenu }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-cream-200">
                <h3 className="font-semibold text-charcoal-800 mb-4">Tags :</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cream-100 hover:bg-sage-400 hover:text-white text-charcoal-600 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Partage */}
            <div className="mt-8 pt-8 border-t border-cream-200">
              <h3 className="font-semibold text-charcoal-800 mb-4">
                Partager cet article :
              </h3>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-900 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-semibold text-charcoal-800 mb-8 text-center">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle: any) => (
                <div
                  key={relatedArticle.id}
                  className="bg-cream-50 rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-shadow group"
                >
                  <Link href={`/blog/${relatedArticle.slug}`}>
                    {/* Image */}
                    <div className="aspect-video bg-cream-200 overflow-hidden relative">
                      {relatedArticle.image ? (
                        <Image
                          src={relatedArticle.image}
                          alt={relatedArticle.titre}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg
                            className="w-12 h-12 text-sage-400"
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
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <p className="text-sm text-charcoal-500 mb-2">
                        {new Date(relatedArticle.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </p>
                      <h3 className="font-serif font-semibold text-lg text-charcoal-800 mb-2 group-hover:text-sage-600 transition-colors line-clamp-2">
                        {relatedArticle.titre}
                      </h3>
                      <p className="text-charcoal-600 text-sm line-clamp-3">
                        {relatedArticle.extrait}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-sage-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-semibold text-white mb-4">
            Envie de découvrir nos saveurs ?
          </h2>
          <p className="text-sage-100 text-lg mb-8 max-w-2xl mx-auto">
            Après avoir lu nos secrets culinaires, il ne vous reste plus qu'à
            venir les déguster !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation">
              <Button
                size="lg"
                className="bg-white text-sage-600 hover:bg-cream-50"
              >
                Réserver maintenant
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-sage-600"
              >
                Retour au blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
