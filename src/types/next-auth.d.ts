// src/types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    // nosso token de acesso ao GitHub
    githubToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // adicionamos o login (username) do GitHub
      login?: string | null;
    };
  }
  interface JWT {
    // campos que inserimos no jwt callback
    githubToken?: string;
    githubLogin?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    githubToken?: string;
    githubLogin?: string;
  }
}
