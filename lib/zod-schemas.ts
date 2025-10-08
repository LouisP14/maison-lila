import { z } from "zod";

// Schéma pour les réservations
export const reservationSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),
  date: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, "La date doit être dans le futur"),
  heure: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide"),
  nbCouverts: z
    .number()
    .min(1, "Au moins 1 couvert")
    .max(12, "Maximum 12 couverts"),
  message: z.string().optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

// Schéma pour les avis
export const avisSchema = z.object({
  auteur: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide").optional(),
  note: z.number().min(1, "Note minimum : 1").max(5, "Note maximum : 5"),
  commentaire: z
    .string()
    .min(10, "Le commentaire doit contenir au moins 10 caractères"),
});

export type AvisFormData = z.infer<typeof avisSchema>;

// Schéma pour le contact
export const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  sujet: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Schéma pour l'authentification admin
export const authSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

export type AuthFormData = z.infer<typeof authSchema>;

// Schémas pour l'administration
export const platSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  prix: z.number().min(0, "Le prix doit être positif"),
  categorieId: z.string(),
  tags: z.array(z.string()).default([]),
  allergenes: z.array(z.string()).default([]),
  image: z.string().optional(),
  disponible: z.boolean().default(true),
});

export type PlatFormData = z.infer<typeof platSchema>;

export const creneauSchema = z.object({
  jour: z.number().min(0).max(6),
  heureDebut: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide"),
  heureFin: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide"),
  capaciteMax: z.number().min(1, "Capacité minimum : 1"),
  actif: z.boolean().default(true),
});

export type CreneauFormData = z.infer<typeof creneauSchema>;

// Validation de honeypot (anti-spam)
export const honeypotSchema = z.object({
  website: z.string().max(0, "Champ interdit"), // Doit rester vide
});

// Schéma pour la newsletter
export const newsletterSchema = z.object({
  email: z.string().email("Email invalide"),
});
