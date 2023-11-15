import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  UserFragment,
} from "@/graphql/generated/graphql";
import apolloClient from "@/graphql/apolloClient";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data, error } = await apolloClient.query<
          GetUserByEmailQuery,
          GetUserByEmailQueryVariables
        >({
          query: GetUserByEmailDocument,
          variables: {
            email: credentials.email,
          },
        });

        const user = isUser(data.appUser) ? data.appUser : null;

        if (error || !data || !user) {
          return null;
        }

        const result = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!result) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);

const isUser = (x: any): x is UserFragment => {
  return x?.__typename === "AppUser";
};
