import { getReservationConfirmationEmail, sendEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema de validation pour une réservation
const reservationSchema = z.object({
  date: z.string().min(1, "La date est requise"),
  time: z.string().min(1, "L'heure est requise"),
  guests: z
    .number()
    .min(1, "Au moins 1 personne")
    .max(8, "Maximum 8 personnes"),
  firstName: z.string().min(2, "Prénom requis (minimum 2 caractères)"),
  lastName: z.string().min(2, "Nom requis (minimum 2 caractères)"),
  email: z.string().email("Format d'email invalide"),
  phone: z.string().min(10, "Numéro de téléphone requis"),
  specialRequests: z.string().optional(),
});

// Fonction pour vérifier si un créneau est disponible
async function isTimeSlotAvailable(
  date: string,
  time: string,
  guests: number
): Promise<boolean> {
  // Créer la date complète à partir de la date et de l'heure
  const reservationDate = new Date(date);

  // Vérifier les réservations existantes pour ce créneau
  const existingReservations = await prisma.reservation.findMany({
    where: {
      date: reservationDate,
      heure: time,
      statut: {
        in: ["CONFIRMED", "PENDING"],
      },
    },
    select: {
      nbCouverts: true,
    },
  });

  // Calculer le nombre total de personnes déjà réservées
  const totalGuests = existingReservations.reduce(
    (sum: number, reservation: { nbCouverts: number }) =>
      sum + reservation.nbCouverts,
    0
  );

  // Supposons une capacité maximale de 50 personnes
  const maxCapacity = 50;

  return totalGuests + guests <= maxCapacity;
}

// Fonction pour générer un ID de réservation
function generateReservationId(): string {
  const prefix = "ML";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}${timestamp}${random}`;
}

// Route POST - Créer une réservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données
    const validatedData = reservationSchema.parse(body);

    // Vérifier que la date n'est pas dans le passé
    const reservationDate = new Date(validatedData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reservationDate < today) {
      return NextResponse.json(
        { message: "Impossible de réserver dans le passé" },
        { status: 400 }
      );
    }

    // Vérifier que la date n'est pas trop loin dans le futur (3 mois max)
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    if (reservationDate > maxDate) {
      return NextResponse.json(
        { message: "Réservation possible jusqu'à 3 mois à l'avance" },
        { status: 400 }
      );
    }

    // Vérifier la disponibilité du créneau
    const isAvailable = await isTimeSlotAvailable(
      validatedData.date,
      validatedData.time,
      validatedData.guests
    );

    if (!isAvailable) {
      return NextResponse.json(
        {
          message:
            "Ce créneau n'est plus disponible pour le nombre de personnes demandé",
        },
        { status: 409 }
      );
    }

    // Créer la date de réservation
    const bookingDate = new Date(validatedData.date);

    // Générer l'ID de réservation
    const reservationId = generateReservationId();

    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        id: reservationId,
        nom: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        telephone: validatedData.phone,
        date: bookingDate,
        heure: validatedData.time,
        nbCouverts: validatedData.guests,
        message: validatedData.specialRequests || null,
        statut: "PENDING",
      },
    });

    // Envoyer l'email de confirmation
    try {
      const emailContent = getReservationConfirmationEmail({
        id: reservation.id,
        nom: reservation.nom,
        email: reservation.email,
        date: reservation.date,
        heure: reservation.heure,
        nbCouverts: reservation.nbCouverts,
      });

      await sendEmail({
        to: reservation.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
      });

      console.log(
        `Email de confirmation envoyé à ${reservation.email} pour la réservation ${reservation.id}`
      );
    } catch (emailError) {
      // Log l'erreur mais ne pas faire échouer la réservation
      console.error(
        "Erreur lors de l'envoi de l'email de confirmation:",
        emailError
      );
      // La réservation est quand même créée même si l'email échoue
    }

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        date: validatedData.date,
        time: validatedData.time,
        guests: validatedData.guests,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        status: reservation.statut,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Données invalides",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

// Route GET - Récupérer les créneaux disponibles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ message: "Date requise" }, { status: 400 });
    }

    // Récupérer tous les créneaux pour cette date
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

    const availability = await Promise.all(
      timeSlots.map(async (time) => {
        const available = await isTimeSlotAvailable(date, time, 1); // Test avec 1 personne
        return {
          time,
          available,
        };
      })
    );

    return NextResponse.json({
      date,
      slots: availability,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des créneaux:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
