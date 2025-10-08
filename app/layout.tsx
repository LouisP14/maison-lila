import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Lila - Restaurant Gastronomique Paris",
    template: "%s | Maison Lila",
  },
  description:
    "Découvrez Maison Lila, restaurant gastronomique au cœur de Paris. Une cuisine française raffinée dans un cadre élégant. Réservation en ligne.",
  keywords: [
    "restaurant",
    "gastronomique",
    "Paris",
    "cuisine française",
    "réservation",
    "menu",
  ],
  authors: [{ name: "Maison Lila" }],
  creator: "Maison Lila",
  publisher: "Maison Lila",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Maison Lila",
    title: "Maison Lila - Restaurant Gastronomique Paris",
    description:
      "Découvrez Maison Lila, restaurant gastronomique au cœur de Paris. Une cuisine française raffinée dans un cadre élégant.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maison Lila - Restaurant Gastronomique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Lila - Restaurant Gastronomique Paris",
    description:
      "Découvrez Maison Lila, restaurant gastronomique au cœur de Paris.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#8AA6A3" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
