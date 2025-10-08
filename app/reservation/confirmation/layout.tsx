import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation de réservation - Maison Lila",
  description:
    "Votre réservation chez Maison Lila a été confirmée avec succès.",
  robots: "noindex, nofollow", // Page privée de confirmation
};

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
