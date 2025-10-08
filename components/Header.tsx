"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Galerie", href: "/galerie" },
  { name: "Avis", href: "/avis" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sage-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-sage-400 rounded-xl flex items-center justify-center group-hover:bg-sage-500 transition-colors">
              <span className="text-white font-serif font-bold text-lg">
                ML
              </span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-semibold text-charcoal-800">
                Maison Lila
              </h1>
              <p className="text-xs text-sage-400 -mt-1">
                Restaurant gastronomique
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-sage-400 text-white"
                    : "text-charcoal-700 hover:bg-sage-400/10 hover:text-sage-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/reservation">
              <Button variant="primary">Réserver</Button>
            </Link>
          </div>

          {/* Menu Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-charcoal-700 hover:bg-sage-400/10 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sage-400/10">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-sage-400 text-white"
                      : "text-charcoal-700 hover:bg-sage-400/10"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/reservation">
                  <Button variant="primary" className="w-full">
                    Réserver une table
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
