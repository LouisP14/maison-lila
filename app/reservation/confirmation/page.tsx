"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  // Récupération des données de réservation depuis les paramètres URL
  const reservationId = searchParams.get("id");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const guests = searchParams.get("guests");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icône de succès */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <SectionTitle
            subtitle="Réservation confirmée"
            title="Merci pour votre réservation !"
            description="Votre demande de réservation a été enregistrée avec succès. Vous recevrez un email de confirmation dans les prochaines minutes."
          />
        </div>
      </section>

      {/* Détails de la réservation */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
            <h2 className="text-2xl font-serif font-semibold text-charcoal-800 mb-8 text-center">
              Récapitulatif de votre réservation
            </h2>

            <div className="space-y-6">
              {/* Numéro de réservation */}
              {reservationId && (
                <div className="bg-sage-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-charcoal-700">
                      Numéro de réservation
                    </span>
                    <span className="font-mono text-sage-700 font-semibold">
                      #{reservationId}
                    </span>
                  </div>
                </div>
              )}

              {/* Informations de réservation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-charcoal-800 mb-3">
                    Informations
                  </h3>
                  <div className="space-y-3">
                    {date && (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-sage-600 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-charcoal-700">
                          {new Date(date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    {time && (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-sage-600 mr-3"
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
                        <span className="text-charcoal-700">{time}</span>
                      </div>
                    )}

                    {guests && (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-sage-600 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="text-charcoal-700">
                          {guests}{" "}
                          {parseInt(guests) === 1 ? "personne" : "personnes"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-charcoal-800 mb-3">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    {firstName && lastName && (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-sage-600 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-charcoal-700">
                          {firstName} {lastName}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-sage-600 mr-3"
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
                      <span className="text-charcoal-700">
                        123 Rue de la Paix, 75001 Paris
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prochaines étapes */}
              <div className="border-t border-sage-100 pt-6">
                <h3 className="font-semibold text-charcoal-800 mb-4">
                  Prochaines étapes
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-sage-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">
                        Confirmation par email
                      </p>
                      <p className="text-sm text-charcoal-600">
                        Vous recevrez un email de confirmation dans les
                        prochaines minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-sage-400/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-sage-600 text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">
                        Rappel 24h avant
                      </p>
                      <p className="text-sm text-charcoal-600">
                        Nous vous enverrons un rappel la veille de votre
                        réservation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-sage-400/30 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-sage-600 text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal-800">
                        Accueil au restaurant
                      </p>
                      <p className="text-sm text-charcoal-600">
                        Présentez-vous 5 minutes avant votre créneau
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-sage-100 pt-8 mt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline" size="lg" className="px-8">
                    Retour à l'accueil
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button size="lg" className="px-8">
                    Découvrir le menu
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="mt-8 bg-sage-50 rounded-2xl p-6">
            <h3 className="font-semibold text-charcoal-800 mb-4 text-center">
              Besoin de modifier votre réservation ?
            </h3>
            <div className="text-center space-y-2">
              <p className="text-charcoal-600">
                Contactez-nous au{" "}
                <a
                  href="tel:+33142345678"
                  className="font-semibold text-sage-600 hover:text-sage-700"
                >
                  01 42 34 56 78
                </a>
              </p>
              <p className="text-charcoal-600">
                ou par email à{" "}
                <a
                  href="mailto:contact@maison-lila.fr"
                  className="font-semibold text-sage-600 hover:text-sage-700"
                >
                  contact@maison-lila.fr
                </a>
              </p>
              <p className="text-xs text-charcoal-500 mt-4">
                Annulation possible jusqu'à 24h avant la réservation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-600 mx-auto mb-4"></div>
            <p className="text-charcoal-600">Chargement...</p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
