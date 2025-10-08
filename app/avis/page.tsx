import { AvisCard } from "@/components/AvisCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
type Avis = {
  id: string;
  auteur: string;
  email: string | null;
  note: number;
  commentaire: string;
  approuve: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const metadata: Metadata = {
  title: "Avis clients - Témoignages",
  description:
    "Découvrez les avis et témoignages de nos clients sur leur expérience à Maison Lila. Partagez également votre avis après votre visite.",
  keywords: [
    "avis",
    "témoignages",
    "clients",
    "expérience",
    "restaurant",
    "satisfaction",
  ],
};

async function getAvisData() {
  const [avis, stats] = await Promise.all([
    prisma.avis.findMany({
      where: { approuve: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.avis.aggregate({
      where: { approuve: true },
      _avg: { note: true },
      _count: { _all: true },
    }),
  ]);

  // Calculer la distribution des notes
  const notesDistribution = await Promise.all([
    prisma.avis.count({ where: { approuve: true, note: 5 } }),
    prisma.avis.count({ where: { approuve: true, note: 4 } }),
    prisma.avis.count({ where: { approuve: true, note: 3 } }),
    prisma.avis.count({ where: { approuve: true, note: 2 } }),
    prisma.avis.count({ where: { approuve: true, note: 1 } }),
  ]);

  return {
    avis,
    moyenneNote: stats._avg.note || 0,
    totalAvis: stats._count._all,
    distribution: notesDistribution,
  };
}

interface AvisStatsProps {
  moyenneNote: number;
  totalAvis: number;
  distribution: number[];
}

function AvisStats({ moyenneNote, totalAvis, distribution }: AvisStatsProps) {
  const renderStars = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 ${i < Math.round(note) ? "text-amber-400 fill-current" : "text-gray-300"}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
      <div className="mb-6">
        <div className="text-4xl font-bold text-sage-600 mb-2">
          {moyenneNote.toFixed(1)}/5
        </div>
        <div className="flex items-center justify-center mb-2">
          {renderStars(moyenneNote)}
        </div>
        <p className="text-charcoal-600">
          Basé sur {totalAvis} avis client{totalAvis > 1 ? "s" : ""}
        </p>
      </div>

      {/* Distribution des notes */}
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((note, index) => {
          const count = distribution[index];
          const percentage = totalAvis > 0 ? (count / totalAvis) * 100 : 0;

          return (
            <div key={note} className="flex items-center text-sm">
              <span className="w-8 text-right mr-2">{note}</span>
              <svg
                className="w-4 h-4 text-amber-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-charcoal-600 w-8">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AvisForm() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft">
      <h3 className="text-2xl font-serif font-semibold text-charcoal-800 mb-6">
        Partagez votre expérience
      </h3>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Votre nom" placeholder="Prénom Nom" required />
          <Input
            label="Email (optionnel)"
            type="email"
            placeholder="votre@email.com"
            helperText="Ne sera pas publié"
          />
        </div>

        {/* Notation avec étoiles */}
        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-3">
            Votre note <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((note) => (
              <button
                key={note}
                type="button"
                className="text-gray-300 hover:text-amber-400 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
            <span className="ml-3 text-sm text-charcoal-600">
              Cliquez sur les étoiles
            </span>
          </div>
        </div>

        <Textarea
          label="Votre commentaire"
          placeholder="Partagez votre expérience chez Maison Lila..."
          rows={5}
          required
        />

        {/* hCaptcha placeholder */}
        <div className="bg-cream-100 border-2 border-dashed border-sage-400/30 rounded-xl p-8 text-center">
          <p className="text-charcoal-600 text-sm">
            Vérification anti-spam (hCaptcha sera intégré ici)
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-charcoal-600">
            Votre avis sera vérifié avant publication
          </p>
          <Button type="submit" size="lg">
            Publier mon avis
          </Button>
        </div>
      </form>
    </div>
  );
}

function AvisSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-cream-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-cream-100 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((j) => (
                <div
                  key={j}
                  className="w-4 h-4 bg-cream-200 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-cream-100 rounded animate-pulse"></div>
            <div className="h-4 bg-cream-100 rounded w-4/5 animate-pulse"></div>
            <div className="h-4 bg-cream-100 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function AvisPage() {
  const { avis, moyenneNote, totalAvis, distribution } = await getAvisData();

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Témoignages clients"
            title="Ils ont vécu l'expérience"
            description="Découvrez ce que nos clients pensent de leur passage chez Maison Lila. Chaque avis compte et nous aide à toujours améliorer notre service."
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar avec stats et formulaire */}
            <div className="lg:col-span-1 space-y-8">
              {/* Stats des avis */}
              <AvisStats
                moyenneNote={moyenneNote}
                totalAvis={totalAvis}
                distribution={distribution}
              />

              {/* CTA Réservation */}
              <div className="bg-sage-400 rounded-2xl p-6 text-center text-white">
                <h3 className="font-serif font-semibold text-xl mb-3">
                  Convaincu ?
                </h3>
                <p className="text-sage-100 text-sm mb-4">
                  Rejoignez nos clients satisfaits et réservez votre table dès
                  maintenant.
                </p>
                <Link href="/reservation">
                  <Button className="bg-white text-sage-600 hover:bg-cream-50 w-full">
                    Réserver maintenant
                  </Button>
                </Link>
              </div>
            </div>

            {/* Liste des avis */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-charcoal-800 mb-2">
                  Tous les avis ({totalAvis})
                </h2>
                <p className="text-charcoal-600">
                  Triés par date de publication, du plus récent au plus ancien
                </p>
              </div>

              <Suspense fallback={<AvisSkeleton />}>
                <div className="space-y-6">
                  {avis.map((avisItem: Avis) => (
                    <AvisCard key={avisItem.id} avis={avisItem} />
                  ))}
                </div>

                {/* Message si pas d'avis */}
                {avis.length === 0 && (
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-charcoal-800 mb-2">
                      Aucun avis pour le moment
                    </h3>
                    <p className="text-charcoal-600">
                      Soyez le premier à partager votre expérience !
                    </p>
                  </div>
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire d'avis */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-charcoal-800 mb-4">
              Vous avez dîné chez nous ?
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              Votre avis nous est précieux ! Partagez votre expérience pour
              aider d'autres gourmets à découvrir Maison Lila.
            </p>
          </div>

          <AvisForm />
        </div>
      </section>
    </div>
  );
}
