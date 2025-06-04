// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// 1) Exportamos authOptions com o tipo NextAuthOptions
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // ← adiciona esse bloco:
      authorization: {
        params: {
          scope: "read:user user:email public_repo",
          // ou "repo" para privados + públicos
        },
      },
    }),
  ],
  callbacks: {
    // 2) Guardamos access_token e o login do GitHub no JWT
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.githubToken = account.access_token;
      }
      // profile.login vem do GitHub e é o username
      if (profile && typeof profile === "object" && "login" in profile) {
        token.githubLogin = (profile as { login?: string }).login;
      }
      return token;
    },
    // 3) Expomos githubToken e githubLogin na session
    async session({ session, token }) {
      session.githubToken = token.githubToken;
      // @ts-expect-error: user.login is augmented in next-auth types
      session.user.login = token.githubLogin;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// 4) Usamos authOptions como argumento para o NextAuth
export default NextAuth(authOptions);
