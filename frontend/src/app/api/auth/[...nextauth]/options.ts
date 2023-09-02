import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { Session } from "inspector"

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
  },
  async session({ session, token, user }: any) {
      // user id is stored in ._id when using credentials provider
      if (token?._id) session.user._id = token._id;
  
      // user id is stored in ._id when using google provider
      if (token?.sub) session.user._id = token.sub;
  
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      console.log("Session:",session)


      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      console.log("Token:",token)

      return session && token;
  },
  }
}
