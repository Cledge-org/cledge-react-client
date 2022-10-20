import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthFunctions from "./firebase-auth";
import { getEnvVariable } from "src/config/getConfig";

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
  secret: getEnvVariable("NEXT_AUTH_SECRET"),
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        return await AuthFunctions.signInEmail(
          credentials.email,
          credentials.password
        );
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
