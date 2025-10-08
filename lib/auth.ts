import { authSchema } from "@/lib/zod-schemas";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedFields = authSchema.safeParse(credentials);

          if (!validatedFields.success) {
            return null;
          }

          const { email, password } = validatedFields.data;

          // Simple vérification pour l'admin (en production, utiliser bcrypt)
          if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
          ) {
            return {
              id: "admin",
              email: process.env.ADMIN_EMAIL!,
              name: "Administrateur",
              role: "admin",
            };
          }

          return null;
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
