import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = {
          id: "userId",
          name: "Patryk",
          email: "patryk@nextmile.com",
        };

        if (user.email === credentials?.email) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
