import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  UserFragment,
} from "@/graphql/generated/graphql";
import apolloClient from "@/graphql/apolloClient";

export default NextAuth({
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
});

const isUser = (x: any): x is UserFragment => {
  return x?.__typename === "AppUser";
};
