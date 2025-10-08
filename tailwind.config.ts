import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette douce et élégante pour Maison Lila
        cream: {
          50: "#FAF8F6", // Très clair - fond principal
          100: "#F1EDEA", // Clair - sections alternées
          200: "#E7F0ED", // Verdâtre très clair - accents subtils
        },
        sage: {
          300: "#A3C4C1", // Plus clair
          400: "#8AA6A3", // Accent principal
          500: "#7A9593", // Hover states
          600: "#6B8482", // Plus foncé
        },
        charcoal: {
          600: "#404040", // Texte secondaire
          700: "#2B2B2B", // Texte principal
          800: "#1F1F1F", // Titres
          900: "#141414", // Maximum contraste
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        serif: ['"Playfair Display"', "Georgia", "serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-subtle": "bounceSubtle 2s infinite",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-5px)" },
          "60%": { transform: "translateY(-2px)" },
        },
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(138, 166, 163, 0.1)",
        "soft-lg": "0 4px 40px rgba(138, 166, 163, 0.15)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
