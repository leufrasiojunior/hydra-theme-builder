// src/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/HydraMock.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import * as analytics from "@/lib/analytics";

export default function App({ Component, pageProps }: AppProps<{ session: Session | null }>) {
  const router = useRouter();

  // Toda vez que a rota mudar, registramos a visualização no Google Analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      analytics.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider session={pageProps.session}>
      {/* Componente responsável por carregar o script do Google Analytics */}
      <GoogleAnalytics />

      {/* 1) Navbar sempre visível */}
      <Navbar />

      {/* 2) Conteúdo principal com padding-top para não ficar sob a Navbar */}
      <main className="pt-16 h-full">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
