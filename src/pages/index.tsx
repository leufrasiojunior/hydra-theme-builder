// src/pages/index.tsx
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeEditor } from "@/components/ThemeEditor";
import { TermsModal } from "@/components/TermsModal";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTermsAccepted(localStorage.getItem("termsAccepted") === "true");
      setHydrated(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    setTermsAccepted(true);
    setShowTerms(false);
    if (!session) {
      signIn("github");
    }
  };

  const handleLogin = () => {
    if (termsAccepted) {
      signIn("github");
    } else {
      setShowTerms(true);
    }
  };

  if (status === "loading" || !hydrated) {
    return <p className="p-8 text-center">Carregando…</p>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Entrar com GitHub
        </button>
        {showTerms && <TermsModal onAccept={handleAccept} />}
      </div>
    );
  }

  if (!termsAccepted) {
    return <TermsModal onAccept={handleAccept} />;
  }

  return (
    <div className="h-screen">
      {/* Botão de logout */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => signOut()}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Sair
        </button>
      </div>

      {/* Aqui está o editor interativo */}
      <ThemeEditor />
    </div>
  );
}
