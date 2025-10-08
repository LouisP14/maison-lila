import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réservation - Maison Lila",
  description:
    "Réservez votre table chez Maison Lila. Choisissez votre date, votre heure et le nombre de convives pour une expérience culinaire d'exception.",
  keywords: ["réservation", "table", "restaurant", "booking"],
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
