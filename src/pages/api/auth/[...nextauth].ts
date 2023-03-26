import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import nextAuth from "next-auth";
import type { AuthOptions } from "next-auth/core/types";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import * as argon2 from "argon2";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const username = credentials?.username;
        const password = credentials?.password;
        if (username === undefined || password === undefined) {
          return null;
        }
        const user: User | null =
          (await prisma.user.findUnique({
            where: {
              username,
            },
          })) ??
          (await prisma.user.findUnique({
            where: {
              email: username,
            },
          }));
        if (user && (await argon2.verify(user.password, password))) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

export default nextAuth(authOptions);
