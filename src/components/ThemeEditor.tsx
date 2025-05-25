// src/components/ThemeEditor.tsx
import React, { useState, useRef } from "react";
import { HydraMock } from "./HydraMock";
import html2canvas from "html2canvas";

export function ThemeEditor() {
    // Estados para edição de CSS e inputs
    const [customCss, setCustomCss] = useState<string>(".sidebar { background-color: #2c3e50; }\n");
    const [themeName, setThemeName] = useState<string>("");
    const [themeCode, setThemeCode] = useState<string>("");

    // ref para capturar screenshot
    const mockRef = useRef<HTMLDivElement>(null);

    // Abre preview em fullscreen
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);

    // Função para capturar screenshot e retornar Base64
    const takeScreenshot = async (): Promise<string> => {
        if (!mockRef.current) throw new Error("Mock indisponível");
        const canvas = await html2canvas(mockRef.current);
        return canvas.toDataURL("image/png").split(",")[1];
    };

    // Handler de criação de PR
    const handleCreatePr = async () => {
        if (!themeName || !themeCode) {
            alert("Preencha nome e código do tema");
            return;
        }
        try {
            const screenshot = await takeScreenshot();
            const res = await fetch("/api/github/create-theme-pr", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ themeName, themeCode, themeCss: customCss, screenshot }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Erro ao criar PR");
            window.open(json.prUrl, "_blank");
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="flex h-full">
            {/* Painel de edição */}
            <div className="w-1/3 p-4 border-r border-gray-700 space-y-4 overflow-auto">
                <h2 className="text-lg font-semibold">Editor de Tema</h2>

                <label className="block">
                    <span className="text-sm">Nome do Tema</span>
                    <input
                        type="text"
                        value={themeName}
                        onChange={(e) => setThemeName(e.target.value)}
                        className="w-full mt-1 p-2 bg-gray-800 text-gray-200 rounded"
                        placeholder="Ex: meu-tema"
                    />
                </label>

                <label className="block">
                    <span className="text-sm">Código do Tema</span>
                    <input
                        type="text"
                        value={themeCode}
                        onChange={(e) => setThemeCode(e.target.value)}
                        className="w-full mt-1 p-2 bg-gray-800 text-gray-200 rounded"
                        placeholder="Ex: lpQd950J"
                    />
                </label>

                <label className="block">
                    <span className="text-sm">CSS Customizado</span>
                    <textarea
                        rows={12}
                        value={customCss}
                        onChange={(e) => setCustomCss(e.target.value)}
                        className="w-full mt-1 p-2 bg-gray-800 text-gray-200 font-mono text-sm rounded"
                    />
                </label>

                <div className="flex space-x-2">
                    <button
                        onClick={() => setPreviewOpen(true)}
                        className="flex-1 px-4 py-2 bg-gray-700 rounded text-center"
                    >
                        Preview
                    </button>
                    <button
                        onClick={handleCreatePr}
                        className="flex-1 px-4 py-2 bg-blue-600 rounded text-center"
                    >
                        Create PR
                    </button>
                </div>
            </div>

            {/* Preview Mock */}
            <div className="flex-1 p-4 bg-gray-900">
                <HydraMock ref={mockRef} customCss={customCss} />
            </div>

            {/* Modal de preview fullscreen */}
            {previewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-4 rounded-lg w-3/4 h-3/4 overflow-auto">
                        <button
                            onClick={() => setPreviewOpen(false)}
                            className="mb-4 px-2 py-1 bg-red-600 text-white rounded"
                        >
                            Fechar
                        </button>
                        <HydraMock customCss={customCss} ref={null as any} />
                    </div>
                </div>
            )}
        </div>
    );
}
