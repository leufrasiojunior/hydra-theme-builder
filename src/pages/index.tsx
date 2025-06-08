// src/pages/index.tsx
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">Hydra Theme Builder</h1>
      <p className="text-gray-600">Personalize facilmente os temas do Hydra.</p>
      <Link
        href="/editor"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Acessar Editor
      </Link>
    </div>
  );
}
