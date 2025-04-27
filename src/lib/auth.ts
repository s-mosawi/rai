import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (user && !user.isVerified) {
          throw new Error("Email not verified");
        }

        if (user && bcrypt.compareSync(password, user.password)) {
          return {
            id: user.id,
          };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id!;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
        };
      }

      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
  secret: process.env.NEXTAUTH_SECRET,
};
