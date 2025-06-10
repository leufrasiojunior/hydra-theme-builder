// src/components/ThemeEditor.tsx
import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import html2canvas from 'html2canvas';
import { HydraMock } from './HydraMock';
import type { OnMount } from '@monaco-editor/react';
import classDescriptions from '@/data/classDescriptions';

export function ThemeEditor() {
  // Estados para edição de CSS e inputs
  const [customCss, setCustomCss] = useState<string>(
    '//.sidebar { background-color: #2c3e50; }\n'
  );
  const [themeName, setThemeName] = useState<string>('');
  const [themeCode, setThemeCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  // ref para capturar screenshot do mock
  const mockRef = useRef<HTMLDivElement>(null);

  const handleSelectElement = (selector: string) => {
    setCustomCss((prev) => `${prev}\n${selector} {\n  \n}`);
  };

  const handleEditorDidMount: OnMount = async (editor, monacoInstance) => {
    // 1) Carrega o CSS do mock
    const res = await fetch('/styles/HydraMock.css');
    const text = await res.text();

    // 2) Extrai as classes
    const clsSet = new Set<string>();
    const regex = /\.([a-zA-Z0-9_-]+)/g;
    let m;
    while ((m = regex.exec(text))) clsSet.add(m[1]);
    const classes = Array.from(clsSet);

    // 4) Registra autocomplete para CSS, disparado ao digitar “.”
    monacoInstance.languages.registerCompletionItemProvider('css', {
      triggerCharacters: ['.'],
      provideCompletionItems: (model, position) => {
        const wordInfo = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: wordInfo.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: wordInfo.endColumn,
        };

        const suggestions = classes.map((cls) => ({
          // 👇 aqui trocamos a string por um objeto
          label: {
            label: `.${cls}`, // o texto da sugestão
            description: classDescriptions[cls] || '', // a descrição inline
          },
          kind: monacoInstance.languages.CompletionItemKind.Class,
          insertText: `.${cls}`, // o que vai ser inserido
          range,
        }));

        return { suggestions };
      },
    });
  };

  // Função para capturar screenshot e retornar Base64
  const takeScreenshot = async (): Promise<string> => {
    if (!mockRef.current) throw new Error('Mock indisponível');
    const canvas = await html2canvas(mockRef.current);
    const dataUrl = canvas.toDataURL('image/png');
    return dataUrl.split(',')[1]; // Retorna apenas o Base64
  };

  // Handler de criação de PR
  const handleCreatePr = async () => {
    if (!themeName || !themeCode) {
      alert('Preencha nome e código do tema');
      return;
    }

    setLoading(true);
    try {
      // 1) captura screenshot
      const screenshot = await takeScreenshot();

      // 2) envia todos os dados, incluindo screenshot em base64
      const res = await fetch('/api/github/create-theme-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          themeName,
          themeCode,
          themeCss: customCss,
          screenshot, // Base64 do PNG sem prefixo
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erro ao criar PR');

      window.open(json.prUrl, '_blank');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      }
    } finally {
      setLoading(false);
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
          <div className="mt-1 h-48 border border-gray-700">
            <Editor
              onMount={handleEditorDidMount}
              height="100%"
              defaultLanguage="css"
              value={customCss}
              theme="vs-dark"
              options={{
                automaticLayout: true,
                minimap: { enabled: false },
                fontFamily: 'monospace',
                fontSize: 14,
                tabSize: 2,
                wordWrap: 'on',
                formatOnType: true,
                formatOnPaste: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                autoClosingBrackets: 'always',
              }}
              onChange={(value) => setCustomCss(value || '')}
            />
          </div>
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
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 rounded text-center disabled:opacity-50"
          >
            {loading ? 'Enviando PR…' : 'Create PR'}
          </button>
        </div>
      </div>

      {/* Preview Mock */}
      <div className="flex-1 p-4 bg-gray-900">
        <HydraMock
          ref={mockRef}
          customCss={customCss}
          onElementSelect={handleSelectElement}
        />
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
            <HydraMock
              customCss={customCss}
              ref={null}
              onElementSelect={handleSelectElement}
            />
          </div>
        </div>
      )}
    </div>
  );
}
