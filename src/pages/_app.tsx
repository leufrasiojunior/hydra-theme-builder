
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "@/styles/HydraMock.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  // pageProps.session é injetado automaticamente pelo NextAuth
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
