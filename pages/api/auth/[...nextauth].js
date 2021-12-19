import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthFunctions from "./firebase-auth";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";

export default NextAuth({
  debug: true,
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
    signOut: "/auth/signout",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        return (
          await AuthFunctions.signInEmail(
            credentials.email,
            credentials.password
          )
        ).user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
    session: async ({ session, token, user }) => {
      // Send properties to the client, like an access_token from a provider.
      // console.debug(user);
      // session.user = user;
      session.accessToken = token.accessToken;
      return Promise.resolve(session);
    },
  },
});
