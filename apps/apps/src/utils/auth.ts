import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      sub?: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    userId: string | null | undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn(provider) {
      if (
        provider &&
        provider.profile &&
        provider.account &&
        provider.account.provider === "google"
      ) {
        provider.user.userId = provider.profile.sub;
      }
      return true;
    },
    async jwt(provider) {
      if (provider.profile && provider.account?.provider === "google") {
        provider.token.sub = provider.profile?.sub as string;
      }
      return provider.token;
    },
    async session({ session, token }) {
      session.user.sub = token.sub;
      return session;
    },
  },
});
