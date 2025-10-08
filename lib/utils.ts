// Utilitaires de formatage et helpers

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatage de date français
export function formatDateFr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

// Formatage de date courte
export function formatDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-FR").format(d);
}

// Formatage prix
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

// Génération de slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/[^\w\s-]/g, "") // Supprimer caractères spéciaux
    .replace(/\s+/g, "-") // Remplacer espaces par des tirets
    .replace(/-+/g, "-") // Supprimer tirets multiples
    .trim();
}

// Validation d'email simple
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validation de téléphone français
export function isValidPhoneFr(phone: string): boolean {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Capitalisation première lettre
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Vérification si date est aujourd'hui
export function isToday(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

// Génération de token sécurisé
export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Vérification si une heure est passée
export function isTimeSlotPassed(date: string, time: string): boolean {
  const now = new Date();
  const slotDateTime = new Date(`${date}T${time}:00`);
  return slotDateTime < now;
}

// Calcul de la capacité disponible pour un créneau
export function calculateAvailableCapacity(
  creneauCapacity: number,
  existingReservations: { nbCouverts: number }[]
): number {
  const totalReserved = existingReservations.reduce(
    (sum, res) => sum + res.nbCouverts,
    0
  );
  return Math.max(0, creneauCapacity - totalReserved);
}

// Génération des créneaux horaires
export function generateTimeSlots(
  startHour: number = 12,
  endHour: number = 22,
  interval: number = 30
): string[] {
  const slots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slots.push(timeString);
    }
  }

  return slots;
}

// Jours de la semaine en français
export const JOURS_SEMAINE = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

// Tags de plats prédéfinis
export const TAGS_PLATS = [
  "vegetarien",
  "vegan",
  "sans_gluten",
  "sans_lactose",
  "bio",
  "local",
  "fait_maison",
  "specialite",
];

// Allergènes courants
export const ALLERGENES = [
  "gluten",
  "crustaces",
  "oeufs",
  "poissons",
  "arachides",
  "soja",
  "lait",
  "fruits_a_coque",
  "celeri",
  "moutarde",
  "sesame",
  "anhydride_sulfureux",
  "lupin",
  "mollusques",
];
