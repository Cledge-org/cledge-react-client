import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthFunctions from "./firebase-auth";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { ORIGIN_URL } from "../../../config";

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
          fetch(`/api/get-account`, {
            method: "POST",
            body: JSON.stringify({ userId: profile.sub }),
          });
        } catch (err) {
          fetch("/api/create-user", {
            method: "POST",
            body: JSON.stringify({
              ...{
                name: profile.name,
                address: "",
                birthday: new Date(),
                grade: -1,
                email: profile.email,
                tags: [],
                checkIns: ["Onboarding Questions"],
              },
              userId: profile.sub,
              email: profile.email,
            }),
          }).then(async (res) => {
            console.log(res.status);
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
      return ORIGIN_URL + "/dashboard";
    },
    jwt: async ({ token, user }) => {
      if (user) {
        console.error("AYO" + user.uid);
        token.uid = user.uid;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token, user }) => {
      // Send properties to the client, like an access_token from a provider.
      // console.debug(user);
      // session.user = user
      session.user.uid = token.uid;
      session.accessToken = token.accessToken;
      return Promise.resolve(session);
    },
  },
});
