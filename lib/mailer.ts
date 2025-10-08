import nodemailer from "nodemailer";

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM || "noreply@maison-lila.fr",
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

// Template d'email de confirmation de réservation
export function getReservationConfirmationEmail(reservation: {
  id: string;
  nom: string;
  email: string;
  date: Date;
  heure: string;
  nbCouverts: number;
  token?: string;
}) {
  const dateFormatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(reservation.date);

  const subject = `Confirmation de réservation - Maison Lila`;

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation de réservation</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #2B2B2B; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #8AA6A3; color: white; text-align: center; padding: 30px; }
        .content { padding: 30px; background-color: #FAF8F6; }
        .details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .cancel-link { color: #8AA6A3; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Maison Lila</h1>
          <p>Votre réservation est confirmée !</p>
        </div>
        
        <div class="content">
          <p>Bonjour ${reservation.nom},</p>
          
          <p>Nous avons le plaisir de confirmer votre réservation :</p>
          
          <div class="details">
            <h3>Détails de votre réservation</h3>
            <ul>
              <li><strong>Numéro de réservation :</strong> ${reservation.id}</li>
              <li><strong>Date :</strong> ${dateFormatted}</li>
              <li><strong>Heure :</strong> ${reservation.heure}</li>
              <li><strong>Nombre de couverts :</strong> ${reservation.nbCouverts}</li>
            </ul>
          </div>
          
          <p>Nous nous réjouissons de vous accueillir dans notre établissement.</p>
          
          <p><strong>Informations importantes :</strong></p>
          <ul>
            <li>Merci d'arriver 5 minutes avant l'heure de réservation</li>
            <li>Votre table sera maintenue 15 minutes après l'heure prévue</li>
            <li>Pour toute modification ou annulation, contactez-nous au 01 42 34 56 78</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Maison Lila<br>
          123 Rue de la Paix, 75001 Paris<br>
          Tél : 01 42 34 56 78<br>
          Email : contact@maison-lila.fr</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Bonjour ${reservation.nom},

Votre réservation chez Maison Lila est confirmée :

Numéro de réservation : ${reservation.id}
Date : ${dateFormatted}
Heure : ${reservation.heure}
Nombre de couverts : ${reservation.nbCouverts}

Informations importantes :
- Merci d'arriver 5 minutes avant l'heure de réservation
- Votre table sera maintenue 15 minutes après l'heure prévue
- Pour toute modification ou annulation, contactez-nous au 01 42 34 56 78

Nous nous réjouissons de vous accueillir !

Maison Lila
123 Rue de la Paix, 75001 Paris
Tél : 01 42 34 56 78
Email : contact@maison-lila.fr
  `;

  return { subject, html, text };
}
