// src/pages/index.tsx
import { useSession, signIn, signOut } from "next-auth/react";
import { ThemeEditor } from "@/components/ThemeEditor";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-8 text-center">Carregando…</p>;
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <button
          onClick={() => signIn("github")}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Entrar com GitHub
        </button>
      </div>
    );
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
