import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID ?? "",
      clientSecret: process.env.CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  pages: {
    // Login happens through <LoginModal>, which lives on the home page.
    // Protected routes (see middleware) redirect here when unauthenticated.
    signIn: "/",
  },
  events: {
    async createUser({ user }) {
      // Seed the editable Profile from the auth identity (e.g. Google's
      // name + avatar) the first time a user is created.
      await prisma.profile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          name: user.name ?? null,
          username: user.email?.split("@")[0] ?? null,
          image: user.image ?? null,
        },
        update: {
          name: user.name ?? null,
          image: user.image ?? null,
        },
      });
    },
  },
  callbacks: {
    // Persist the user id on the JWT so it's available on the session.
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    // NOTE: Profile creation is handled by the `createUser` event above, which
    // fires AFTER the adapter persists the User row. Do NOT upsert the Profile
    // in the `signIn` callback — for a first-time OAuth user that callback runs
    // BEFORE the User exists, causing a Profile_userId_fkey constraint violation.
  },
};

