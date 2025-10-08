import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Nous contacter",
  description:
    "Contactez Maison Lila pour vos réservations, questions ou demandes particulières. Adresse, horaires, téléphone et formulaire de contact.",
  keywords: [
    "contact",
    "réservation",
    "adresse",
    "horaires",
    "téléphone",
    "restaurant",
  ],
};

async function getRestaurantInfo() {
  try {
    const restaurant = await prisma.restaurant.findFirst();
    return restaurant;
  } catch (error) {
    console.error('Erreur lors de la récupération des informations restaurant:', error);
    // Retourner des données par défaut
    return {
      id: 'default',
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
      capacite: 60,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}

interface ContactInfoProps {
  restaurant: {
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    horaires: any;
  } | null;
}

function ContactInfo({ restaurant }: ContactInfoProps) {
  if (!restaurant) return null;

  const horaires =
    typeof restaurant.horaires === "string"
      ? JSON.parse(restaurant.horaires)
      : restaurant.horaires;

  const jours = [
    { key: "lundi", label: "Lundi" },
    { key: "mardi", label: "Mardi" },
    { key: "mercredi", label: "Mercredi" },
    { key: "jeudi", label: "Jeudi" },
    { key: "vendredi", label: "Vendredi" },
    { key: "samedi", label: "Samedi" },
    { key: "dimanche", label: "Dimanche" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Informations de contact */}
      <div className="bg-white rounded-2xl p-8 shadow-soft">
        <h3 className="text-2xl font-serif font-semibold text-charcoal-800 mb-6">
          Nos coordonnées
        </h3>

        <div className="space-y-6">
          {/* Adresse */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-sage-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-sage-600"
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
            <div>
              <h4 className="font-semibold text-charcoal-800 mb-1">Adresse</h4>
              <p className="text-charcoal-600">{restaurant.adresse}</p>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(restaurant.adresse)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-600 hover:text-sage-700 text-sm font-medium inline-flex items-center mt-2"
              >
                Voir sur Google Maps
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Téléphone */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-sage-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-sage-600"
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
            <div>
              <h4 className="font-semibold text-charcoal-800 mb-1">
                Téléphone
              </h4>
              <a
                href={`tel:${restaurant.telephone}`}
                className="text-sage-600 hover:text-sage-700 font-medium"
              >
                {restaurant.telephone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-sage-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-sage-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-charcoal-800 mb-1">Email</h4>
              <a
                href={`mailto:${restaurant.email}`}
                className="text-sage-600 hover:text-sage-700 font-medium"
              >
                {restaurant.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Horaires d'ouverture */}
      <div className="bg-white rounded-2xl p-8 shadow-soft">
        <h3 className="text-2xl font-serif font-semibold text-charcoal-800 mb-6">
          Horaires d'ouverture
        </h3>

        <div className="space-y-4">
          {jours.map(({ key, label }) => {
            const horaireJour = horaires[key];

            return (
              <div
                key={key}
                className="flex justify-between items-center py-2 border-b border-cream-200 last:border-b-0"
              >
                <span className="font-medium text-charcoal-800">{label}</span>
                <div className="text-right text-charcoal-600">
                  {horaireJour?.ferme ? (
                    <span className="text-red-500">Fermé</span>
                  ) : (
                    <div className="space-y-1">
                      {horaireJour?.midi && (
                        <div className="text-sm">
                          <span className="text-charcoal-500">Midi:</span>{" "}
                          {horaireJour.midi}
                        </div>
                      )}
                      {horaireJour?.soir && (
                        <div className="text-sm">
                          <span className="text-charcoal-500">Soir:</span>{" "}
                          {horaireJour.soir}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note importante */}
        <div className="mt-6 p-4 bg-sage-400/5 rounded-xl border border-sage-400/20">
          <p className="text-sm text-charcoal-700">
            <svg
              className="w-4 h-4 inline-block mr-2 text-sage-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Nous vous recommandons de réserver votre table à l'avance, surtout
            le weekend.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-soft">
      <h3 className="text-2xl font-serif font-semibold text-charcoal-800 mb-6">
        Envoyez-nous un message
      </h3>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Prénom" placeholder="Votre prénom" required />
          <Input label="Nom" placeholder="Votre nom" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email"
            type="email"
            placeholder="votre@email.com"
            required
          />
          <Input label="Téléphone" type="tel" placeholder="01 23 45 67 89" />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal-700 mb-3">
            Sujet <span className="text-red-500">*</span>
          </label>
          <select className="w-full px-4 py-3 border border-cream-300 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors bg-white">
            <option value="">Sélectionnez un sujet</option>
            <option value="reservation">Réservation</option>
            <option value="evenement">Organisation d'événement</option>
            <option value="menu">Question sur le menu</option>
            <option value="allergie">Allergie / Régime alimentaire</option>
            <option value="groupe">Réservation groupe</option>
            <option value="autre">Autre demande</option>
          </select>
        </div>

        <Textarea
          label="Votre message"
          placeholder="Décrivez-nous votre demande en détail..."
          rows={6}
          required
        />

        {/* Checkbox RGPD */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="rgpd"
            className="w-5 h-5 text-sage-600 bg-white border-cream-300 rounded focus:ring-sage-400 focus:ring-2 mt-0.5"
            required
          />
          <label htmlFor="rgpd" className="text-sm text-charcoal-700">
            J'accepte que mes données personnelles soient utilisées pour traiter
            ma demande.
            <a
              href="/mentions-legales"
              className="text-sage-600 hover:text-sage-700 underline ml-1"
            >
              En savoir plus
            </a>
          </label>
        </div>

        {/* hCaptcha placeholder */}
        <div className="bg-cream-100 border-2 border-dashed border-sage-400/30 rounded-xl p-8 text-center">
          <p className="text-charcoal-600 text-sm">
            Vérification anti-spam (hCaptcha sera intégré ici)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" size="lg" className="flex-1">
            Envoyer le message
          </Button>
          <Button type="button" variant="outline" size="lg" className="flex-1">
            Réserver une table
          </Button>
        </div>
      </form>
    </div>
  );
}

export default async function ContactPage() {
  const restaurant = await getRestaurantInfo();

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Contact"
            title="Parlons de votre prochaine visite"
            description="Que ce soit pour une réservation, une question sur nos plats ou l'organisation d'un événement spécial, nous sommes là pour vous accompagner."
          />
        </div>
      </section>

      {/* Informations de contact */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactInfo restaurant={restaurant} />
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-serif font-semibold text-charcoal-800 mb-6">
              Comment nous trouver
            </h3>

            {/* Placeholder pour carte */}
            <div className="aspect-video bg-cream-100 border-2 border-dashed border-sage-400/30 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto text-sage-400 mb-4"
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
                <h4 className="font-semibold text-lg text-charcoal-800 mb-2">
                  Carte interactive
                </h4>
                <p className="text-charcoal-600 mb-4">
                  Google Maps sera intégré ici pour vous aider à nous localiser
                </p>
                {restaurant && (
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(restaurant.adresse)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-sage-600 text-white font-medium rounded-xl hover:bg-sage-700 transition-colors"
                  >
                    Voir sur Google Maps
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transport */}
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-sage-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0a2 2 0 01-2-2V9a2 2 0 012-2h2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-charcoal-800 mb-2">
                Transport
              </h4>
              <p className="text-charcoal-600 text-sm">
                Métro ligne 9 - Station République
                <br />
                Bus 20, 65, 75 - Arrêt Mairie du 3e
              </p>
            </div>

            {/* Parking */}
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-sage-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-lg text-charcoal-800 mb-2">
                Parking
              </h4>
              <p className="text-charcoal-600 text-sm">
                Parking République (200m)
                <br />
                Places de stationnement dans la rue
              </p>
            </div>

            {/* Accessibilité */}
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-sage-600"
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
              </div>
              <h4 className="font-semibold text-lg text-charcoal-800 mb-2">
                Accessibilité
              </h4>
              <p className="text-charcoal-600 text-sm">
                Restaurant accessible PMR
                <br />
                Toilettes adaptées disponibles
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
