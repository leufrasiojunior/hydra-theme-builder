// src/pages/index.tsx
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();

  // estados para o fork
  const [forkLoading, setForkLoading] = useState(false);
  const [forkUrl, setForkUrl] = useState<string | null>(null);
  const [forkError, setForkError] = useState<string | null>(null);

  // estados para o PR
  const [themeName, setThemeName] = useState("");
  const [themeCss, setThemeCss] = useState("");
  const [themeCode, setThemeCode] = useState("");
  const [prLoading, setPrLoading] = useState(false);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [prError, setPrError] = useState<string | null>(null);

  // função que dispara o fork
  const doFork = async () => {
    setForkLoading(true);
    setForkError(null);
    try {
      const res = await fetch("/api/github/fork", {
        method: "POST",
        credentials: "include",            // garante envio de cookies
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro no fork");
      setForkUrl(json.forkUrl);
    } catch (err: any) {
      setForkError(err.message);
    } finally {
      setForkLoading(false);
    }
  };

  // função que dispara a criação do PR
  const createPr = async () => {
    // validações simples
    if (!themeName || !themeCode || !themeCss) {
      return alert("Preencha nome, código e CSS do tema");
    }
    setPrLoading(true);
    setPrError(null);

    try {
      const res = await fetch("/api/github/create-theme-pr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ themeName, themeCode, themeCss }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erro ao criar PR");
      setPrUrl(json.prUrl);
    } catch (err: any) {
      setPrError(err.message);
    } finally {
      setPrLoading(false);
    }
  };

  // exibe loading enquanto a sessão é recuperada
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando…</p>
      </div>
    );
  }

  // se não estiver logado, mostra botão de login
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <button
          onClick={() => signIn("github")}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Entrar com GitHub
        </button>
      </div>
    );
  }

  // usuário autenticado: mostra UI de fork e PR
  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">
      {/* …botão de fork… */}

      {/* Formulário de tema */}
      <div className="space-y-2">
        <input
          type="text"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          placeholder="Nome do tema"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          value={themeCode}
          onChange={(e) => setThemeCode(e.target.value)}
          placeholder="Código do tema (ex: lpQd950J)"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={themeCss}
          onChange={(e) => setThemeCss(e.target.value)}
          rows={8}
          className="w-full border p-2 rounded"
          placeholder="Cole seu CSS aqui…"
        />
        <button
          onClick={createPr}
          disabled={prLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {prLoading ? "Enviando PR…" : "Enviar Pull Request"}
        </button>
        {prUrl && (
          <p className="text-blue-600">
            PR criado! Veja em{" "}
            <a href={prUrl} target="_blank" rel="noopener noreferrer">
              {prUrl}
            </a>
          </p>
        )}
        {prError && <p className="text-red-500">Erro: {prError}</p>}
      </div>
    </div>
  );
}
