import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  debug: true,
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/signup",
    signOut: "/auth/signout",
  },
  providers: [
    // AzureADB2CProvider({
    //   tenantName: process.env.AZURE_TENANT_NAME,
    //   clientId: process.env.AZURE_CLIENT_ID,
    //   clientSecret: process.env.AZURE_CLIENT_SECRET,
    //   primaryUserFlow: process.env.USER_FLOW_AUTH,
    //   authorization: { params: {scope: "offline_access openid"} }
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
