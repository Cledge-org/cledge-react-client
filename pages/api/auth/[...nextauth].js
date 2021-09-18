import NextAuth from "next-auth";
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';

export default NextAuth({
    providers:[
        AzureADB2CProvider({
            tenantName: process.env.AZURE_TENANT_NAME,    
            clientId: process.env.AZURE_CLIENT_ID,    
            clientSecret: process.env.AZURE_CLIENT_SECRET,    
            primaryUserFlow: process.env.USER_FLOW_AUTH,   
            scope: `offline_access openid`,
        }),
    ],
    callbacks:{
        async signIn({ user, account, profile, email, credentials }) {      
            return true    
        },    
        async redirect({ url, baseUrl }) {      
            return baseUrl    
        },    
        async session({ session, user, token }) {      
            return session    
        },    
        async jwt({ token, user, account, profile, isNewUser }) {      
            return token    
        }

    }
})