// src/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/HydraMock.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Navbar } from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps<{ session: Session | null }>) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* 1) Navbar sempre visível */}
      <Navbar />

      {/* 2) Conteúdo principal com padding-top para não ficar sob a Navbar */}
      <main className="pt-16 h-full">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
