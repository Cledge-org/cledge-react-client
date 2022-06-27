import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthFunctions from "./firebase-auth";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { getAccountInfo } from "../get-account";
import { createUser } from "../create-user";

export default NextAuth({
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "3tPVVnhAzQIyBnrgzL/+fRMmJLz8WzzbbLK8QljweTA",
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        return await AuthFunctions.signInEmail(
          credentials.email,
          credentials.password
        );
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        try {
          getAccountInfo(profile.sub);
        } catch (err) {
          createUser({
            firebaseId: profile.sub,
            name: profile.name,
            address: "",
            birthday: new Date(),
            grade: -1,
            email: profile.email,
            tags: [],
            checkIns: ["Onboarding Questions"],
          }).then(async (res) => {
            //console.log(res.status);
          });
        }
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      return url;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.uid;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      // Send properties to the client, like an access_token from a provider.
      // session.user = user
      session.user.uid = token.uid;
      session.accessToken = token.accessToken;
      return Promise.resolve(session);
    },
  },
});
