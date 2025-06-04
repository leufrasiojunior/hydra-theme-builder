import { useState } from 'react';

interface TermsModalProps {
  onAccept: () => void;
}

export function TermsModal({ onAccept }: TermsModalProps) {
  const [responsibility, setResponsibility] = useState(false);
  const [useTerms, setUseTerms] = useState(false);
  const [serviceTerms, setServiceTerms] = useState(false);

  const allChecked = responsibility && useTerms && serviceTerms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-800 p-6 rounded space-y-4 max-w-md w-full flex flex-col items-baseline">
        <h2 className="text-lg font-semibold text-white">
          Confirmação de Termos
        </h2>
        <label className="flex items-start space-x-2 text-gray-200">
          <input
            type="checkbox"
            className="mt-1"
            checked={responsibility}
            onChange={(e) => setResponsibility(e.target.checked)}
          />
          <span>
            Li e concordo com a{' '}
            <a
              className="underline"
              href="/terms/disclaimer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Isenção de responsabilidade
            </a>
          </span>
        </label>

        {responsibility && (
          <label className="flex items-start space-x-2 text-gray-200 justify-end">
            <input
              type="checkbox"
              className="mt-1"
              checked={useTerms}
              onChange={(e) => setUseTerms(e.target.checked)}
            />
            <span>
              Li e aceito os{' '}
              <a
                className="underline"
                href="/terms/termos-de-uso"
                target="_blank"
                rel="noopener noreferrer"
              >
                Termos de Uso
              </a>
            </span>
          </label>
        )}

        {responsibility && useTerms && (
          <label className="flex items-start space-x-2 text-gray-200 justify-end">
            <input
              type="checkbox"
              className="mt-1"
              checked={serviceTerms}
              onChange={(e) => setServiceTerms(e.target.checked)}
            />
            <span>
              Li e aceito os{' '}
              <a
                className="underline"
                href="/terms/termos-de-servico"
                target="_blank"
                rel="noopener noreferrer"
              >
                Termos de Serviço
              </a>
            </span>
          </label>
        )}

        <button
          disabled={!allChecked}
          onClick={onAccept}
          className={`w-full py-2 rounded text-white ${
            allChecked ? 'bg-blue-600' : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
