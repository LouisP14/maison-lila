import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenu principal du footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Informations restaurant */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sage-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">
                    ML
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold">
                    Maison Lila
                  </h3>
                  <p className="text-sm text-sage-300">
                    Restaurant gastronomique
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Une expérience culinaire unique au cœur de Paris, où tradition
                et créativité se rencontrent dans chaque assiette.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-sage-300 transition-colors"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/menu"
                    className="text-gray-300 hover:text-sage-300 transition-colors"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/galerie"
                    className="text-gray-300 hover:text-sage-300 transition-colors"
                  >
                    Galerie
                  </Link>
                </li>
                <li>
                  <Link
                    href="/avis"
                    className="text-gray-300 hover:text-sage-300 transition-colors"
                  >
                    Avis clients
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-sage-300 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <svg
                    className="w-4 h-4 mt-0.5 text-sage-400"
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
                  <div>
                    <p className="text-gray-300">123 Rue de la Paix</p>
                    <p className="text-gray-300">75001 Paris</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-sage-400"
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
                  <a
                    href="tel:0142000000"
                    className="text-gray-300 hover:text-sage-300 transition-colors"
                  >
                    01 42 00 00 00
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    className="w-4 h-4 text-sage-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:contact@maison-lila.fr"
                    className="text-gray-300 hover:text-sage-300 transition-colors"
                  >
                    contact@maison-lila.fr
                  </a>
                </li>
              </ul>
            </div>

            {/* Horaires & Réservation */}
            <div>
              <h4 className="font-semibold mb-4">Horaires</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Mardi - Jeudi</span>
                  <span>12h-14h30 • 19h-22h30</span>
                </div>
                <div className="flex justify-between">
                  <span>Vendredi - Samedi</span>
                  <span>12h-14h30 • 19h-23h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>12h-15h • 19h-22h</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Lundi</span>
                  <span className="text-red-400">Fermé</span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/reservation">
                  <button className="w-full bg-sage-400 text-white px-4 py-2 rounded-lg hover:bg-sage-500 transition-colors text-sm font-medium">
                    Réserver en ligne
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-300">
              <Link
                href="/legal/mentions-legales"
                className="hover:text-sage-300 transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/legal/politique-confidentialite"
                className="hover:text-sage-300 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/legal/cgv"
                className="hover:text-sage-300 transition-colors"
              >
                CGV
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Réseaux sociaux */}
              <a
                href="#"
                className="text-gray-400 hover:text-sage-300 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-sage-300 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.326-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.447 1.297-3.326.877-.878 2.029-1.368 3.326-1.368 1.297 0 2.447.49 3.325 1.368.877.879 1.368 2.029 1.368 3.326 0 1.297-.49 2.448-1.368 3.325-.878.877-2.028 1.368-3.325 1.368z" />
                </svg>
              </a>
            </div>

            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Maison Lila. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
