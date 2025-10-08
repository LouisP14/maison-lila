"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

// Types
interface ReservationForm {
  date: string;
  time: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

// Créneaux disponibles
const timeSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

// Options nombre de personnes
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ReservationPage() {
  const [formData, setFormData] = useState<ReservationForm>({
    date: "",
    time: "",
    guests: 2,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fonction pour obtenir la date minimale (aujourd'hui)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Fonction pour obtenir la date maximale (3 mois)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split("T")[0];
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = "Veuillez sélectionner une date";
    if (!formData.time) newErrors.time = "Veuillez sélectionner un créneau";
    if (!formData.firstName) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName) newErrors.lastName = "Le nom est requis";
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format d'email invalide";
    if (!formData.phone) newErrors.phone = "Le téléphone est requis";
    else if (
      !/^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/.test(
        formData.phone.replace(/\s/g, "")
      )
    )
      newErrors.phone = "Format de téléphone invalide";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirection vers page de confirmation avec les données
        const params = new URLSearchParams({
          id: result.reservation.id,
          date: result.reservation.date,
          time: result.reservation.time,
          guests: result.reservation.guests.toString(),
          firstName: result.reservation.firstName,
          lastName: result.reservation.lastName,
        });
        window.location.href = `/reservation/confirmation?${params.toString()}`;
      } else {
        const errorData = await response.json();
        setErrors({
          submit: errorData.message || "Erreur lors de la réservation",
        });
      }
    } catch (error) {
      setErrors({ submit: "Erreur de connexion. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  // Mise à jour des champs
  const updateField = (
    field: keyof ReservationForm,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Supprimer l'erreur du champ modifié
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Réservez votre expérience"
            title="Réservation"
            description="Réservez votre table pour découvrir la cuisine d'exception de Maison Lila. Notre équipe vous accueillera dans un cadre élégant pour un moment inoubliable."
          />
        </div>
      </section>

      {/* Formulaire de réservation */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations de réservation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-charcoal-700 mb-2"
                  >
                    Date de réservation *
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors ${
                      errors.date ? "border-red-400" : "border-sage-200"
                    }`}
                    required
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Heure */}
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-charcoal-700 mb-2"
                  >
                    Heure *
                  </label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors ${
                      errors.time ? "border-red-400" : "border-sage-200"
                    }`}
                    required
                  >
                    <option value="">Sélectionner</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>

                {/* Nombre de personnes */}
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium text-charcoal-700 mb-2"
                  >
                    Nombre de convives *
                  </label>
                  <select
                    id="guests"
                    value={formData.guests}
                    onChange={(e) =>
                      updateField("guests", parseInt(e.target.value))
                    }
                    className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors"
                    required
                  >
                    {guestOptions.map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "personne" : "personnes"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Informations personnelles */}
              <div className="border-t border-sage-100 pt-8">
                <h3 className="text-lg font-semibold text-charcoal-800 mb-6">
                  Vos informations
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prénom */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-charcoal-700 mb-2"
                    >
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors ${
                        errors.firstName ? "border-red-400" : "border-sage-200"
                      }`}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-charcoal-700 mb-2"
                    >
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors ${
                        errors.lastName ? "border-red-400" : "border-sage-200"
                      }`}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors ${
                        errors.email ? "border-red-400" : "border-sage-200"
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-charcoal-700 mb-2"
                    >
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="06 12 34 56 78"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors ${
                        errors.phone ? "border-red-400" : "border-sage-200"
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Demandes spéciales */}
                <div className="mt-6">
                  <label
                    htmlFor="specialRequests"
                    className="block text-sm font-medium text-charcoal-700 mb-2"
                  >
                    Demandes spéciales (optionnel)
                  </label>
                  <textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) =>
                      updateField("specialRequests", e.target.value)
                    }
                    rows={4}
                    placeholder="Allergie, régime alimentaire, occasion spéciale..."
                    className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Erreur générale */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Bouton de soumission */}
              <div className="border-t border-sage-100 pt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full md:w-auto px-8 py-4"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Réservation en cours...
                    </div>
                  ) : (
                    "Confirmer ma réservation"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Informations pratiques */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-sage-400/10 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-sage-600"
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
                <h3 className="font-semibold text-charcoal-800">Horaires</h3>
              </div>
              <div className="space-y-2 text-sm text-charcoal-600">
                <div className="flex justify-between">
                  <span>Déjeuner</span>
                  <span>12h00 - 14h30</span>
                </div>
                <div className="flex justify-between">
                  <span>Dîner</span>
                  <span>19h00 - 22h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Fermeture</span>
                  <span>Dimanche soir et lundi</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-sage-400/10 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-sage-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-charcoal-800">À savoir</h3>
              </div>
              <div className="space-y-2 text-sm text-charcoal-600">
                <p>• Confirmation par email sous 24h</p>
                <p>• Annulation possible jusqu'à 24h avant</p>
                <p>• Tables maintenues 15min après l'heure</p>
                <p>• Groupes de 8+ personnes nous contacter</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
